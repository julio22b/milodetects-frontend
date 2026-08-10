import { useAppDispatch, useAppSelector, useAppStore } from '@/app/hooks';
import HomeCard from '@/features/home/HomeCard';
import { Button } from '@/components/ui/button';
import { clearImages } from '@/features/camera/cameraSlice';
import { ROUTES } from '@/lib/constants';
import { CameraIcon, ImagesIcon } from 'lucide-react';
import { useEffect } from 'react';

import { Link } from 'react-router';
import { getBatches, selectBatchesLoading, selectRecentBatches } from '@/features/batches/batchesSlice';
import { Spinner } from '@/components/ui/spinner';
import { Separator } from '@/components/ui/separator';

export function Home() {
    const recent = useAppSelector(selectRecentBatches);
    const loading = useAppSelector(selectBatchesLoading);
    const dispatch = useAppDispatch();
    const store = useAppStore();

    useEffect(() => {
        const promise = dispatch(getBatches());

        return () => promise.abort();
    }, [dispatch]);

    useEffect(() => {
        store.getState().camera.images.forEach((image) => URL.revokeObjectURL(image.previewUrl));
        dispatch(clearImages());
    }, [dispatch, store]);

    return (
        <>
            <h3 className='text-2xl font-bold'>MiloDetects</h3>
            <Separator />
            <p className='text-sm text-muted-foreground'>New analysis</p>
            <div className='grid grid-cols-2 gap-4'>
                <Link
                    className='flex min-w-0 flex-col items-center justify-center shadow-sm rounded-md bg-primary border-2 border-primary text-white font-bold'
                    to={ROUTES.CAMERA}
                >
                    <CameraIcon className='size-12 text-white' />
                    Take a picture
                </Link>
                <Button
                    className='flex min-w-0 flex-col py-10 justify-center shadow-sm border-2 border-primary text-primary font-bold h-full whitespace-normal'
                    variant='outline'
                >
                    <ImagesIcon className='size-12' />
                    Choose from gallery
                </Button>
            </div>
            <Separator />
            <h3 className='text-sm text-muted-foreground'>Recent analyses</h3>
            {loading ? (
                <p className='flex gap-4 items-center justify-center mt-4 text-muted-foreground'>
                    {' '}
                    <Spinner />
                    Getting batches...
                </p>
            ) : (
                recent.map((batch) => <HomeCard key={batch.batch_id} batch={batch} />)
            )}
        </>
    );
}
