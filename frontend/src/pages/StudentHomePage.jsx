import CourseGrid from "@/components/student/CourseGrid";
import NavigationMenu from "@/components/student/NavigationMenu";
import WelcomeSection from "@/components/student/WelcomeSection";


function StudentHomePage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                <div className="hidden md:block w-64 p-6">
                    <NavigationMenu />
                </div>
                <main className="flex-1 p-6 pb-24 md:pb-6 space-y-6 max-w-6xl mx-auto">
                    <WelcomeSection />
                    <section>
                        <h2 className="text-2xl font-semibold mb-6">Courses</h2>
                        <CourseGrid />
                    </section>
                </main>
            </div>
            <div className="md:hidden">
                <NavigationMenu />
            </div>
        </div>
    );
}

export default StudentHomePage;
