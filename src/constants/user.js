export const emailRegexp = /^\w+([._]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const phoneRegexp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

export const accessTokenLifeTime = 1000 * 60 * 15;

export const refreshTokenLifeTime = 1000 * 60 * 60 * 24 * 7;
