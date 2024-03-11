import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GuideData } from './guide.model';

export const selectGuideState = createFeatureSelector<GuideData>('guideReducer');

export const userData = createSelector(selectGuideState, (state) => state.guide);
