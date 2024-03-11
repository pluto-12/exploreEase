import { createAction, props } from '@ngrx/store';
import { Guide } from './guide.model';

export const addGuide = createAction('[Guide] Add Guide', props<{ guide: Guide }>());
export const clearGuide = createAction('[Guide] Clear Guide Data')

