import type { CellType, Magnification } from './types';
import rbc from '../../public/rbc.png';
import wbc from '../../public/wbc.png';
import platelet from '../../public/platelet.png';

export const ROUTES = {
    HOME: '/',
    HISTORY: '/history',
    CAMERA: '/camera',
    REVIEW: '/review',
    RESULTS: '/results',
    BATCH: '/batch',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export const CELLS: Record<CellType, CellType> = {
    WBC: 'WBC',
    RBC: 'RBC',
    Platelets: 'Platelets',
};

export const CELL_ORDER: CellType[] = [CELLS.WBC, CELLS.RBC, CELLS.Platelets];

export const CELL_META: Record<
    CellType,
    { code: string; color: string; label: string; box: string; bg: string; img: string; textColor: string }
> = {
    WBC: {
        code: 'WBC',
        label: 'Leukocyte',
        box: 'border-primary',
        color: 'bg-primary',
        bg: 'bg-secondary',
        img: wbc,
        textColor: 'text-primary',
    },
    RBC: {
        code: 'RBC',
        label: 'Erythrocyte',
        box: 'border-red-500',
        color: 'bg-red-500',
        bg: 'bg-red-100',
        img: rbc,
        textColor: 'text-red-500',
    },
    Platelets: {
        code: 'PLT',
        label: 'Platelet',
        box: 'border-blue-500',
        color: 'bg-blue-500',
        bg: 'bg-blue-100',
        img: platelet,
        textColor: 'text-blue-500',
    },
};

export const MAX_IMAGES_PER_ANALYSIS = 10;

export const MAGNIFICATIONS: Magnification[] = ['4x', '10x', '40x', '100x'];

export const DEFAULT_MAGNIFICATION: Magnification = '100x';
