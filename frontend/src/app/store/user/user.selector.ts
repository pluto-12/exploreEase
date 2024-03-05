import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserData } from './user.model';

export const selectUserState = createFeatureSelector<UserData>('userReducer');

export const userData = createSelector(selectUserState, (state) => state.user);
