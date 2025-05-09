import * as stylex from '@stylexjs/stylex';
import {
  radius,
  spacing,
  text,
  globalTokens as $,
} from '~/global-tokens.stylex';

export type ButtonProps = Readonly<
  {
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export function Button({
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      {...stylex.props(styles.base, sizes[size], variants[variant])}
      {...props}
    />
  );
}

const styles = stylex.create({
  base: {
    alignItems: 'center',
    borderColor: 'transparent',
    borderRadius: radius.md,
    borderStyle: 'solid',
    cursor: {
      default: 'pointer',
      ':disabled': 'not-allowed',
    },
    display: 'flex',
    flexShrink: 0,
    fontFamily: $.fontSans,
    fontSize: text.p,
    gap: spacing.xs,
    justifyContent: 'center',
    opacity: {
      default: 1,
      ':disabled': 0.5,
    },
    transition: 'all 0.2s ease',
  },
});

const sizes = stylex.create({
  md: {
    fontSize: text.p,
    paddingBottom: spacing.xxs,
    paddingLeft: spacing.sm,
    paddingRight: spacing.sm,
    paddingTop: spacing.xxs,
  },
});

const variants = stylex.create({
  primary: {
    backgroundColor: {
      default: '#4a90e2',
      ':hover': '#3a80d2',
    },
    color: '#ffffff',
  },
  secondary: {
    backgroundColor: {
      default: '#ffffff',
      ':hover': '#f5f5f5',
    },
    color: '#333333',
  },
});
