import type { CellType } from './types';
import rbc from '../../public/rbc.png';
import wbc from '../../public/wbc.png';
import platelet from '../../public/platelet.png';

export const CELLS: Record<CellType, CellType> = {
    WBC: 'WBC',
    RBC: 'RBC',
    Platelet: 'Platelet',
};

export const CELL_ORDER: CellType[] = [CELLS.WBC, CELLS.RBC, CELLS.Platelet];

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
    Platelet: {
        code: 'PLT',
        label: 'Platelet',
        box: 'border-blue-500',
        color: 'bg-blue-500',
        bg: 'bg-blue-100',
        img: platelet,
        textColor: 'text-blue-500',
    },
};
