import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserData } from './user.model';

export const intialState: UserData = {
  user: null,
};

export const userReducer = createReducer(
  intialState,
  on(UserActions.addUser, (state, { user }) => ({ ...state, user })),
  on(UserActions.clearUser, (state) => ({...StaticRange, user: null}))
);
