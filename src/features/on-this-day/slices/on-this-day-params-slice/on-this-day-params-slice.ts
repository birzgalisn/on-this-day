import { createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { WikiOnThisDayType } from '~/schemas/wiki-on-this-day';

export type OnThisDayParamsState = {
  type: WikiOnThisDayType;
  MM?: string;
  DD?: string;
};

const onThisDayParamsSlice = createSlice({
  name: 'onThisDayParams',
  initialState: {
    type: 'births',
  } satisfies OnThisDayParamsState as OnThisDayParamsState,
  reducers(create) {
    return {
      setType: create.reducer<{ type: WikiOnThisDayType }>((state, action) => {
        Object.assign(state, action.payload);
      }),
      setDate: create.preparedReducer(
        ({ date }: { date: string }) => ({
          payload: { MM: format(date, 'MM'), DD: format(date, 'dd') },
        }),
        (state, action) => {
          Object.assign(state, action.payload);
        },
      ),
    };
  },
});

export const { setType, setDate } = onThisDayParamsSlice.actions;

export const onThisDayParamsReducer = onThisDayParamsSlice.reducer;
