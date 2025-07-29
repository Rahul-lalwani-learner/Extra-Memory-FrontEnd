import { CrossIcon } from "../../icons/CrossIcon";
import { CustomAudioPlayer } from "./AudioPlayer";
import { ArticlePreview } from "./ArticlePreview";
import { TextIcon } from "../../icons/textIcon";
import { VideoIcon } from "../../icons/videoIcon";
import { ImageIcon } from "../../icons/imageIcon";
import { AudioIcon } from "../../icons/audioIcon";
import { LinkIcon } from "../../icons/linkIcon";
import { Overlay } from "./Overlay";
import { PopUpBox } from "./popUpBox";
import type { FC } from "react";

export interface ContentViewerProps {
    id: string;
    title: string;
    type: 'text' | 'video' | 'image' | 'audio' | 'link';
    tags: string[];
    content: string;
    onClose: () => void;
}

// Map type to icon component
const typeIcon = new Map<string, FC>();
typeIcon.set('text', TextIcon);
typeIcon.set('video', VideoIcon);
typeIcon.set('image', ImageIcon);
typeIcon.set('audio', AudioIcon);
typeIcon.set('link', LinkIcon);

export function ContentViewer({ title, type, tags, content, onClose }: ContentViewerProps) {
    const IconComponent = typeIcon.get(type);

    const RenderFullContent = {
        'video': (
            <div className="w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
                <iframe 
                    className="w-full h-64 sm:h-80 md:h-96 lg:h-[28rem]" 
                    src={content} 
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                />
            </div>
        ),
        'text': (
            <div className="w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
                <div className="bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6 lg:p-8 font-mono text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed whitespace-pre-wrap max-h-64 sm:max-h-80 md:max-h-96 lg:max-h-[28rem] overflow-y-auto">
                    {content}
                </div>
            </div>
        ),
        'audio': (
            <div className="w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
                <CustomAudioPlayer src={content} />
            </div>
        ),
        'image': (
            <div className="w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto flex justify-center">
                <img 
                    src={content} 
                    alt={title} 
                    className="max-w-full max-h-64 sm:max-h-80 md:max-h-96 lg:max-h-[28rem] object-contain rounded-lg shadow-lg"
                />
            </div>
        ),
        'link': (
            <div className="w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
                <ArticlePreview 
                    url={content}
                    title={title}
                    description="Full article preview"
                />
                <div className="mt-4 p-3 sm:p-4 md:p-5 lg:p-6 bg-blue-50 rounded-lg">
                    <p className="text-xs sm:text-sm md:text-base text-blue-800 mb-2">Original Link:</p>
                    <a 
                        href={content} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm md:text-base text-blue-600 hover:text-blue-800 hover:underline break-all"
                    >
                        {content}
                    </a>
                </div>
            </div>
        )
    };

    return (
        <>
            <Overlay visiblity="block" />
            <PopUpBox>
                <div className="w-[95vw] sm:w-2xl md:w-3xl lg:w-4xl max-w-[95vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[85vh] sm:max-h-[82vh] md:max-h-[80vh] lg:max-h-[78vh] overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-3 sm:p-4 md:p-5 lg:p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-1 min-w-0">
                            <div className="text-blue-500 text-sm sm:text-base md:text-lg flex-shrink-0">
                                {IconComponent && <IconComponent />}
                            </div>
                            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 truncate flex-1">
                                {title}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 sm:p-2 md:p-2.5 lg:p-3 hover:bg-gray-100 rounded-full transition-colors cursor-pointer hover:text-purple-600 flex-shrink-0 ml-2"
                            title="Close"
                        >
                            <CrossIcon />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5 lg:p-6">
                        {RenderFullContent[type]}
                    </div>

                    {/* Footer with tags */}
                    {tags.length > 0 && (
                        <div className="border-t border-gray-200 p-3 sm:p-4 md:p-5 lg:p-6">
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs sm:text-sm md:text-base font-medium text-gray-600 mr-2">Tags:</span>
                                {tags.map(tag => (
                                    <span 
                                        key={tag} 
                                        className="text-[10px] sm:text-xs md:text-sm bg-purple-100 text-purple-700 rounded-full px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 font-medium"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </PopUpBox>
        </>
    );
}
