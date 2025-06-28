import { useState, useRef, useEffect } from "react";
import { CrossIcon } from "../../icons/CrossIcon";

export interface TagSelectorProps {
    availableTags?: string[];
    selectedTags?: string[];
    onTagsChange?: (tags: string[]) => void;
    placeholder?: string;
}

export function TagSelector({ 
    availableTags = [], 
    selectedTags = [], 
    onTagsChange,
    placeholder = "Type to search or add tags..."
}: TagSelectorProps) {
    const [inputValue, setInputValue] = useState("");
    const [internalSelectedTags, setInternalSelectedTags] = useState<string[]>(selectedTags);
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredTags, setFilteredTags] = useState<string[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const highlightedItemRef = useRef<HTMLDivElement>(null);

    // Use internal state if no onTagsChange is provided
    const currentSelectedTags = onTagsChange ? selectedTags : internalSelectedTags;
    const setSelectedTags = onTagsChange || setInternalSelectedTags;

    useEffect(() => {
        if (inputValue) {
            const filtered = availableTags.filter(tag => 
                tag.toLowerCase().includes(inputValue.toLowerCase()) &&
                !currentSelectedTags.includes(tag)
            );
            setFilteredTags(filtered);
            // Show dropdown when there's input value
            setShowDropdown(true);
        } else {
            // Show all available tags that aren't already selected when input is empty
            const unselectedTags = availableTags.filter(tag => 
                !currentSelectedTags.includes(tag)
            );
            setFilteredTags(unselectedTags);
        }
        // Reset highlighted index when filtered tags change
        setHighlightedIndex(-1);
    }, [inputValue, availableTags, currentSelectedTags]);

    // Auto-scroll to highlighted item
    useEffect(() => {
        if (highlightedIndex >= 0 && dropdownRef.current) {
            const dropdown = dropdownRef.current;
            const highlightedElement = dropdown.children[highlightedIndex] as HTMLElement;
            
            if (highlightedElement) {
                const dropdownRect = dropdown.getBoundingClientRect();
                const itemRect = highlightedElement.getBoundingClientRect();
                
                // Check if item is below visible area
                if (itemRect.bottom > dropdownRect.bottom) {
                    dropdown.scrollTop += itemRect.bottom - dropdownRect.bottom;
                }
                // Check if item is above visible area
                else if (itemRect.top < dropdownRect.top) {
                    dropdown.scrollTop -= dropdownRect.top - itemRect.top;
                }
            }
        }
    }, [highlightedIndex]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
                setHighlightedIndex(-1);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        // Show dropdown when user starts typing
        if (!showDropdown) {
            setShowDropdown(true);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!showDropdown) {
                setShowDropdown(true);
            }
            const maxIndex = filteredTags.length + (inputValue.trim() && filteredTags.length === 0 ? 0 : -1);
            setHighlightedIndex(prev => prev < maxIndex ? prev + 1 : 0);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const maxIndex = filteredTags.length + (inputValue.trim() && filteredTags.length === 0 ? 0 : -1);
            setHighlightedIndex(prev => prev > 0 ? prev - 1 : maxIndex);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (highlightedIndex >= 0 && highlightedIndex < filteredTags.length) {
                // Select highlighted tag from dropdown
                addTag(filteredTags[highlightedIndex]);
            } else if (highlightedIndex === filteredTags.length && inputValue.trim()) {
                // Add new tag if highlighted item is "Add new tag" option
                addTag(inputValue.trim());
            } else if (inputValue.trim()) {
                // Add new tag if no item is highlighted but there's input
                addTag(inputValue.trim());
            }
        } else if (e.key === 'Escape') {
            setShowDropdown(false);
            setHighlightedIndex(-1);
        } else if (e.key === 'Backspace' && !inputValue && currentSelectedTags.length > 0) {
            // Remove last tag when backspace is pressed on empty input
            removeTag(currentSelectedTags[currentSelectedTags.length - 1]);
        }
    };

    const addTag = (tag: string) => {
        if (tag && !currentSelectedTags.includes(tag)) {
            const newTags = [...currentSelectedTags, tag];
            setSelectedTags(newTags);
            if (onTagsChange) {
                onTagsChange(newTags);
            }
            setInputValue("");
            setShowDropdown(false);
            setHighlightedIndex(-1);
        }
    };

    const removeTag = (tagToRemove: string) => {
        const newTags = currentSelectedTags.filter(tag => tag !== tagToRemove);
        setSelectedTags(newTags);
        if (onTagsChange) {
            onTagsChange(newTags);
        }
    };

    const handleTagClick = (tag: string) => {
        addTag(tag);
    };

    const handleAddNewTag = () => {
        if (inputValue.trim()) {
            addTag(inputValue.trim());
        }
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* Selected Tags Display */}
            {currentSelectedTags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                    {currentSelectedTags.map(tag => (
                        <span 
                            key={tag} 
                            className="text-xs bg-purple-300 text-purple-600 rounded-lg p-1 py-0.5 flex items-center gap-1"
                        >
                            {`#${tag}`}
                            <button 
                                onClick={() => removeTag(tag)}
                                className="hover:text-purple-800"
                                type="button"
                            >
                                <span className="cursor-pointer"><CrossIcon size="size-4"/></span>
                            </button>
                        </span>
                    ))}
                </div>
            )}
            
            {/* Input Field */}
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowDropdown(true)}
                placeholder={placeholder}
                className="w-full outline-none bg-transparent"
            />

            {/* Dropdown */}
            {showDropdown && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg z-10" ref={dropdownRef}>
                    {filteredTags.length > 0 ? (
                        filteredTags.map((tag, index) => (
                            <div
                                key={tag}
                                ref={index === highlightedIndex ? highlightedItemRef : null}
                                onClick={() => handleTagClick(tag)}
                                className={`px-3 py-2 cursor-pointer text-sm ${
                                    index === highlightedIndex 
                                        ? 'bg-purple-100 text-purple-700' 
                                        : 'hover:bg-gray-100'
                                }`}
                            >
                                #{tag}
                            </div>
                        ))
                    ) : (
                        inputValue.trim() ? (
                            <div
                                ref={highlightedIndex === 0 ? highlightedItemRef : null}
                                onClick={handleAddNewTag}
                                className={`px-3 py-2 cursor-pointer text-sm text-purple-600 ${
                                    highlightedIndex === 0 
                                        ? 'bg-purple-100' 
                                        : 'hover:bg-gray-100'
                                }`}
                            >
                                + Add new tag "{inputValue.trim()}"
                            </div>
                        ) : (
                            <div className="px-3 py-2 text-sm text-gray-500">
                                No tags available
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}
