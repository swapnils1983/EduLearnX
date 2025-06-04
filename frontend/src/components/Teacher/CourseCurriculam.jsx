import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Trash2, GripVertical, Upload, Video } from "lucide-react";
import { Reorder } from "framer-motion";
import { toast } from "sonner";
import { mediaUploadService } from "@/services";

const CourseCurriculam = ({ data, updateData }) => {
    const [lectures, setLectures] = useState(data.curriculum || []);
    const [isSubmitting, SetIsSubmitting] = useState(false)
    const addLecture = () => {
        const newLecture = {
            id: Date.now().toString(),
            title: "",
            videoUrl: "",
            freePreview: false,
        };
        const updatedLectures = [...lectures, newLecture];
        setLectures(updatedLectures);
        updateData({ curriculum: updatedLectures });
    };

    const removeLecture = (id) => {
        const updatedLectures = lectures.filter((lecture) => lecture.id !== id);
        setLectures(updatedLectures);
        updateData({ curriculum: updatedLectures });
    };

    const updateLecture = (id, field, value) => {
        const updatedLectures = lectures.map((lecture) =>
            lecture.id === id ? { ...lecture, [field]: value } : lecture
        );
        setLectures(updatedLectures);
        updateData({ curriculum: updatedLectures });
    };

    const handleVideoUpload = async (e, lectureId) => {
        SetIsSubmitting(true)
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("video/")) {
            toast.error("Please upload a valid video file");
            return;
        }

        if (file.size > 100 * 1024 * 1024) {
            toast.error("Video file size should be less than 100MB");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const { data } = await mediaUploadService(formData);
            updateLecture(lectureId, "videoUrl", data.secure_url);
            toast.success("Video uploaded successfully");
        } catch (error) {
            toast.error("Error uploading video");
        } finally {
            SetIsSubmitting(false)
        }
    };

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Course Curriculum</h2>
                    <Button type="button" variant="outline" onClick={addLecture}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Lecture
                    </Button>
                </div>

                <Reorder.Group axis="y" values={lectures} onReorder={setLectures} className="space-y-4">
                    {lectures.map((lecture) => (
                        <Reorder.Item key={lecture.id} value={lecture} className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
                            <div className="flex items-start gap-4">
                                <GripVertical className="w-5 h-5 text-slate-400 mt-2 cursor-move" />
                                <div className="flex-1 space-y-4">
                                    {/* Lecture Title */}
                                    <div className="space-y-2">
                                        <Label htmlFor={`title-${lecture.id}`}>Lecture Title</Label>
                                        <Input
                                            id={`title-${lecture.id}`}
                                            value={lecture.title}
                                            onChange={(e) => updateLecture(lecture.id, "title", e.target.value)}
                                            placeholder="Enter lecture title"
                                        />
                                    </div>

                                    {/* Lecture Video Upload */}
                                    <div className="space-y-2">
                                        <Label>Lecture Video</Label>
                                        <div className="mt-1">
                                            {isSubmitting ? (
                                                <div className="flex items-center justify-center w-full h-40 bg-slate-100 rounded-lg">
                                                    <span className="loader animate-spin border-4 border-t-transparent border-blue-500 rounded-full w-10 h-10"></span>
                                                </div>
                                            ) : lecture.videoUrl ? (
                                                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100">
                                                    <video src={lecture.videoUrl} controls className="w-full h-full object-cover" />
                                                    <label
                                                        htmlFor={`video-${lecture.id}`}
                                                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                                                    >
                                                        <div className="text-white text-center">
                                                            <Upload className="w-8 h-8 mx-auto mb-2" />
                                                            <span>Replace Video</span>
                                                        </div>
                                                    </label>
                                                </div>
                                            ) : (
                                                <label
                                                    htmlFor={`video-${lecture.id}`}
                                                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-slate-200 border-dashed rounded-lg cursor-pointer hover:bg-slate-50 transition-all duration-200"
                                                >
                                                    <Video className="w-8 h-8 mb-2 text-slate-400" />
                                                    <p className="mb-2 text-sm text-slate-500">Click to upload video</p>
                                                    <p className="text-xs text-slate-400">MP4, WebM or Ogg (MAX. 100MB)</p>
                                                </label>
                                            )}
                                            <input
                                                id={`video-${lecture.id}`}
                                                type="file"
                                                accept="video/*"
                                                className="hidden"
                                                onChange={(e) => handleVideoUpload(e, lecture.id)}
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </CardContent>
        </Card>
    );
};

export default CourseCurriculam;