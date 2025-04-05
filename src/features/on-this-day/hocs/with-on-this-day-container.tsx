import { OnThisDayContainer } from '../components/on-this-day-container';

export function withOnThisDayContainer<
  Props extends React.JSX.IntrinsicAttributes,
>() {
  return (ContentComponent: React.FC<Props>) => (props: Props) => (
    <OnThisDayContainer>
      <ContentComponent {...props} />
    </OnThisDayContainer>
  );
}
