import { withOnThisDayContainer } from './hocs/with-on-this-day-container';
import { OnThisDayContent } from './components/on-this-day-content';

export const OnThisDay = withOnThisDayContainer()(OnThisDayContent);
