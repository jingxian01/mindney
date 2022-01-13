export const setAccessToken = (accessToken: string) => {
  localStorage.setItem("accessToken", accessToken);
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};
