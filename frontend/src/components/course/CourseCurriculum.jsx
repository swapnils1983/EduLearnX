import { useState } from "react";
import { PlusCircle, Trash2, GripVertical, Upload, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { motion, Reorder } from "framer-motion";
import { toast } from "sonner";
import { mediaDeleteService, mediaUploadService } from "@/services";

const CourseCurriculum = ({ data, updateData }) => {
    const [lectures, setLectures] = useState(data.curriculum || []);

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
            const response = await mediaUploadService(formData);
            updateLecture(lectureId, "videoUrl", response.data.secure_url);
            toast.success("Video uploaded successfully");
        } catch (error) {
            toast.error("Error uploading video");
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Course Curriculum</h3>
                <Button onClick={addLecture} variant="outline" className="flex items-center gap-2">
                    <PlusCircle className="w-4 h-4" />
                    Add Lecture
                </Button>
            </div>

            <Reorder.Group axis="y" values={lectures} onReorder={setLectures} className="space-y-4">
                {lectures.map((lecture) => (
                    <Reorder.Item key={lecture.id} value={lecture} className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
                        <div className="flex items-start gap-4">
                            <GripVertical className="w-5 h-5 text-slate-400 mt-2 cursor-move" />
                            <div className="flex-1 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor={`title-${lecture.id}`}>Lecture Title</Label>
                                    <Input
                                        id={`title-${lecture.id}`}
                                        value={lecture.title}
                                        onChange={(e) => updateLecture(lecture.id, "title", e.target.value)}
                                        placeholder="Enter lecture title"
                                        className="transition-all duration-200 focus:ring-2 focus:ring-slate-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Lecture Video</Label>
                                    <div className="mt-1">
                                        {lecture.videoUrl ? (
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
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Video className="w-8 h-8 mb-2 text-slate-400" />
                                                    <p className="mb-2 text-sm text-slate-500">Click to upload video</p>
                                                    <p className="text-xs text-slate-400">MP4, WebM or Ogg (MAX. 100MB)</p>
                                                </div>
                                            </label>
                                        )}
                                        <input id={`video-${lecture.id}`} type="file" accept="video/*" className="hidden" onChange={(e) => handleVideoUpload(e, lecture.id)} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id={`preview-${lecture.id}`}
                                            checked={lecture.freePreview}
                                            onCheckedChange={(checked) => updateLecture(lecture.id, "freePreview", checked)}
                                        />
                                        <Label htmlFor={`preview-${lecture.id}`}>Free Preview</Label>
                                    </div>

                                    <Button variant="ghost" size="sm" onClick={() => removeLecture(lecture.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </motion.div>
    );
};

export default CourseCurriculum;
