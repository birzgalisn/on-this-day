import './notification.css';

export type NotificationProps = {
  type: 'info' | 'success' | 'error';
} & React.HTMLAttributes<HTMLDivElement>;

export function Notification({
  type,
  className = '',
  children,
  ...props
}: NotificationProps) {
  return (
    <div
      className={`container notification--${type} full-width ${className}`}
      {...props}
    >
      {children || (
        <p>
          {type === 'info' || type === 'success'
            ? 'Operation was successful'
            : 'An error occurred'}
        </p>
      )}
    </div>
  );
}
