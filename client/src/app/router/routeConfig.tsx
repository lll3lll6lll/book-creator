import { RouteProps } from "react-router-dom";
import {
  AppRoutes,
  getRouteBook,
  getRouteChapter,
  getRouteForbidden,
  getRouteLogin,
  getRouteMyBooks,
  getRouteProfile,
} from "@/shared/const/routes";
import { BookPage } from "@/pages/BookPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { ChapterPage } from "@/pages/ChapterPage";
import { ForbiddenPage } from "@/pages/ForbiddenPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { MyBooksPage } from "@/pages/MyBooksPage";
import { LoginPage } from "@/pages/LoginPage";

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.PROFILE]: {
    path: getRouteProfile(),
    element: <ProfilePage />,
  },
  [AppRoutes.BOOK]: {
    path: getRouteBook(":id"),
    element: <BookPage />,
  },
  [AppRoutes.CHAPTER]: {
    path: getRouteChapter(":id"),
    element: <ChapterPage />,
  },
  [AppRoutes.MY_BOOKS]: {
    path: getRouteMyBooks(),
    element: <MyBooksPage />,
  },
  [AppRoutes.LOGIN]: {
    path: getRouteLogin(),
    element: <LoginPage />,
  },
  [AppRoutes.FORBIDDEN]: {
    path: getRouteForbidden(),
    element: <ForbiddenPage />,
  },

  //last
  [AppRoutes.NOT_FOUND]: {
    path: "/*",
    element: <NotFoundPage />,
  },
};
