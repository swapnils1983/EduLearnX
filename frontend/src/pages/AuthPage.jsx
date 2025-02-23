import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";


export default function AuthPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Tabs defaultValue="signin" className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                    <SignIn />
                </TabsContent>
                <TabsContent value="signup">
                    <SignUp />
                </TabsContent>
            </Tabs>
        </div>
    );
}








// import { useState } from "react";
// import { LogIn, UserPlus } from "lucide-react";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { motion, AnimatePresence } from "framer-motion";

// const Index = () => {
//   const [authType, setAuthType] = useState("signin");

//   return (
//     <div className="relative min-h-screen flex items-center justify-center p-6 bg-auth-background overflow-hidden">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 -z-10">
//         <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-auth-background" />
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDUgTCAyMCA1IE0gNSAwIEwgNSAyMCBNIDAgMTUgTCAyMCAxNSBNIDE1IDAgTCAxNSAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTJlOGYwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-lg"
//       >
//         <div className="space-y-8 text-center mb-8">
//           <div className="space-y-2">
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900">
//               Welcome to EduLearn
//             </h1>
//             <p className="text-lg text-gray-600">
//               Choose your authentication method
//             </p>
//           </div>
//         </div>

//         <div className="backdrop-blur-sm bg-auth-card rounded-2xl shadow-xl border border-white/20 overflow-hidden">
//           <Tabs
//             value={authType}
//             onValueChange={setAuthType}
//             className="w-full"
//           >
//             <div className="p-6 pb-0">
//               <TabsList className="grid grid-cols-2 gap-4 bg-gray-100/50 p-1 rounded-lg">
//                 <TabsTrigger
//                   value="signin"
//                   className="data-[state=active]:bg-white data-[state=active]:text-auth-accent data-[state=active]:shadow-sm transition-all duration-200"
//                 >
//                   <div className="flex items-center gap-2 px-2">
//                     <LogIn className="h-4 w-4" />
//                     <span>Sign In</span>
//                   </div>
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="signup"
//                   className="data-[state=active]:bg-white data-[state=active]:text-auth-accent data-[state=active]:shadow-sm transition-all duration-200"
//                 >
//                   <div className="flex items-center gap-2 px-2">
//                     <UserPlus className="h-4 w-4" />
//                     <span>Sign Up</span>
//                   </div>
//                 </TabsTrigger>
//               </TabsList>
//             </div>

//             <div className="p-6">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={authType}
//                   initial={{ opacity: 0, x: authType === "signin" ? -20 : 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: authType === "signin" ? 20 : -20 }}
//                   transition={{ duration: 0.2 }}
//                   className="space-y-4"
//                 >
//                   {authType === "signin" ? (
//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <label className="text-sm font-medium text-gray-700">
//                           Email
//                         </label>
//                         <input
//                           type="email"
//                           className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-auth-accent/20 focus:border-auth-accent transition-all duration-200"
//                           placeholder="Enter your email"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <label className="text-sm font-medium text-gray-700">
//                           Password
//                         </label>
//                         <input
//                           type="password"
//                           className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-auth-accent/20 focus:border-auth-accent transition-all duration-200"
//                           placeholder="Enter your password"
//                         />
//                       </div>
//                       <button className="w-full bg-auth-accent hover:bg-auth-accent-hover text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
//                         Sign In
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <label className="text-sm font-medium text-gray-700">
//                           Name
//                         </label>
//                         <input
//                           type="text"
//                           className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-auth-accent/20 focus:border-auth-accent transition-all duration-200"
//                           placeholder="Enter your name"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <label className="text-sm font-medium text-gray-700">
//                           Email
//                         </label>
//                         <input
//                           type="email"
//                           className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-auth-accent/20 focus:border-auth-accent transition-all duration-200"
//                           placeholder="Enter your email"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <label className="text-sm font-medium text-gray-700">
//                           Password
//                         </label>
//                         <input
//                           type="password"
//                           className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-auth-accent/20 focus:border-auth-accent transition-all duration-200"
//                           placeholder="Choose a password"
//                         />
//                       </div>
//                       <button className="w-full bg-auth-accent hover:bg-auth-accent-hover text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
//                         Sign Up
//                       </button>
//                     </div>
//                   )}
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </Tabs>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Index;
