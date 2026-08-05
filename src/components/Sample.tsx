import type { Batch } from '@/app/types';
import { formatDate } from '@/lib/utils';

const Sample = ({ batch }: { batch: Batch }) => {
    return (
        <p className='flex items-baseline text-sm text-muted-foreground'>
            Spl: <span className='text-primary font-bold'>{batch.sample}</span>
            <span className='ml-auto text-xs text-muted-foreground'>{formatDate(batch.created_at)}</span>
        </p>
    );
};

export default Sample;
