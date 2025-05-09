import * as stylex from '@stylexjs/stylex';
import { spacing, globalTokens as $ } from '~/global-tokens.stylex';
import { OnThisDayFeature } from '~/features/on-this-day';

export function App() {
  return (
    <main {...stylex.props(styles.main)}>
      <OnThisDayFeature />
    </main>
  );
}

const styles = stylex.create({
  main: {
    height: '100svh',
    margin: {
      default: '0 auto',
    },
    maxWidth: $.maxWidth,
    padding: spacing.md,
    width: '100svw',
  },
});
