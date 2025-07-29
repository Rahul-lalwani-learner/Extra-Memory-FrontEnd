import { useState, useCallback } from 'react';

export interface NotificationData {
    id: string;
    message: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
    onComplete?: () => void;
}

export function useNotification() {
    const [notifications, setNotifications] = useState<NotificationData[]>([]);

    const showNotification = useCallback((
        message: string, 
        type: 'success' | 'error' | 'info' = 'info',
        duration: number = 2000,
        onComplete?: () => void
    ) => {
        const id = Math.random().toString(36).substr(2, 9);
        const notification: NotificationData = { id, message, type, duration, onComplete };
        
        setNotifications(prev => [...prev, notification]);
        
        return id;
    }, []);

    const removeNotification = useCallback((id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    return {
        showNotification,
        removeNotification,
        notifications
    };
}
