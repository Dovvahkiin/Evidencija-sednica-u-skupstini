import {
  accessTokenCookie,
  refreshTokenCookie,
} from "../config/cookiesConfig.js";

export const setCookies = (res, tokens) => {
  //on login
  res.cookie("accessToken", tokens.accessToken, accessTokenCookie);
  res.cookie("refreshToken", tokens.refreshToken, refreshTokenCookie);
};

export const deleteCookies = (res) => {
  //on logout
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
};
