import type { FC } from "react"
import { TextIcon } from "../../icons/textIcon";
import { VideoIcon } from "../../icons/videoIcon";
import { ImageIcon } from "../../icons/imageIcon";
import { AudioIcon } from "../../icons/audioIcon";
import { LinkIcon } from "../../icons/linkIcon";
// import { ShareIcon } from "../../icons/shareIcon";
import { DeleteIcon } from "../../icons/deleteIcon";
import { CustomAudioPlayer } from "./AudioPlayer";
import { ArticlePreview } from "./ArticlePreview";
import { BACKEND_URL } from "../../config";
import { useState } from "react";

export interface cardProps{
    id: string,
    title: string, 
    type: 'text' | 'video' | 'image' | 'audio' | 'link', 
    tags: string[] 
    date ?: string, 
    content: string, 
    extraClass ?: string,
    onContentDeleted?: () => void,
    readOnly?: boolean // New prop to control delete functionality
}
// Map type to icon component (store component, not element)
const typeIcon = new Map<string, FC>();
typeIcon.set('text', TextIcon);
typeIcon.set('video', VideoIcon);
typeIcon.set('image', ImageIcon);
typeIcon.set('audio', AudioIcon);
typeIcon.set('link', LinkIcon);

export function Card({id, title, type, tags,  content, extraClass, onContentDeleted, readOnly = false}: cardProps){
    const [isDeleting, setIsDeleting] = useState(false);
    
    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
            return;
        }

        setIsDeleting(true);
        
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please sign in to delete content');
                return;
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/content`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    contentId: id
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete content');
            }

            // Call callback to refresh content if provided
            if (onContentDeleted) {
                onContentDeleted();
            } else {
                // Fallback to page reload
                window.location.reload();
            }
            
        } catch (error) {
            console.error('Error deleting content:', error);
            alert(`Failed to delete content: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsDeleting(false);
        }
    };

    const IconComponent = typeIcon.get(type);
    const RenderContent = {
        'video': <iframe className="w-full" src={content} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>,
        'text': content, 
        'audio': <CustomAudioPlayer src={content}/>, 
        'image': <div className="w-full"><img src={content}alt={title}></img></div>, 
        'link': <ArticlePreview 
                  url={content}
                  title={title}
                  description="Click to view the full article" 
                />
    }
    return <div className={"flex flex-col w-2xs min-h-80 rounded-lg shadow-lg m-2 p-2 bg-white border-2 border-stone-200 justify-between " + extraClass}>
        <div className="flex items-center mb-2 justify-between">
            <div className="mr-2">{IconComponent && <IconComponent />}</div>
            <div className="font-bold text-lg">{title}</div>
            <div className="flex justify-end">
            {/* <button className="mx-1 hover:text-purple-600 cursor-pointer"><ShareIcon size="lg"/></button> */}
            {!readOnly && (
                <button 
                    className={`mx-1 cursor-pointer ${isDeleting ? 'opacity-50 cursor-not-allowed' : 'hover:text-red-500'}`}
                    onClick={handleDelete}
                    disabled={isDeleting}
                    title={isDeleting ? 'Deleting...' : 'Delete content'}
                >
                    <DeleteIcon />
                </button>
            )}
            </div>
        </div>
        <div className="text-md mb-2 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical' }}>
            {RenderContent[type]}
        </div>
        {/* Optionally render tags and date */}
        <div className="flex flex-wrap gap-1 mb-1">
            {tags.map(tag => <span key={tag} className="text-xs bg-purple-300 text-purple-600 rounded-lg p-1 py-0.5">{`#${tag}`}</span>)}
        </div>
        {/* <div className="text-xs text-stone-400 mb-2">{"Added-on "+ date}</div> */}
        
        {/* Clickable link for all types except text */}
        {type !== 'text' && (
            <a 
                href={content} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 hover:underline truncate border-t border-gray-200 pt-2"
                title={`Open ${type}: ${content}`}
            >
                🔗 {content}
            </a>
        )}
    </div>
}