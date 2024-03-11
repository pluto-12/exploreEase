import { createReducer, on } from '@ngrx/store';
import * as GuideActions from './guide.actions';
import { GuideData } from './guide.model';

export const intialState: GuideData = {
  guide: null,
};

export const guideReducer = createReducer(
  intialState,
  on(GuideActions.addGuide, (state, { guide }) => ({ ...state, guide })),
  on(GuideActions.clearGuide, (state) => ({...StaticRange, guide: null}))
);
