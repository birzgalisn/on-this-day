import * as stylex from '@stylexjs/stylex';
import { globalTokens as $, spacing, text } from '~/global-tokens.stylex';
import { OnThisDayNavigation } from '~/features/on-this-day/components/on-this-day-navigation';

export type OnThisDayContainerProps = React.HTMLProps<HTMLDivElement>;

export function OnThisDayContainer({
  children,
  ...props
}: OnThisDayContainerProps) {
  return (
    <div {...stylex.props(styles.container)} {...props}>
      <h1 {...stylex.props(styles.title)}>On this day</h1>

      <OnThisDayNavigation />

      {children}
    </div>
  );
}

const styles = stylex.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
    height: '100%',
    justifyContent: 'center',
  },
  title: {
    fontFamily: $.fontSans,
    fontSize: text.h1,
  },
});
