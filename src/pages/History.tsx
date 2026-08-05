import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getBatches } from '@/features/batches/batchesSlice';
import HistoryCard from '@/features/history/HistoryCard';
import { useEffect } from 'react';

function History() {
    const { batches } = useAppSelector((state) => state.batches);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBatches());
    }, [dispatch]);

    return (
        <>
            <h3 className='text-2xl font-bold'>History</h3>
            <p className='text-sm text-muted-foreground'>Your past analyses will appear here.</p>
            {batches.map((batch) => (
                <HistoryCard key={batch.batch_id} batch={batch} />
            ))}
        </>
    );
}

export default History;
