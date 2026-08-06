import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getBatches, selectAllBatches, selectBatchesLoading } from '@/features/batches/batchesSlice';
import HistoryCard from '@/features/history/HistoryCard';
import { Spinner } from '@/components/ui/spinner';
import { useEffect } from 'react';

function History() {
    const batches = useAppSelector(selectAllBatches);
    const loading = useAppSelector(selectBatchesLoading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBatches());
    }, [dispatch]);

    return (
        <>
            <h3 className='text-2xl font-bold'>History</h3>
            <p className='text-sm text-muted-foreground'>Your past analyses will appear here.</p>
            {loading ? (
                <p className='flex gap-4 items-center justify-center mt-4 text-muted-foreground'>
                    <Spinner />
                    Getting batches...
                </p>
            ) : (
                batches.map((batch) => <HistoryCard key={batch.batch_id} batch={batch} />)
            )}
        </>
    );
}

export default History;
