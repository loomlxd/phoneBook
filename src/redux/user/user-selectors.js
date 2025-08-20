export const getLoggedInStatus = state => state.user.isLoggedIn;

export const getUserError = state => state.user.error;

export const getRefreshingUserStatus = state => state.user.isRefreshingUser;

export const getUserName = state => state.user.name;
