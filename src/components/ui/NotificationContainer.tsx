import { Notification } from './Notification';
import type { NotificationData } from '../../hooks/useNotification';

interface NotificationContainerProps {
    notifications: NotificationData[];
    onNotificationComplete: (id: string) => void;
    onNotificationClose: (id: string) => void;
}

export function NotificationContainer({ 
    notifications, 
    onNotificationComplete, 
    onNotificationClose 
}: NotificationContainerProps) {
    return (
        <div className="fixed inset-0 pointer-events-none z-[9998]">
            {notifications.map((notification, index) => (
                <div 
                    key={notification.id}
                    className="pointer-events-auto"
                    style={{
                        position: 'fixed',
                        bottom: `${16 + (index * 80)}px`, // Stack notifications vertically
                        right: '16px',
                        zIndex: 9999 + index
                    }}
                >
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        duration={notification.duration}
                        onComplete={() => {
                            if (notification.onComplete) {
                                notification.onComplete();
                            }
                            onNotificationComplete(notification.id);
                        }}
                        onClose={() => onNotificationClose(notification.id)}
                    />
                </div>
            ))}
        </div>
    );
}
