import { useAppDispatch, useAppSelector } from '@/app/hooks';
import AnalysisLoader from '@/features/camera/AnalysisLoader';
import GoBack from '@/components/GoBack';
import { Button } from '@/components/ui/button';
import { analyzeImages, removeImage } from '@/features/camera/cameraSlice';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import type { CapturedImage } from '@/app/types';
import { ROUTES } from '@/lib/constants';
import { useNavigate } from 'react-router';

const Review = () => {
    const images = useAppSelector((state) => state.camera.images);
    const status = useAppSelector((state) => state.camera.status);
    const uploadProgress = useAppSelector((state) => state.camera.uploadProgress);
    const [selectedImage, setSelectedImage] = useState<CapturedImage>(images[0]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAnalyzing = status === 'uploading' || status === 'analyzing';

    const handleAnalyze = async () => {
        const formData = new FormData();
        for (const image of images) {
            const blob = await fetch(image.previewUrl).then((res) => res.blob());
            const file = new File([blob], image.id, { type: image.type });
            formData.append('files', file);
        }

        try {
            await dispatch(analyzeImages(formData)).unwrap();
            toast.success('Analysis complete');
            navigate(ROUTES.RESULTS);
        } catch {
            // done in thunk
        }
    };

    const handleRemoveImage = (image: CapturedImage) => {
        URL.revokeObjectURL(image.previewUrl);
        dispatch(removeImage(image));

        if (image.id === selectedImage.id) {
            setSelectedImage(images.find((img) => img.id !== image.id) || images[0]);
        }
    };

    return (
        <>
            <GoBack secondaryText={`${images.length}/10`} />
            <div className='flex flex-col gap-4'>
                <img
                    src={selectedImage?.previewUrl}
                    alt='Image'
                    className='w-full h-100 object-cover rounded-md border-2 border-primary'
                />
                <div className='grid grid-cols-4 gap-2'>
                    {images.map((image) => (
                        <div className='relative' key={image.id} onClick={() => setSelectedImage(image)}>
                            {images.length !== 1 && (
                                <Button
                                    className='w-12 h-6 absolute inline-0 -right-3 -top-3 z-10 rounded-full text-center bg-black text-white'
                                    variant='destructive'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveImage(image);
                                    }}
                                >
                                    <TrashIcon className='size-3' />
                                </Button>
                            )}
                            <div
                                className={`overflow-hidden rounded-md border-3 ${selectedImage === image ? 'border-primary' : 'border-transparent'}`}
                            >
                                <img
                                    src={image.previewUrl}
                                    alt='microscopy image'
                                    className='w-full aspect-square object-cover'
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <p className='text-sm text-muted-foreground'>
                    Check each shot. Tap <TrashIcon className='inline align-text-bottom size-4 mx-1' /> to remove it
                    from the list.
                </p>
                <Button className='w-full ' onClick={handleAnalyze}>
                    Analyze {images.length} images
                </Button>
            </div>
            {isAnalyzing && <AnalysisLoader status={status} progress={uploadProgress} />}
        </>
    );
};

export default Review;
