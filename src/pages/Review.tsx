import { useAppDispatch, useAppSelector } from '@/app/hooks';
import GoBack from '@/components/GoBack';
import { Button } from '@/components/ui/button';
import { removeImage } from '@/features/camera/cameraSlice';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';

const Review = () => {
    const images = useAppSelector((state) => state.camera.images);
    const [selectedImage, setSelectedImage] = useState<string>(images[0]);
    const dispatch = useAppDispatch();

    const handleRemoveImage = (image: string) => {
        URL.revokeObjectURL(image);
        dispatch(removeImage(image));

        if (image === selectedImage) {
            setSelectedImage(images.find((img) => img !== image) || '');
        }
    };

    return (
        <>
            <GoBack secondaryText={`${images.length}/10`} />
            <div className='flex flex-col gap-4'>
                <img
                    src={selectedImage}
                    alt='Image'
                    className='w-full h-100 object-cover rounded-md border-2 border-primary'
                />
                <div className='grid grid-cols-4 gap-2'>
                    {images.map((image) => (
                        <div
                            className={`relative rounded-md border-3 ${selectedImage === image ? 'border-primary' : 'border-transparent'}`}
                            key={image}
                            onClick={() => setSelectedImage(image)}
                        >
                            {images.length !== 1 && (
                                <Button
                                    className='w-12 h-6 absolute inline-0 -right-3 -top-3 rounded-full text-center bg-black text-white'
                                    variant='destructive'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveImage(image);
                                    }}
                                >
                                    <TrashIcon className='size-3' />
                                </Button>
                            )}
                            <img
                                src={image}
                                alt='microscopy image'
                                className='w-full aspect-square object-cover rounded-md'
                            />
                        </div>
                    ))}
                </div>
                <p className='text-sm text-muted-foreground flex items-center'>
                    Check each shot. Tap <TrashIcon className='inline size-4 mx-1' /> to remove it from the list.
                </p>
                <Button className='w-full'>Analyze {images.length} images</Button>
            </div>
        </>
    );
};

export default Review;
