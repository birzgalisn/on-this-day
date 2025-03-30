import './on-this-day-container.css';

export function OnThisDayContainer({
  className = '',
  children,
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={`on-this-day ${className}`} {...props}>
      <h1>On this day</h1>

      {children}
    </div>
  );
}
