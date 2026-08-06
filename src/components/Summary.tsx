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
                <span key={cell} className={cn('flex min-w-12 items-center font-bold tabular-nums', className)}>
                    <p className={cn('mr-2 text-sm', CELL_META[cell].textColor)}>{cell.charAt(0).toUpperCase()}</p>
                    {summary[cell]}
                </span>
            ))}
        </p>
    );
};

export default Summary;
