import './button.css';

export type ButtonProps = {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button button--${variant} button--${size} ${className}`}
      {...props}
    />
  );
}
