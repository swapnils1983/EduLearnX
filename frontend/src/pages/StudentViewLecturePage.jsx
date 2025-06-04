import React, { useState, useEffect, useContext } from 'react';
import LectureSideBar from '@/components/student/LectureSideBar';
import ReviewSection from '@/components/student/ReviewSection';
import ReviewForm from '@/components/student/ReviewForm';
import { useToast } from '@/hooks/use-toast';
import { useParams } from 'react-router-dom';
import { fethCourceDetailById, getStudentProgressService, updateStudentProgressService } from '@/services';
import LectureContent from '@/components/student/LectureContent';
import { AuthContext } from '@/context/AuthContext';

const StudentViewLecturePage = () => {
    const [course, setCourse] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [activeLectureId, setActiveLectureId] = useState(null);
    const { toast } = useToast();
    const { id } = useParams();
    const [lectures, setLectures] = useState([]);
    const [activeLecture, setActiveLecture] = useState(null);
    const { auth } = useContext(AuthContext);
    const [completedLectures, setCompletedLectures] = useState([]);

    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const { data } = await fethCourceDetailById(id);
                // console.log(data)
                setCourse(data);
                console.log(data.curriculum)
                setLectures(data.curriculum);
                setActiveLecture(data?.curriculum[0] || null);
            } catch (error) {
                console.error("Error fetching lectures:", error);
            }
        };
        fetchLectures();
    }, [id]);


    useEffect(() => {
        const fetchProgress = async () => {
            console.log(auth?.user?._id)
            console.log(course?._id)
            if (!auth?.user?._id || !course?._id) return;
            try {
                const { data } = await getStudentProgressService(course?._id, auth.user._id);
                console.log(data)
                setCompletedLectures(data.completedLectures || []);
            } catch (error) {
                console.error("Failed to fetch progress:", error);
            }
        };
        fetchProgress();
    }, [id, auth?.user?._id, course]);



    useEffect(() => {
        if (activeLectureId && lectures.length) {
            const selectedLecture = lectures.find(l => l._id === activeLectureId);
            setActiveLecture(selectedLecture || null);
        }
    }, [activeLectureId, lectures]);


    const handleSelectLecture = async (lectureId) => {
        if (lectureId !== activeLectureId) {
            setActiveLectureId(lectureId);
            document.getElementById('lecture-content')?.scrollTo(0, 0);

            try {
                await updateStudentProgressService(id, lectureId, auth.user._id);
                setCompletedLectures((prev) =>
                    prev.includes(lectureId) ? prev : [...prev, lectureId]
                );
            } catch (error) {
                console.error("Failed to update progress:", error);
            }
        }
    };

    const handleSubmitReview = (newReview) => {
        const review = {
            id: `review-${Date.now()}`,
            lectureId: activeLectureId,
            studentName: "Current Student",
            rating: newReview.rating,
            comment: newReview.comment,
            date: new Date().toISOString().split('T')[0]
        };

        setReviews(prev => [review, ...prev]);

        toast({
            title: "Review submitted",
            description: "Your review has been added successfully."
        });
    };

    return (
        <div className="flex h-full w-full overflow-hidden bg-background">
            <LectureSideBar
                lectures={lectures}
                activeLectureId={activeLectureId}
                onSelectLecture={handleSelectLecture}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="py-4 px-8 border-b border-border bg-card z-10">
                    <h1 className="text-xl font-medium">{course?.title || "Course Title"}</h1>
                </header>

                <div id="lecture-content" className="flex-1 overflow-y-auto">
                    {activeLecture ? (
                        <LectureContent lecture={activeLecture} courseId={course?._id} studentId={auth?.user?._id} />
                    ) : (
                        <p className="p-4">No lecture selected.</p>
                    )}
                    <ReviewSection reviews={reviews} lectureId={activeLectureId} />
                    <ReviewForm lectureId={activeLectureId} onSubmitReview={handleSubmitReview} />
                </div>
            </div>
        </div>
    );
};

export default StudentViewLecturePage;
