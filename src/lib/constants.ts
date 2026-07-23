export const ROUTES = {
    HOME: '/',
    HISTORY: '/history',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
