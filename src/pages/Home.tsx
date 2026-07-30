import { useAppDispatch, useAppStore } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { clearImages } from '@/features/camera/cameraSlice';
import { ROUTES } from '@/lib/constants';
import { CameraIcon, ImagesIcon } from 'lucide-react';
import { useEffect } from 'react';

import { Link } from 'react-router';

export function Home() {
    const dispatch = useAppDispatch();
    const store = useAppStore();

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
            <Card className='bg-secondary'>
                <CardHeader>
                    <CardTitle>Sample #1112</CardTitle>
                    <CardDescription>Today 01:00 PM</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>WBC 6.1 &middot; RBC 4.3 &middot; PLT 300 </p>
                    <p>Some note or description</p>
                </CardContent>
            </Card>
        </>
    );
}
