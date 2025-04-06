import './on-this-day-container.css';

export type OnThisDayContainerProps = {} & React.HTMLProps<HTMLDivElement>;

export function OnThisDayContainer({
  className = '',
  children,
  ...props
}: OnThisDayContainerProps) {
  return (
    <div className={`on-this-day ${className}`} {...props}>
      <h1>On this day</h1>

      {children}
    </div>
  );
}
