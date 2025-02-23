import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const CoursePreview = ({ data }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div className="aspect-video relative rounded-lg overflow-hidden bg-slate-100">
                {data.image ? (
                    <img
                        src={data.image}
                        alt={data.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">
                        No preview image
                    </div>
                )}
            </div>

            <div>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                    {data.category}
                </span>
                <h1 className="mt-4 text-3xl font-bold text-slate-900">{data.title}</h1>
                <p className="mt-2 text-xl text-slate-600">{data.subtitle}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                    <p className="font-medium text-slate-900">Level</p>
                    <p className="mt-1 text-slate-600 capitalize">{data.level}</p>
                </div>
                <div>
                    <p className="font-medium text-slate-900">Language</p>
                    <p className="mt-1 text-slate-600 capitalize">{data.primaryLanguage}</p>
                </div>
                <div>
                    <p className="font-medium text-slate-900">Price</p>
                    <p className="mt-1 text-slate-600">${data.pricing}</p>
                </div>
            </div>

            <Separator />

            <div>
                <h2 className="text-xl font-semibold text-slate-900">About this course</h2>
                <p className="mt-4 text-slate-600 whitespace-pre-wrap">{data.description}</p>
            </div>

            <div>
                <h2 className="text-xl font-semibold text-slate-900">
                    What you'll learn
                </h2>
                <p className="mt-4 text-slate-600 whitespace-pre-wrap">{data.objectives}</p>
            </div>

            <Separator />

            <div>
                <h2 className="text-xl font-semibold text-slate-900">Course content</h2>
                <div className="mt-4 space-y-4">
                    {data.curriculum?.map((lecture, index) => (
                        <div
                            key={lecture.id}
                            className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                        >
                            <div>
                                <p className="font-medium text-slate-900">
                                    {index + 1}. {lecture.title}
                                </p>
                                {lecture.freePreview && (
                                    <span className="text-xs text-slate-500">Free preview</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default CoursePreview;
