export type PageCardSkeletonProps = React.HTMLProps<HTMLDivElement>;

export function PageCardSkeleton({
  className = '',
  ...props
}: PageCardSkeletonProps) {
  return (
    <div className={`container row ${className}`} {...props}>
      <div className="skeleton thumbnail" />

      <div className="list column full-width">
        <h3 className="skeleton title">&nbsp;</h3>
        <p className="skeleton paragraph">&nbsp;</p>
        <p className="skeleton paragraph">&nbsp;</p>
      </div>
    </div>
  );
}
