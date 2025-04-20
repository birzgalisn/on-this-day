import { create, props } from '@stylexjs/stylex';
import { OnThisDayFeature } from './features/on-this-day';

export function App() {
  return (
    <main {...props(styles.main)}>
      <OnThisDayFeature />
    </main>
  );
}

const styles = create({
  main: {
    height: '100%',
    margin: '0 auto',
    maxWidth: '100rem',
    padding: '2rem',
    width: '100%',
  },
});
