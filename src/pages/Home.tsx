import { useAppDispatch, useAppSelector, useAppStore } from '@/app/hooks';
import HomeCard from '@/features/home/HomeCard';
import { Button } from '@/components/ui/button';
import { clearImages } from '@/features/camera/cameraSlice';
import { ROUTES } from '@/lib/constants';
import { CameraIcon, ImagesIcon } from 'lucide-react';
import { useEffect } from 'react';

import { Link } from 'react-router';
import { getBatches } from '@/features/home/homeSlice';
import { Spinner } from '@/components/ui/spinner';

export function Home() {
    const { batches, loading } = useAppSelector((state) => state.home);
    const dispatch = useAppDispatch();
    const store = useAppStore();

    useEffect(() => {
        const promise = dispatch(getBatches(3));

        return () => promise.abort();
    }, [dispatch]);

    useEffect(() => {
        store.getState().camera.images.forEach((image) => URL.revokeObjectURL(image.previewUrl));
        dispatch(clearImages());
    }, [dispatch, store]);

    return (
        <>
            <h3 className='text-2xl font-bold'>MiloDetects</h3>
            <div className='flex gap-4'>
                <Link
                    className='flex flex-1 flex-col items-center justify-center rounded-md bg-primary border-2 border-primary text-white font-bold'
                    to={ROUTES.CAMERA}
                >
                    <CameraIcon className='size-12 text-white' />
                    Take a picture
                </Link>
                <Button
                    className='flex flex-1 flex-col py-10 justify-center border-2 border-primary text-primary font-bold h-full'
                    variant='outline'
                >
                    <ImagesIcon className='size-12' />
                    Choose from gallery
                </Button>
            </div>
            <div className='flex justify-between'>
                <h3 className='text-md font-bold'>Recent analyses</h3>
                <Button className='text-primary' variant='link'>
                    View all
                </Button>
            </div>
            {loading && (
                <p className='flex gap-4 items-center justify-center mt-4 text-muted-foreground'>
                    {' '}
                    <Spinner />
                    Getting batches...
                </p>
            )}
            {batches.map((batch) => (
                <HomeCard key={batch.batch_id} batch={batch} />
            ))}
        </>
    );
}
