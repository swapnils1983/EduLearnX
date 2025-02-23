import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

const CourseBasics = ({ data, updateData }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => updateData({ title: e.target.value })}
                    placeholder="Enter course title"
                    className="transition-all duration-200 focus:ring-2 focus:ring-slate-200"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                        value={data.category}
                        onValueChange={(value) => updateData({ category: value })}
                    >
                        <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="programming">Programming</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <Select
                        value={data.level}
                        onValueChange={(value) => updateData({ level: value })}
                    >
                        <SelectTrigger id="level">
                            <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="primaryLanguage">Primary Language</Label>
                    <Select
                        value={data.primaryLanguage}
                        onValueChange={(value) => updateData({ primaryLanguage: value })}
                    >
                        <SelectTrigger id="primaryLanguage">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="pricing">Price (USD)</Label>
                    <Input
                        id="pricing"
                        type="number"
                        value={data.pricing}
                        onChange={(e) => updateData({ pricing: Number(e.target.value) })}
                        placeholder="Enter price"
                        min="0"
                        className="transition-all duration-200 focus:ring-2 focus:ring-slate-200"
                    />
                </div>
            </div>
        </motion.div>
    );
};

// PropTypes for validation
CourseBasics.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        category: PropTypes.string,
        level: PropTypes.string,
        primaryLanguage: PropTypes.string,
        pricing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    updateData: PropTypes.func.isRequired,
};

export default CourseBasics;
