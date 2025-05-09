import * as stylex from '@stylexjs/stylex';
import { spacing, globalTokens as $, radius } from '~/global-tokens.stylex';

export type NotificationProps = {
  type?: keyof typeof variants;
} & React.PropsWithChildren;

export function Notification({ type = 'info', children }: NotificationProps) {
  return (
    <div {...stylex.props(styles.base, variants[type])}>
      {children || (
        <p>
          {type === 'info' || type === 'success'
            ? 'Operation was successful'
            : 'An error occurred'}
        </p>
      )}
    </div>
  );
}

const styles = stylex.create({
  base: {
    borderRadius: radius.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'flex',
    fontFamily: $.fontSans,
    padding: spacing.xs,
  },
});

const variants = stylex.create({
  info: {
    backgroundColor: '#d1ecf1',
    borderColor: '#bee5eb',
    color: '#0c5460',
  },
  success: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    color: '#155724',
  },
  error: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    color: '#721c24',
  },
});
