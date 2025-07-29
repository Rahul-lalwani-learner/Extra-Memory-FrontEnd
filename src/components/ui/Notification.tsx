import { useEffect, useState, useCallback, useRef } from 'react';
import { CrossIcon } from '../../icons/CrossIcon';

export interface NotificationProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
    onComplete?: () => void;
    onClose?: () => void;
}

export function Notification({ 
    message, 
    type = 'info', 
    duration = 2000, 
    onComplete, 
    onClose 
}: NotificationProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const hideTimerRef = useRef<number | null>(null);

    const handleClose = useCallback(() => {
        console.log('handleClose called'); // Debug log
        
        // Clear the auto-dismiss timer if it exists
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }
        
        setIsRemoving(true);
        setTimeout(() => {
            setIsVisible(false);
            if (onComplete) {
                onComplete();
            }
            if (onClose) {
                onClose();
            }
        }, 300); // Animation duration
    }, [onComplete, onClose]);

    useEffect(() => {
        // Slide in animation
        const showTimer = setTimeout(() => {
            setIsVisible(true);
        }, 10);

        // Auto hide after duration
        hideTimerRef.current = setTimeout(() => {
            handleClose();
        }, duration);

        return () => {
            clearTimeout(showTimer);
            if (hideTimerRef.current) {
                clearTimeout(hideTimerRef.current);
            }
        };
    }, [duration, handleClose]);

    const getTypeStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500 text-white border-green-600';
            case 'error':
                return 'bg-red-500 text-white border-red-600';
            default:
                return 'bg-blue-500 text-white border-blue-600';
        }
    };

    return (
        <div 
            className={`transition-all duration-300 transform ${
                isVisible && !isRemoving 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
            }`}
        >
            <div className={`
                ${getTypeStyles()}
                rounded-lg shadow-lg border
                px-4 py-3 pr-12
                max-w-sm min-w-64
                flex items-center
                relative
                min-h-[3rem]
            `}>
                <div className="flex-1 pr-2 flex items-center">
                    <p className="text-sm font-medium">{message}</p>
                </div>
                <button
                    onClick={(e) => {
                        console.log('Button clicked'); // Debug log
                        e.preventDefault();
                        e.stopPropagation();
                        handleClose();
                    }}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors cursor-pointer z-[10000] p-2 rounded-full w-8 h-8 flex items-center justify-center"
                    aria-label="Close notification"
                    type="button"
                >
                    <CrossIcon size="size-4" />
                </button>
            </div>
        </div>
    );
}
