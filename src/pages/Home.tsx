import { useAppDispatch, useAppSelector, useAppStore } from '@/app/hooks';
import type { CapturedImage } from '@/app/types';
import HomeCard from '@/features/home/HomeCard';
import { Button } from '@/components/ui/button';
import { addImage, clearImages } from '@/features/camera/cameraSlice';
import { ROUTES } from '@/app/constants';
import { CameraIcon, ImagesIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

import { Link, useNavigate } from 'react-router';
import { getBatches, selectBatchesLoading, selectRecentBatches } from '@/features/batches/batchesSlice';
import { Spinner } from '@/components/ui/spinner';
import { Separator } from '@/components/ui/separator';
import { DEFAULT_MAGNIFICATION, MAX_IMAGES_PER_ANALYSIS } from '@/app/constants';

export function Home() {
    const recent = useAppSelector(selectRecentBatches);
    const loading = useAppSelector(selectBatchesLoading);
    const dispatch = useAppDispatch();
    const store = useAppStore();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const promise = dispatch(getBatches());

        return () => promise.abort();
    }, [dispatch]);

    useEffect(() => {
        store.getState().camera.previewImages.forEach((image) => URL.revokeObjectURL(image.previewUrl));
        dispatch(clearImages());
    }, [dispatch, store]);

    const handleFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selected = Array.from(event.target.files ?? []);
        // reset so re-picking the same file still fires `change`.
        event.target.value = '';
        if (selected.length === 0) return;

        const imageFiles = selected.filter((file) => file.type.startsWith('image/'));
        if (imageFiles.length < selected.length) {
            toast.warning('Some files were skipped because they are not images');
        }

        // limit to 10
        const accepted = imageFiles.slice(
            0,
            imageFiles.length > MAX_IMAGES_PER_ANALYSIS ? MAX_IMAGES_PER_ANALYSIS : imageFiles.length,
        );
        if (imageFiles.length > accepted.length) {
            toast.warning(`Only ${MAX_IMAGES_PER_ANALYSIS} images per analysis. Extra images were skipped`);
        }

        if (accepted.length > 0) {
            accepted.forEach((file) => {
                const image: CapturedImage = {
                    id: crypto.randomUUID(),
                    previewUrl: URL.createObjectURL(file),
                    type: file.type,
                    magnification: DEFAULT_MAGNIFICATION,
                };
                dispatch(addImage(image));
            });
            navigate(ROUTES.REVIEW);
        }
    };

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
                    onClick={() => fileInputRef.current?.click()}
                >
                    <ImagesIcon className='size-12' />
                    Choose from gallery
                </Button>
                <input ref={fileInputRef} type='file' accept='image/*' multiple hidden onChange={handleFilesSelected} />
            </div>
            <Separator />
            <h3 className='text-sm text-muted-foreground'>Recent analyses</h3>
            {loading ? (
                <p className='flex gap-4 items-center justify-center mt-4 text-muted-foreground'>
                    {' '}
                    <Spinner />
                    Getting analyses...
                </p>
            ) : (
                recent.map((batch) => <HomeCard key={batch.batch_id} batch={batch} />)
            )}
        </>
    );
}
