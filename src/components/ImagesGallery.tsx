import { TrashIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export interface GalleryItem {
    id: string;
    url: string;
}

interface ImagesGalleryProps {
    images: GalleryItem[];
    selectedId: string;
    onSelect: (id: string) => void;
    onRemove?: (id: string) => void;
}

const ImagesGallery = ({ images, selectedId, onSelect, onRemove }: ImagesGalleryProps) => {
    return (
        <div className='grid grid-cols-4 gap-2'>
            {images.map((image) => (
                <div className='relative' key={image.id} onClick={() => onSelect(image.id)}>
                    {onRemove && images.length !== 1 && (
                        <Button
                            className='w-12 h-6 absolute inline-0 -right-3 -top-3 z-10 rounded-full text-center bg-black text-white'
                            variant='destructive'
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove(image.id);
                            }}
                        >
                            <TrashIcon className='size-3' />
                        </Button>
                    )}
                    <div
                        className={cn(
                            'overflow-hidden rounded-md border-3',
                            selectedId === image.id ? 'border-primary' : 'border-transparent',
                        )}
                    >
                        <img src={image.url} alt='microscopy image' className='w-full aspect-square object-cover' />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ImagesGallery;
