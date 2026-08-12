export const ROUTES = {
    HOME: '/',
    HISTORY: '/history',
    CAMERA: '/camera',
    REVIEW: '/review',
    RESULTS: '/results',
    BATCH: '/batch',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
