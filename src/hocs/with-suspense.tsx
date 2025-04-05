import { lazy, Suspense } from 'react';

export function withSuspense<Props extends React.JSX.IntrinsicAttributes>(
  suspenseProps: React.SuspenseProps = {},
) {
  return <ComponentProps extends Props>(
    load: () => Promise<{ default: React.ComponentType<ComponentProps> }>,
  ) => {
    const LazyComponent = lazy(load);

    return (props: ComponentProps) => (
      <Suspense {...suspenseProps}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
