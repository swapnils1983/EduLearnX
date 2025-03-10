import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import { useState } from "react";


export default function AuthPage() {
    const [activeTab, setActiveTab] = useState("signin");

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                    <SignIn />
                </TabsContent>
                <TabsContent value="signup">
                    <SignUp switchToSignIn={() => setActiveTab("signin")} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
