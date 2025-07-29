import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "./ui/Card";
import { BACKEND_URL } from "../config";
import { Button } from "./ui/Button";
import { LeftArrowIcon } from "../icons/leftArrowIcon";
import { ContentViewer } from "./ui/ContentViewer";

interface Tag {
    _id: string;
    title: string;
}

interface User {
    _id: string;
    username: string;
}

interface Content {
    _id: string;
    link: string;
    type: 'text' | 'video' | 'audio' | 'image' | 'link';
    title: string;
    tags: Tag[];
    userId: User;
    __v: number;
}

interface SharedBrainResponse {
    message: string;
    contents: Content[];
}

export function SharedBrain() {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [contents, setContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ownerUsername, setOwnerUsername] = useState<string>("");
    const [selectedContent, setSelectedContent] = useState<{id: string, title: string, type: 'text' | 'video' | 'image' | 'audio' | 'link', tags: string[], content: string} | null>(null);
    

    const handleCardClick = (cardData: {id: string, title: string, type: 'text' | 'video' | 'image' | 'audio' | 'link', tags: string[], content: string}) => {
        setSelectedContent(cardData);
    };

    const handleCloseContentViewer = () => {
        setSelectedContent(null);
    };
    

    useEffect(() => {
        const abortController = new AbortController();
        
        const fetchSharedContents = async () => {
            if (!userId) {
                setError('Invalid share link');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${BACKEND_URL}/api/v1/brain/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    signal: abortController.signal
                });

                if (!response.ok) {
                    if (response.status === 403) {
                        throw new Error('This brain is not shared or the link is invalid');
                    }
                    throw new Error('Failed to fetch shared contents');
                }

                const data: SharedBrainResponse = await response.json();
                
                // Only update state if component is still mounted
                if (!abortController.signal.aborted) {
                    setContents(data.contents);
                    // Get username from the first content item
                    if (data.contents.length > 0) {
                        setOwnerUsername(data.contents[0].userId.username);
                    }
                }
            } catch (err) {
                // Only update state if component is still mounted and error is not due to abort
                if (!abortController.signal.aborted) {
                    console.error('Fetch error:', err);
                    
                    if (err instanceof Error) {
                        if (err.name === 'AbortError') {
                            return;
                        }
                        setError(err.message);
                    } else {
                        setError('An unknown error occurred');
                    }
                }
            } finally {
                // Only update loading state if component is still mounted
                if (!abortController.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchSharedContents();

        // Cleanup function
        return () => {
            abortController.abort();
        };
    }, [userId]);

    if (loading) {
        return (
            <div className="flex h-screen w-full justify-center items-center">
                <div className="text-lg">Loading shared brain...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen w-full justify-center items-center">
                <div className="text-lg text-red-500">Error: {error}</div>
            </div>
        );
    }

    
    

    return (
        <div className={`flex min-h-screen ${selectedContent ? 'overflow-hidden max-h-screen max-w-screen' : ''}`}>
            {/* Content Viewer Overlay */}
            {selectedContent && (
                <ContentViewer 
                    id={selectedContent.id}
                    title={selectedContent.title}
                    type={selectedContent.type}
                    tags={selectedContent.tags}
                    content={selectedContent.content}
                    onClose={handleCloseContentViewer}
                />
            )}
            
            {/* Main content area */}
            <div className="flex-1 overflow-hidden h-full w-full bg-gray-50">
                {/* Header */}
                <div className="flex h-16 sm:h-20 md:h-24 w-full justify-between items-center bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8">
                    <Button
                        variant="secondary"
                        size="sm"
                        text="Back"
                        startIcon={<LeftArrowIcon />}
                        onClick={() => navigate(-1)}
                        extraClass="mr-2 sm:mr-4"
                    />
                    <div className="font-bold text-base sm:text-xl md:text-2xl lg:text-3xl flex-1 text-center px-2">
                        {ownerUsername ? `All Notes of ${ownerUsername}` : "Shared Brain"}
                    </div>
                    <div className="w-16 sm:w-20"></div> {/* Spacer for centering */}
                </div>
                
                {/* Content grid */}
                <div className="min-h-full w-full px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 flex flex-wrap justify-center items-start overflow-y-auto">
                    {contents.length === 0 ? (
                        <div className="w-full text-center text-gray-500 mt-8 text-sm sm:text-base md:text-lg">
                            This brain has no content to share.
                        </div>
                    ) : (
                        contents.map((content) => (
                            <Card 
                                key={content._id}
                                id={content._id}
                                title={content.title} 
                                type={content.type} 
                                tags={content.tags.map(tag => tag.title)} 
                                date={new Date().toUTCString()} 
                                content={content.link} 
                                extraClass="m-1 sm:m-2"
                                readOnly={true}
                                onCardClick={handleCardClick}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
