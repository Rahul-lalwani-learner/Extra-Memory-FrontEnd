import type { Dispatch, SetStateAction } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Overlay } from "./Overlay";
import { PopUpBox } from "./popUpBox";
import { Button } from "./Button";
import { TagSelector } from "./TagSelector";
import { useState } from "react";
import { PlusIcon } from "../../icons/plusIcon";
import { BACKEND_URL } from "../../config";

export function AddContent({setOverLayMode, onContentAdded}: {setOverLayMode: Dispatch<SetStateAction<string>>, onContentAdded?: () => void}){
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    
    // Sample available tags - in a real app, this would come from your backend
    const availableTags = [
        "javascript", "react", "typescript", "nodejs", "css", "html", 
        "programming", "tutorial", "documentation", "project", "learning",
        "frontend", "backend", "fullstack", "database", "api"
    ];

    const [contentType, setContentType] = useState<'text'| 'image' | 'audio' | 'video' | 'link'>('text');

    const handleAddContent = async () => {
        // Validation
        if (!title.trim()) {
            alert('Please enter a title');
            return;
        }
        
        if (!content.trim()) {
            alert('Please enter content');
            return;
        }

        if (selectedTags.length === 0) {
            alert('Please select at least one tag');
            return;
        }

        setLoading(true);
        
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please sign in to add content');
                return;
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/content`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: title.trim(),
                    link: content.trim(), // Using 'link' as the backend expects this field name
                    type: contentType,
                    tags: selectedTags // Note: Sending tag names - backend needs to handle tag creation/lookup
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add content');
            }

            await response.json();
            alert('Content added successfully!');
            
            // Reset form
            setTitle('');
            setContent('');
            setSelectedTags([]);
            setContentType('text');
            
            // Close modal
            setOverLayMode('default');
            
            // Call callback to refresh content if provided
            if (onContentAdded) {
                onContentAdded();
            } else {
                // Fallback to page reload
                window.location.reload();
            }
            
        } catch (error) {
            console.error('Error adding content:', error);
            alert(`Failed to add content: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    return <>
    <Overlay visiblity="block"></Overlay>
    <PopUpBox>
        <div className="sm:w-sm w-3xs px-4 pt-2 flex flex-col items-center items-start">
            <div className="flex w-full justify-between items-center pb-4 "> 
            <div className="font-bold text-lg">{"Add Content"}</div>
            <div onClick={()=>{setOverLayMode('default')}} className="cursor-pointer hover:text-purple-600"><CrossIcon/></div>
            </div>
            <div className="text-gray-400 text-sm ">Choose type</div>
            <div className="flex mb-2 w-[90%] flex-wrap">
                <Button variant={contentType=='text'? "primary": "secondary"} size="sm" text="text" onClick={()=>{setContentType("text")}} extraClass="w-[40px] text-xs my-[8px] ml-[0px] p-[4px]"></Button>
                <Button variant={contentType=='image'? "primary": "secondary"} size="sm" text="image" onClick={()=>{setContentType("image")}} extraClass="w-[40px] text-xs my-[8px] ml-[0px] p-[4px]"></Button>
                <Button variant={contentType=='video'? "primary": "secondary"} size="sm" text="video" onClick={()=>{setContentType("video")}} extraClass="w-[40px] text-xs my-[8px] ml-[0px] p-[4px]"></Button>
                <Button variant={contentType=='audio'? "primary": "secondary"} size="sm" text="audio" onClick={()=>{setContentType("audio")}} extraClass="w-[40px] text-xs my-[8px] ml-[0px] p-[4px]"></Button>
                <Button variant={contentType=='link'? "primary": "secondary"} size="sm" text="link" onClick={()=>{setContentType("link")}} extraClass="w-[40px] text-xs my-[8px] ml-[0px] p-[4px]"></Button>
            </div>
            <div className="bg-gray-300 px-2 py-1 w-[90%] mb-2 text-sm border border-stone-300 rounded-sm ">
                <input 
                    type="text" 
                    className="w-full outline-none" 
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            {contentType=='text' ? 
                <div className="bg-gray-300 px-2 py-1 w-[90%] mb-2 text-sm  border border-stone-300 rounded-sm ">
                    <textarea 
                        className="w-full min-h-24 outline-none" 
                        placeholder="Enter Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div> :
                <div className="bg-gray-300 px-2 py-1 w-[90%] mb-2 text-sm border border-stone-300 rounded-sm ">
                    <input 
                        type="text" 
                        className="w-full outline-none" 
                        placeholder={`Enter ${contentType} source url`}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
            }
            <div className="bg-gray-300 px-2 py-1 w-[90%] mb-2 text-sm border border-stone-300 rounded-sm ">
                <TagSelector 
                    availableTags={availableTags}
                    selectedTags={selectedTags}
                    onTagsChange={setSelectedTags}
                    placeholder="Type to search or add tags..."
                />
            </div>
            <Button 
                variant="primary" 
                text="Add" 
                size="sm" 
                startIcon={<PlusIcon size="size-6"/>} 
                onClick={handleAddContent}
                loading={loading}
                extraClass="mx-[0px]"
            />
        </div>
    </PopUpBox>
    </>
}