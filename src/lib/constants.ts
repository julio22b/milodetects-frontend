export const ROUTES = {
    HOME: '/',
    HISTORY: '/history',
    CAMERA: '/camera',
    REVIEW: '/review',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
