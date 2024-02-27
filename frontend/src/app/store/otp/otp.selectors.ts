import { createSelector, createFeatureSelector } from "@ngrx/store";
import { OtpState } from "./otp.state";

export const selectOtpState = createFeatureSelector<OtpState>('otp');

export const selectOtp = createSelector(selectOtpState, (state) => state.otp);