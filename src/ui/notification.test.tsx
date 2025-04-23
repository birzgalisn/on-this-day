import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Notification, NotificationProps } from '~/ui/notification';

describe.each<NotificationProps['type']>(['info', 'success', 'error'])(
  "Notification of type '%s'",
  (type) => {
    it('is visible', () => {
      const result = renderNotification({ type });

      expect(result.notification).toBeVisible();
    });

    it('has the correct class', () => {
      const result = renderNotification({ type });

      expect(result.notification).toHaveClass(`notification--${type}`);
    });

    it('can be clicked', async () => {
      const onClick = vi.fn();
      const result = renderNotification({ type, onClick });

      await userEvent.click(result.notification);

      expect(onClick).toHaveBeenCalledOnce();
    });
  },
);

function renderNotification({
  type = 'info',
  ...props
}: Partial<Omit<NotificationProps, 'children'>>) {
  const result = render(
    <Notification type={type} {...props}>
      Notification
    </Notification>,
  );

  return {
    ...result,
    get notification() {
      return result.getByText('Notification');
    },
  } as const;
}
