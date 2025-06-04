import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

// const Footer = () => {
//     return (
//         <footer className="bg-edu-dark text-white pt-20 pb-10">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
//                     <div className="lg:col-span-2 space-y-6">
//                         <Link to="/" className="inline-block">
//                             <span className="text-2xl font-semibold text-white">
//                                 Eduflow
//                             </span>
//                         </Link>

//                         <p className="text-white/70 max-w-md">
//                             Transforming education through technology. Our mission is to make high-quality learning accessible to everyone, everywhere.
//                         </p>

//                         <div className="flex space-x-4">
//                             {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, index) => (
//                                 <a key={index} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
//                                     <Icon className="h-5 w-5" />
//                                 </a>
//                             ))}
//                         </div>
//                     </div>

//                     {[
//                         { title: "Courses", links: ["design", "development", "data-science", "marketing", "business"] },
//                         { title: "Company", links: ["about", "careers", "blog", "press", "partners"] },
//                     ].map((section, index) => (
//                         <div key={index} className="space-y-4">
//                             <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
//                             <ul className="space-y-3">
//                                 {section.links.map((link, idx) => (
//                                     <li key={idx}>
//                                         <Link to={`/courses/${link}`} className="text-white/70 hover:text-white transition-colors">
//                                             {link.charAt(0).toUpperCase() + link.slice(1)}
//                                         </Link>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     ))}

//                     <div className="space-y-4">
//                         <h4 className="text-lg font-semibold mb-4">Contact</h4>
//                         <ul className="space-y-3">
//                             {[{ Icon: Mail, text: "support@eduflow.com" }, { Icon: Phone, text: "+1 (555) 123-4567" }, { Icon: MapPin, text: "123 Learning Street\nSan Francisco, CA 94103" }].map((item, index) => (
//                                 <li key={index} className="flex items-start">
//                                     <item.Icon className="h-5 w-5 mr-3 mt-0.5 text-edu-primary" />
//                                     <span className="text-white/70">{item.text}</span>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>

//                 <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
//                     <p className="text-white/60 text-sm mb-4 md:mb-0">
//                         © {new Date().getFullYear()} Eduflow. All rights reserved.
//                     </p>

//                     <div className="flex flex-wrap justify-center gap-4 md:gap-8">
//                         {["terms", "privacy", "cookies", "accessibility"].map((policy, index) => (
//                             <Link key={index} to={`/${policy}`} className="text-white/60 hover:text-white text-sm transition-colors">
//                                 {policy.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
//                             </Link>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// };

const Footer = () => {
    return (
        <footer className="bg-edu-dark text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        <Link to="/" className="inline-block">
                            <span className="text-2xl font-bold text-white">Eduflow</span>
                        </Link>
                        <p className="text-white/70 max-w-md">
                            Transforming education through technology. Our mission is to make high-quality learning accessible to everyone, everywhere.
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                    {/* Other sections */}
                </div>
            </div>
        </footer>
    );
};
export default Footer; 