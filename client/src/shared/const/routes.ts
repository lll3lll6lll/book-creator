export enum AppRoutes {
  PROFILE = "profile",
  BOOK = "book",
  LOGIN = "login",
  MY_BOOKS = "my_books",
  CHAPTER = "chapter",
  FORBIDDEN = "forbidden",
  NOT_FOUND = "not_found",
}

export const getRouteMain = () => "/";
export const getRouteBook = (id: string) => `/book/${id}`;
export const getRouteChapter = (id: string) => `/chapter/${id}`;
export const getRouteMyBooks = () => "/my_books";
export const getRouteLogin = () => "/login";
export const getRouteProfile = () => "/profile";
export const getRouteForbidden = () => "/forbidden";
