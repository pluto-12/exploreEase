export interface UserSignupResponse {
    success: boolean;
    message: {
        isEmailVerified: boolean;
        isNumberVerified: boolean;
        userEmail: string;
        userName: string;
        userNumber: string;
        userPassword: string;
        __v: number;
        _id: string;
    };
}


export interface OtpResponse {
    success: boolean
}