import {
  OnThisDayContainer,
  OnThisDayContainerProps,
} from '~/features/on-this-day/components/on-this-day-container';

export function withOnThisDayContainer<
  Props extends React.JSX.IntrinsicAttributes,
>(containerProps: OnThisDayContainerProps = {}) {
  return (ContentComponent: React.FC<Props>) => (props: Props) => (
    <OnThisDayContainer {...containerProps}>
      <ContentComponent {...props} />
    </OnThisDayContainer>
  );
}
