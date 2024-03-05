import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const addUser = createAction('[User] Add User', props<{ user: User }>());
export const clearUser = createAction('[User] Clear User Data')

