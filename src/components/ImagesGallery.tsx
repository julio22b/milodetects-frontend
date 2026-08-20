import { TrashIcon } from 'lucide-react';
import { cn } from '@/app/utils';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MAGNIFICATIONS } from '@/app/constants';
import type { Magnification } from '@/app/types';

export interface GalleryItem {
    id: string;
    url: string;
    magnification?: Magnification;
}

interface ImagesGalleryProps {
    images: GalleryItem[];
    selectedId: string;
    onSelect: (id: string) => void;
    onRemove?: (id: string) => void;
    onMagnificationChange?: (id: string, magnification: Magnification) => void;
}

const ImagesGallery = ({ images, selectedId, onSelect, onRemove, onMagnificationChange }: ImagesGalleryProps) => {
    return (
        <div className='grid grid-cols-4 gap-2'>
            {images.map((image, index) => (
                <div className='flex flex-col gap-1.5' key={image.id}>
                    <div className='relative' onClick={() => onSelect(image.id)}>
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
                                'overflow-hidden rounded-md border-2',
                                selectedId === image.id
                                    ? 'border-primary shadow-md shadow-primary'
                                    : 'border-transparent',
                            )}
                        >
                            <img src={image.url} alt='microscopy image' className='w-full aspect-square object-cover' />
                        </div>
                    </div>
                    {onMagnificationChange && image.magnification && (
                        <Select
                            value={image.magnification}
                            onValueChange={(value) => onMagnificationChange(image.id, value as Magnification)}
                        >
                            <SelectTrigger
                                className='h-7 justify-center gap-1 px-2 text-xs text-muted-foreground'
                                aria-label='Magnification'
                            >
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {MAGNIFICATIONS.map((magnification) => (
                                    <SelectItem key={magnification} value={magnification}>
                                        {magnification.replace('x', '×')}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ImagesGallery;
