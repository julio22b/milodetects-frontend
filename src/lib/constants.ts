export const ROUTES = {
    HOME: '/',
    HISTORY: '/history',
    CAMERA: '/camera',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
