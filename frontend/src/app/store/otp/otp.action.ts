import { createAction, props } from "@ngrx/store";

export const setOtp = createAction('[OTP] set OTP', props<{otp: string}>())
export const clearOtp = createAction('[OTP] clear OTP')
export const getOtp = createAction('[OTP] Get OTP', props<{otp: string}>());