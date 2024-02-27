import { createReducer, on } from "@ngrx/store";
import * as otpActions from './otp.action'
import { OtpState } from "./otp.state";

export const initialState: OtpState = {
    otp: null
}

export const otpReduces = createReducer(
    initialState,
    on(otpActions.setOtp, (state, {otp}) => ({...state, otp})),
    on(otpActions.clearOtp, (state)=> ({...state, otp: null})),
    on(otpActions.getOtp, (state, {otp}) => ({...state, otp}))
)