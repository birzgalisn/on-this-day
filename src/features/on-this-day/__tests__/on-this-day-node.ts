import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { getPaddedDate } from '../../../lib/get-padded-date';
import { WikiOnThisDayType } from '../../../schema/wiki-on-this-day';
import { births } from './on-this-day.json';

const [currentMonth, currentDay] = getPaddedDate();
const path = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/births/${currentMonth}/${currentDay}`;

const handlers = Object.freeze([
  http.get(path, async () => {
    await delay(100);
    return HttpResponse.json({ births });
  }),
]);

export const onThisDayServer = setupServer(...handlers);

export function mockOnThisDayServerError() {
  onThisDayServer.resetHandlers(
    http.get(path, async () => {
      await delay(100);
      return HttpResponse.error();
    }),
  );
}

export function mockOnThisDayResponse(
  body: Partial<Record<WikiOnThisDayType, unknown>> = { births: {} },
) {
  onThisDayServer.resetHandlers(
    http.get(path, async () => {
      await delay(100);
      return HttpResponse.json(body);
    }),
  );
}
