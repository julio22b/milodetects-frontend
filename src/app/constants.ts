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

export const CELL_META: Record<CellType, { code: string; label: string; box: string; bg: string; img: string }> = {
    WBC: {
        code: 'WBC',
        label: 'Leukocyte',
        box: 'border-primary',
        bg: 'bg-secondary',
        img: wbc,
    },
    RBC: {
        code: 'RBC',
        label: 'Erythrocyte',
        box: 'border-red-500',
        bg: 'bg-red-100',
        img: rbc,
    },
    Platelet: {
        code: 'PLT',
        label: 'Platelet',
        box: 'border-blue-500',
        bg: 'bg-blue-100',
        img: platelet,
    },
};
