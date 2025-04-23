import { withOnThisDayContainer } from '~/features/on-this-day/hocs/with-on-this-day-container';
import { OnThisDayContent } from '~/features/on-this-day/components/on-this-day-content';

export const OnThisDay = withOnThisDayContainer()(OnThisDayContent);
