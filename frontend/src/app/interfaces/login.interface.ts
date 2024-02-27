export interface userLoginResponse {
  success: boolean;
  token: string;
  user: {
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

export interface CordinatorLoginResponse {
  success: boolean;
  token: string;
  user: {
    cordinatorEmail: string;
    cordinatorName: string;
    cordinatorNumber: string;
    cordinatorPassword: string;
    location: string;
    _id: string;
  };
}

export interface GuideLoginResponse {
  success: boolean;
  token: string;
  user: {
    guideEmail: string;
    guideName: string;
    guidePassword: string;
    idCard: any; 
    isActive: boolean;
    isApproved: boolean;
    location: string;
    passwordFlag: boolean;
    __v: number;
    _id: string;
  };
}

export interface GoogleUserSinginResponse {
  success: boolean;
  token: string;
  user: {
    isNumberVerfied: boolean;
    userEmail: string;
    userName: string;
    __v: number;
    _id: string;
  };
}

