import localStore from "./localstore.util";
// import { updateHeaders } from "../services";
// import { removeUserInfo } from "./user.util";
// import { upda  teHeaders } from "../services";

export const getToken = () => localStore.get_data("mb_autorization");

export const setToken = (token) => localStore.store_data("mb_autorization", token);

// export const getCategories = () => localStore.get_data("categories");

// export const setCategories = categories =>
//   localStore.store_data("categories", categories);

export const logout = () => {
  // updateHeaders();
  localStore.remove_data("mb_autorization");
  localStore.remove_data("userinfo");
  return true;
};

export const isLoggedIn = () => {
  const token = getToken();
  return !!token;
  // return Promise.resolve(response);
};
