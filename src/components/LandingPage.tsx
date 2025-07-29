import { useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import { StorageIcon } from "../icons/storageIcon";
import { TextIcon } from "../icons/textIcon";
import { VideoIcon } from "../icons/videoIcon";
import { ImageIcon } from "../icons/imageIcon";
import { LinkIcon } from "../icons/linkIcon";
import { AudioIcon } from "../icons/audioIcon";
import { HashIcon } from "../icons/hashIcon";

export default function LandingPage() {
    const navigate = useNavigate();

    const features = [
        {
            icon: <TextIcon />,
            title: "Documents",
            description: "Store and organize your important documents"
        },
        {
            icon: <VideoIcon />,
            title: "Videos",
            description: "Save video content for later reference"
        },
        {
            icon: <ImageIcon />,
            title: "Images",
            description: "Organize your visual content collection"
        },
        {
            icon: <LinkIcon />,
            title: "Links",
            description: "Bookmark important web resources"
        },
        {
            icon: <AudioIcon />,
            title: "Audio",
            description: "Store audio files and recordings"
        },
        {
            icon: <HashIcon />,
            title: "Tags",
            description: "Categorize content with smart tagging"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-3">
                            <StorageIcon size="size-8" />
                            <h1 className="text-2xl font-bold text-gray-900">Extra Memory</h1>
                        </div>
                        <div className="flex space-x-4">
                            <Button
                                variant="secondary"
                                size="md"
                                text="Login"
                                onClick={() => navigate("/login")}
                            />
                            <Button
                                variant="primary"
                                size="md"
                                text="Sign Up"
                                onClick={() => navigate("/signup")}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <h2 className="text-5xl font-bold text-gray-900 mb-6">
                        Your Digital
                        <span className="text-blue-500"> Second Brain</span>
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Store, organize, and access all your digital content in one place. 
                        From documents and videos to links and audio files - never lose track of important information again.
                    </p>
                    <div className="flex justify-center">
                        <Button
                            variant="primary"
                            size="lg"
                            text="Get Started Free"
                            onClick={() => navigate("/signup")}
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            Everything You Need in One Place
                        </h3>
                        <p className="text-lg text-gray-600">
                            Organize all types of content with powerful features designed for your productivity
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-200">
                                <div className="flex justify-center mb-4 text-blue-500">
                                    <div className="w-12 h-12 flex items-center justify-center">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h4>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">
                                Why Choose Extra Memory?
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Universal Content Storage</h4>
                                        <p className="text-gray-600">Support for all major file types and web content</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Smart Organization</h4>
                                        <p className="text-gray-600">Intelligent tagging and categorization system</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Easy Sharing</h4>
                                        <p className="text-gray-600">Share your knowledge base with others effortlessly</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Quick Access</h4>
                                        <p className="text-gray-600">Find what you need instantly with powerful search</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-blue-100 rounded-lg p-8 text-center">
                            <StorageIcon size="size-24" />
                            <h4 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
                                Start Building Your Second Brain Today
                            </h4>
                            <p className="text-gray-600 mb-6">
                                Join thousands of users who have organized their digital life with Extra Memory
                            </p>
                            <Button
                                variant="primary"
                                size="lg"
                                text="Create Account"
                                onClick={() => navigate("/signup")}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <StorageIcon size="size-8" />
                            <h5 className="text-xl font-bold">Extra Memory</h5>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Your digital second brain for storing and organizing all your important content.
                        </p>
                        <div className="flex justify-center space-x-6">
                            <Button
                                variant="secondary"
                                size="sm"
                                text="Privacy Policy"
                                onClick={() => {}}
                            />
                            <Button
                                variant="secondary"
                                size="sm"
                                text="Terms of Service"
                                onClick={() => {}}
                            />
                        </div>
                        <p className="text-gray-500 text-sm mt-8">
                            © 2025 Extra Memory. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
