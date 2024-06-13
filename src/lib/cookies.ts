export const setTokenCookie = (token: string) => {
  document.cookie = `token=${token}`;
};

export const removeTokenCookie = () => {
  document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
