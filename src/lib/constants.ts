export const ROUTES = {
    HOME: '/',
    HISTORY: '/history',
    CAMERA: '/camera',
    REVIEW: '/review',
    RESULTS: '/results',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
