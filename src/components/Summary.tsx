import { CELL_META, CELLS } from '@/app/constants';
import type { Summary as SummaryType } from '@/app/types';
import { cn } from '@/lib/utils';

interface SummaryProps {
    summary: SummaryType;
    className?: string;
}

const Summary = ({ summary, className }: SummaryProps) => {
    const cells = Object.values(CELLS);

    return (
        <p className='flex gap-4'>
            {cells.map((cell) => (
                <span key={cell} className={cn('flex w-12 items-center font-bold', className)}>
                    <span className={cn('w-2 h-2 block rounded-full mr-1', CELL_META[cell].color)}></span>
                    {summary[cell]}
                </span>
            ))}
        </p>
    );
};

export default Summary;
