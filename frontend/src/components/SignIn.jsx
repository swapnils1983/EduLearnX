import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthCard from "./AuthCard";
import { User, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const SignIn = ({ role }) => {
    const { handleRegisterUser, handleLoginUser } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const formData = {
            userEmail: data.email,
            userName: data.userName,
            password: data.password
        };
        console.log("Submitting data:", formData);

        try {
            const res = await handleLoginUser(formData);
            console.log("Server Response:", res);

            if (res?.success) {
                toast.success("Sign up successful!");


                if (res?.user) {

                    // navigate("/dashboard");
                }
            } else {
                toast.error(res?.message || "Sign up unsuccessful!");
            }
        } catch (error) {
            console.error("Error during sign-up:", error);
            console.error("Error details:", error.response?.data);
            toast.error("An error occurred. Please try again.");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-white to-gray-50">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">Continue inspiring minds</p>
                </div>

                <AuthCard title="Sign In">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email format",
                                        },
                                    })}
                                    className="pl-10"
                                />
                                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
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

                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-600">Don't have an account? </span>
                        <Link
                            to="/instructor/signup"
                            className="font-semibold text-primary hover:text-primary/90 transition-colors"
                        >
                            Sign up
                        </Link>
                    </div>

                    <div className="mt-2 text-center">
                        <Link
                            to="/student/signin"
                            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Sign in as student instead
                        </Link>
                    </div>
                </AuthCard>
            </div>
        </div>
    );
};

export default SignIn;
