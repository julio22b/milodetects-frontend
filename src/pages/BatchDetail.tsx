import { useAppDispatch, useAppSelector } from '@/app/hooks';
import DetectionViewer from '@/components/DetectionViewer';
import GoBack from '@/components/GoBack';
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog';
import InfoBox from '@/components/InfoBox';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import {
    clearBatchDetail,
    deleteBatch,
    getBatchById,
    selectBatchDetail,
    selectBatchDetailLoading,
} from '@/features/batches/batchesSlice';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

const BatchDetail = () => {
    const { id } = useParams<{ id: string }>();
    const batch = useAppSelector(selectBatchDetail);
    const loading = useAppSelector(selectBatchDetailLoading);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        dispatch(getBatchById(id));

        return () => {
            dispatch(clearBatchDetail());
        };
    }, [dispatch, id]);

    const handleDelete = async () => {
        if (!id) return;

        try {
            await dispatch(deleteBatch(id)).unwrap();
            toast.success('Analysis deleted');
            navigate(-1);
        } catch {}
    };

    return (
        <div className='flex flex-col gap-4'>
            <GoBack
                title={batch?.sample ?? 'Analysis'}
                secondaryAction={
                    <ConfirmDeleteDialog
                        imageCount={batch?.images.length || 0}
                        onDelete={handleDelete}
                        trigger={<Button variant='outline'>Delete</Button>}
                    />
                }
            />

            {loading && (
                <p className='flex gap-4 items-center justify-center mt-4 text-muted-foreground'>
                    <Spinner />
                    Opening analysis...
                </p>
            )}
            {batch && (
                <>
                    <DetectionViewer images={batch.images} />

                    {/* <InfoBox>Assistive tool. Do not replace professional diagnosis.</InfoBox> */}
                </>
            )}

            {!loading && !batch && <InfoBox>Analysis not found.</InfoBox>}
        </div>
    );
};

export default BatchDetail;
