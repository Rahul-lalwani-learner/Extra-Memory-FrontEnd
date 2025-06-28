import type { Dispatch, SetStateAction } from "react"
import { useEffect, useState } from "react"
import { PlusIcon } from "../icons/plusIcon"
import { ShareIcon } from "../icons/shareIcon"
import { Button } from "./ui/Button"
import { Card } from "./ui/Card"
import { BACKEND_URL } from "../config"

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

interface ContentResponse {
    contents: Content[];
}

interface ContentProps{
    isSm: boolean, 
    isXs: boolean, 
    setOverLayMode: Dispatch<SetStateAction<string>>,
    refreshKey?: number, 
    contentType ?: string
}

export function ContentSection({isSm, isXs, setOverLayMode, refreshKey, contentType}:ContentProps){
    const [contents, setContents] = useState<Content[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refreshContent = () => {
        setLoading(true);
        setError(null);
        // This will trigger the useEffect to refetch data based on contentType
        if (contentType === "tags") {
            fetchTags();
        } else {
            fetchContents();
        }
    };

    const fetchContents = async () => {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setError('No authentication token found. Please sign in.');
                setLoading(false);
                return;
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/content`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch contents');
            }

            const data: ContentResponse = await response.json();
            setContents(data.contents);
        } catch (err) {
            console.error('Fetch error:', err);
            
            if (err instanceof Error) {
                if (err.message === 'Failed to fetch') {
                    setError('Unable to connect to server. Please check if the backend is running.');
                } else {
                    setError(err.message);
                }
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchTags = async () => {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setError('No authentication token found. Please sign in.');
                setLoading(false);
                return;
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/tags`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch tags');
            }

            const data = await response.json();
            setTags(data.tags);
        } catch (err) {
            console.error('Fetch tags error:', err);
            
            if (err instanceof Error) {
                if (err.message === 'Failed to fetch') {
                    setError('Unable to connect to server. Please check if the backend is running.');
                } else {
                    setError(err.message);
                }
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const abortController = new AbortController();
        
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                
                if (!token) {
                    setError('No authentication token found. Please sign in.');
                    setLoading(false);
                    return;
                }

                // Fetch tags if contentType is "tags", otherwise fetch contents
                if (contentType === "tags") {
                    const response = await fetch(`${BACKEND_URL}/api/v1/tags`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        signal: abortController.signal
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch tags');
                    }

                    const data = await response.json();
                    
                    // Only update state if component is still mounted
                    if (!abortController.signal.aborted) {
                        setTags(data.tags);
                    }
                } else {
                    const response = await fetch(`${BACKEND_URL}/api/v1/content`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        signal: abortController.signal
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch contents');
                    }

                    const data: ContentResponse = await response.json();
                    
                    // Only update state if component is still mounted
                    if (!abortController.signal.aborted) {
                        setContents(data.contents);
                    }
                }
            } catch (err) {
                // Only update state if component is still mounted and error is not due to abort
                if (!abortController.signal.aborted) {
                    console.error('Fetch error:', err);
                    
                    if (err instanceof Error) {
                        if (err.name === 'AbortError') {
                            // Request was aborted, don't set error state
                            return;
                        } else if (err.message === 'Failed to fetch') {
                            setError('Unable to connect to server. Please check if the backend is running.');
                        } else {
                            setError(err.message);
                        }
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

        fetchData();

        // Cleanup function
        return () => {
            abortController.abort(); // Cancel the fetch request if component unmounts
        };
    }, [refreshKey, contentType]);

    if (loading) {
        return (
            <div className="flex h-screen w-full justify-center items-center">
                <div className="text-lg">Loading contents...</div>
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

    return <>
        <div className="flex h-24 w-full justify-between xs:flex-row flex-col items-center sm:pl-8 pl-2 py-2">
            <div className="font-bold text-lg sm:text-3xl xs:text-xl">{"All Notes"}</div>
            <div className="flex justify-between sm:pr-8 pr-2">
                <Button variant="secondary" size={isSm?'md':'sm'} text="Share Brain" startIcon={<ShareIcon size={isSm?'size-6':'size-4'}/>} onClick={()=>{setOverLayMode('brainShare')}} extraClass={isSm? 'w-38': isXs? '': 'text-xs w-[100px]'}></Button>
                <Button variant="primary" size={isSm?'md':'sm'} text="Add Content" startIcon={<PlusIcon size={isSm?"size-6":'size-4'}/>} onClick={()=>{setOverLayMode('addContent')}} extraClass={isSm? 'w-38': isXs? '': 'text-xs w-[100px]'}></Button>
            </div>
        </div>
        <div className="min-h-full w-full px-4 py-8 flex flex-wrap sm:justify-start justify-center">
            {contentType === "tags" ? (
                // Render tags view
                tags.length === 0 ? (
                    <div className="w-full text-center text-gray-500 mt-8">
                        No tags found. Add some content with tags to get started!
                    </div>
                ) : (
                    <div className="w-full flex flex-wrap gap-3 justify-center sm:justify-start">
                        {tags.map((tag) => (
                            <span 
                                key={tag} 
                                className="text-lg bg-purple-300 text-purple-600 rounded-lg px-4 py-2 font-medium hover:bg-purple-200 transition-colors cursor-pointer"
                                title={`Tag: ${tag}`}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )
            ) : (
                // Render content cards view
                contents.filter(content => !contentType || contentType === "all" || content.type === contentType).length === 0 ? (
                    <div className="w-full text-center text-gray-500 mt-8">
                        No content found. Add some content to get started!
                    </div>
                ) : ( 
                    contents
                        .filter(content => !contentType || contentType === "all" || content.type === contentType)
                        .map((content) => (
                            <Card 
                                key={content._id}
                                id={content._id}
                                title={content.title} 
                                type={content.type} 
                                tags={content.tags.map(tag => tag.title)} 
                                date={new Date().toUTCString()} 
                                content={content.link} 
                                extraClass={isXs ? `m-2 ` : ''}
                                onContentDeleted={refreshContent}
                            />
                        ))
                )
            )}
        </div>
    </>
}