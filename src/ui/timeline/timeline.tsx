import * as stylex from '@stylexjs/stylex';
import { globalTokens as $, text } from '~/global-tokens.stylex';

export type TimelineProps = {} & React.PropsWithChildren;

export function Timeline({ children }: TimelineProps) {
  return (
    <div {...stylex.props(styles.container)}>
      <span {...stylex.props(styles.line)} />
      {children}
    </div>
  );
}

export type TimelineItemProps = {} & React.PropsWithChildren;

Timeline.Item = function TimelineItem({ children }: TimelineItemProps) {
  return (
    <div {...stylex.props(styles.item)}>
      <span {...stylex.props(styles.dot)} />
      <span {...stylex.props(styles.content)}>{children}</span>
    </div>
  );
};

const styles = stylex.create({
  container: {
    maxWidth: '85px',
    minWidth: '85px',
    paddingLeft: '12px',
    paddingRight: '12px',
    position: 'relative',
    width: '100%',
  },
  line: {
    backgroundColor: '#f5f5f5',
    bottom: 0,
    left: '16px',
    position: 'absolute',
    top: 0,
    width: '2px',
    zIndex: 0,
  },
  item: {
    alignItems: 'center',
    display: 'flex',
    gap: '8px',
    paddingTop: '12px',
    position: 'relative',
    zIndex: 1,
  },
  dot: {
    backgroundColor: '#f5f5f5',
    borderRadius: '50%',
    flexShrink: 0,
    height: '10px',
    width: '10px',
  },
  content: {
    fontFamily: $.fontSans,
    fontSize: text.p,
  },
});
