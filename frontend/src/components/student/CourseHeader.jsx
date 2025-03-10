import { GraduationCap, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { createPaymentService, fetchInstructorCourseListService, fethCourceDetailById } from "@/services";
import { AuthContext } from "@/context/AuthContext";

const CourseHeader = ({ courses }) => {
    const { auth } = useContext(AuthContext)
    const [approvalUrl, setApprovalUrl] = useState("");
    async function handleCreatePayment() {
        const paymentPayload = {
            userId: auth?.user?._id,
            userName: auth?.user?.userName,
            userEmail: auth?.user?.userEmail,
            orderStatus: "pending",
            paymentMethod: "paypal",
            paymentStatus: "initiated",
            orderDate: new Date(),
            paymentId: "",
            payerId: "",
            instructorId: courses?.instructorId,
            instructorName: courses?.instructorName,
            courseImage: courses?.image,
            courseTitle: courses?.title,
            courseId: courses?._id,
            coursePricing: courses?.pricing,
        };

        console.log(paymentPayload, "paymentPayload");
        const response = await createPaymentService(paymentPayload);

        if (response.success) {
            sessionStorage.setItem(
                "currentOrderId",
                JSON.stringify(response?.data?.orderId)
            );
            setApprovalUrl(response?.data?.approveUrl);
        }
    }

    if (approvalUrl !== "") {
        window.location.href = approvalUrl;
    }
    // console.log(courses)
    return (
        <div className="w-full py-12 bg-gradient-to-b from-accent to-background animate-fade-in">
            <div className="container px-4 mx-auto">
                <div className="max-w-4xl mx-auto">
                    <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
                        {courses?.instructorName}
                    </span>
                    <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
                        {courses?.title}
                    </h1>
                    <div className="flex flex-wrap gap-4 mb-8 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            <span>12 hours</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            <span>6 weeks</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <GraduationCap className="w-5 h-5" />
                            <span>Intermediate</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <Button onClick={handleCreatePayment} size="lg" className="bg-primary hover:bg-primary/90 transition-colors">
                            Enroll Now
                        </Button>
                        <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                            Preview Course
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseHeader;
