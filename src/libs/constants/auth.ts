export const KAKAO_SIGNUP_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI}&scope=profile_nickname,account_email`;
export const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI}&scope=profile_nickname,account_email&prompt=login`;
export const KAKAO_LOGIN_REDIRECT_URI =
  process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI || '';
export const KAKAO_SIGNUP_REDIRECT_URI =
  process.env.NEXT_PUBLIC_KAKAO_SIGNUP_REDIRECT_URI || '';

export const GOOGLE_SIGNUP_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_SIGNUP_REDIRECT_URI}`;
export const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT_URI}&prompt=consent`;

export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
export const GOOGLE_SECRET = process.env.NEXT_PUBLIC_GOOGLE_SECRET;

export const GOOGLE_LOGIN_REDIRECT_URI =
  process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT_URI || '';
export const GOOGLE_SIGNUP_REDIRECT_URI =
  process.env.NEXT_PUBLIC_GOOGLE_SIGNUP_REDIRECT_URI || '';
