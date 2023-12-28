export enum AppRoutes {
    MAIN = 'main',
    PROFILE = 'profile',
    BOOK = 'book',
    EDITOR = 'editor',

    NOT_FOUND = 'not_found'
}

export const getRouteMain= () => '/';
export const getRouteProfile = (id: number) => `/profile/${id}`;
export const getRouteBook = (id: number) => `/book/${id}`;
export const getRouteBookEditor = (id: number) => `/book/${id}/editor`;

