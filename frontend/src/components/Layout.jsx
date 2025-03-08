import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Play, List, Bookmark, User, Settings, LogOut } from 'lucide-react';

const Layout = ({ children }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen flex bg-background text-foreground">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-64 border-r border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="p-6">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                            <Play className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium text-xl">LectureHub</span>
                    </Link>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1">
                    <div className={`sidebar-item ${isActive('/') ? 'active' : ''}`}>
                        <List size={18} />
                        <span>All Lectures</span>
                    </div>
                    <div className={`sidebar-item ${isActive('/saved') ? 'active' : ''}`}>
                        <Bookmark size={18} />
                        <span>Saved</span>
                    </div>
                    <div className={`sidebar-item ${isActive('/profile') ? 'active' : ''}`}>
                        <User size={18} />
                        <span>My Profile</span>
                    </div>
                    <div className={`sidebar-item ${isActive('/settings') ? 'active' : ''}`}>
                        <Settings size={18} />
                        <span>Settings</span>
                    </div>
                </nav>

                <div className="p-4 border-t border-border/50">
                    <div className="sidebar-item text-muted-foreground">
                        <LogOut size={18} />
                        <span>Log Out</span>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
};

export default Layout;
