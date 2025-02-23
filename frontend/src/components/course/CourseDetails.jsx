import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { mediaUploadService } from "@/services";

const CourseDetails = ({ data, updateData }) => {
    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await mediaUploadService(formData);
                console.log(response.data.secure_url)
                updateData({ image: response.data.secure_url });
            } catch (error) {
                console.error("Image upload failed", error);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div className="space-y-2">
                <Label htmlFor="subtitle">Course Subtitle</Label>
                <Input
                    id="subtitle"
                    value={data.subtitle}
                    onChange={(e) => updateData({ subtitle: e.target.value })}
                    placeholder="Enter a subtitle"
                    className="transition-all duration-200 focus:ring-2 focus:ring-slate-200"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Course Description</Label>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => updateData({ description: e.target.value })}
                    placeholder="Describe your course"
                    className="min-h-[150px] transition-all duration-200 focus:ring-2 focus:ring-slate-200"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="objectives">Learning Objectives</Label>
                <Textarea
                    id="objectives"
                    value={data.objectives}
                    onChange={(e) => updateData({ objectives: e.target.value })}
                    placeholder="What will students learn?"
                    className="min-h-[150px] transition-all duration-200 focus:ring-2 focus:ring-slate-200"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="welcomeMessage">Welcome Message</Label>
                <Input
                    id="welcomeMessage"
                    value={data.welcomeMessage}
                    onChange={(e) => updateData({ welcomeMessage: e.target.value })}
                    placeholder="Welcome message for your students"
                    className="transition-all duration-200 focus:ring-2 focus:ring-slate-200"
                />
            </div>

            <div className="space-y-2">
                <Label>Course Image</Label>
                <div className="flex items-center justify-center w-full">
                    <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-200 border-dashed rounded-lg cursor-pointer hover:bg-slate-50 transition-all duration-200"
                    >
                        {data.image ? (
                            <img
                                src={data.image}
                                alt="Course preview"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-4 text-slate-400" />
                                <p className="mb-2 text-sm text-slate-500">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-slate-400">PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                        )}
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>
            </div>
        </motion.div>
    );
};

export default CourseDetails;
