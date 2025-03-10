import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthCard from "./AuthCard";
import { User, KeyRound, Mail, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const SignUp = ({ switchToSignIn }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const { handleRegisterUser } = useContext(AuthContext);

    const onSubmit = async (data) => {
        const formData = {
            userEmail: data.email,
            userName: data.userName,
            role: data.role,
            password: data.password
        };

        try {
            const res = await handleRegisterUser(formData);
            if (res?.success) {
                toast.success("Sign up successful!");
                switchToSignIn();
            } else {
                toast.error(res?.message || "Sign up unsuccessful!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Sign-up failed. Try again.");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-white to-gray-50">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Join as a student or instructor
                    </p>
                </div>

                <AuthCard title="Sign Up">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    {...register("name", {
                                        required: "Full Name is required",
                                        minLength: {
                                            value: 3,
                                            message: "Name must be at least 3 characters",
                                        },
                                    })}
                                    className="pl-10"
                                />
                                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    placeholder="your@email.com"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    className="pl-10"
                                />
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    })}
                                    className="pl-10"
                                />
                                <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">Sign Up As</Label>
                            <div className="flex space-x-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        value="student"
                                        {...register("role", { required: "Please select a role" })}
                                    />
                                    <span>Student</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        value="instructor"
                                        {...register("role", { required: "Please select a role" })}
                                    />
                                    <span>Instructor</span>
                                </label>
                            </div>
                            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Creating Account..." : "Sign Up"}
                        </Button>
                    </form>
                </AuthCard>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-indigo-600 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
