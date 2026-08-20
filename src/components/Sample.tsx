import type { Batch } from '@/app/types';
import { formatDate } from '@/app/utils';
import { Badge } from './ui/badge';
import type { ReactNode } from 'react';

const Sample = ({ batch, action }: { batch: Batch; action?: ReactNode }) => {
    return (
        <div className='flex items-center justify-between text-sm text-muted-foreground'>
            <Badge>{batch.sample}</Badge>
            <div className='flex items-center gap-1'>
                <Badge variant='secondary'>{formatDate(batch.created_at)}</Badge>
                {action}
            </div>
        </div>
    );
};

export default Sample;
