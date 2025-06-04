import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { mediaUploadService } from "@/services";

const CourseDetails = ({ data, updateData }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handleImageUpload = async (e) => {

        const file = e.target.files?.[0];
        if (file) {
            setIsSubmitting(false)
            const formData = new FormData();
            formData.append("file", file);
            try {
                const { data } = await mediaUploadService(formData);
                updateData({ image: data.secure_url });
            } catch (error) {
                console.error("Image upload failed", error);
            } finally {
                setIsSubmitting(false)
            }
        }
    };

    return (
        <Card>
            <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Course Details</h2>
                <div className="space-y-4">
                    {/* Course Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => updateData({ description: e.target.value })}
                            placeholder="Describe what your course is about, what students will learn, and what skills they'll acquire."
                            className="min-h-32"
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
                        <div className="space-y-2">
                            <Label htmlFor="price">Price:</Label>
                            <Input
                                type="number"
                                id="price"
                                value={data.pricing}
                                onChange={(e) => updateData({ pricing: Number(e.target.value) || 0 })}
                                placeholder="Enter course price"
                                className="min-h-10 p-2 border rounded-md"
                            />
                        </div>

                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CourseDetails;