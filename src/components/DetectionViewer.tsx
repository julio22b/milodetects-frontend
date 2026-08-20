import { CELL_META, CELL_ORDER } from '@/app/constants';
import type { AnalyzedImage, CellType } from '@/app/types';
import ImagesGallery from '@/components/ImagesGallery';
import InfoBox from '@/components/InfoBox';
import { cn } from '@/app/utils';
import { useState } from 'react';

interface DetectionViewerProps {
    images: AnalyzedImage[];
}

const DetectionViewer = ({ images }: DetectionViewerProps) => {
    const okAnalyses = images.filter((img) => img.status === 'completed');

    const [selectedFieldId, setSelectedFieldId] = useState<string>(okAnalyses[0]?.id ?? '');
    const [shownCells, setShownCells] = useState<CellType[]>(CELL_ORDER);
    const [selectedCellIndex, setSelectedCellIndex] = useState<number | null>(null);
    const [imageRatio, setImageRatio] = useState<number>();

    if (!okAnalyses.length) {
        return <InfoBox>All images in this batch failed to analyze. Please try again.</InfoBox>;
    }

    const fieldInViewFinder = okAnalyses.find((img) => img.id === selectedFieldId) || okAnalyses[0];

    const cellCounts = fieldInViewFinder.detections.reduce(
        (acc, detection) => {
            acc[detection.cell_type] += 1;
            return acc;
        },
        { WBC: 0, RBC: 0, Platelets: 0 } as Record<CellType, number>,
    );

    const toggleShownCells = (type: CellType) => {
        const index = shownCells.indexOf(type);
        if (index === -1) {
            setShownCells([...shownCells, type]);
        } else {
            setShownCells(shownCells.filter((t) => t !== type));
        }

        setSelectedCellIndex(null);
    };

    return (
        <>
            <div
                className='relative w-full overflow-hidden rounded-md bg-neutral-900'
                style={{ aspectRatio: imageRatio ?? 1 }}
            >
                <img
                    src={fieldInViewFinder.image_url}
                    alt='Microscopy field'
                    className='absolute inset-0 h-full w-full'
                    onLoad={(event) =>
                        setImageRatio(event.currentTarget.naturalWidth / event.currentTarget.naturalHeight)
                    }
                />

                {fieldInViewFinder.detections.map((detection, index) => {
                    if (!shownCells.includes(detection.cell_type)) return null;
                    const meta = CELL_META[detection.cell_type];
                    const isSelected = selectedCellIndex === index;

                    return (
                        <button
                            key={index}
                            type='button'
                            onClick={() => setSelectedCellIndex(isSelected ? null : index)}
                            style={{
                                // x/y are the box center, so shift back by half the box size.
                                left: `${(detection.x - detection.width / 2) * 100}%`,
                                top: `${(detection.y - detection.height / 2) * 100}%`,
                                width: `${detection.width * 100}%`,
                                height: `${detection.height * 100}%`,
                            }}
                            className={cn('absolute rounded-sm border-2', meta.box, isSelected && 'z-20 border-4')}
                        >
                            {isSelected && (
                                <span className='absolute bottom-full left-1/2 z-30 mb-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-xs font-semibold text-white'>
                                    {meta.code}: {Math.round(detection.confidence * 100)}%
                                </span>
                            )}
                        </button>
                    );
                })}

                <span className='absolute bottom-3 left-1/2 -translate-x-1/2 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur'>
                    {fieldInViewFinder.magnification}
                </span>
            </div>

            <p className='text-sm text-muted-foreground'>Tap a cell to see its confidence.</p>

            <ImagesGallery
                images={okAnalyses.map(({ id, image_url }) => ({ id, url: image_url }))}
                selectedId={selectedFieldId}
                onSelect={setSelectedFieldId}
            />

            <div className='grid grid-cols-3 gap-3'>
                {CELL_ORDER.map((type) => {
                    const meta = CELL_META[type];
                    const isShown = shownCells.includes(type);
                    return (
                        <button
                            key={type}
                            type='button'
                            onClick={() => toggleShownCells(type)}
                            className={cn(
                                'rounded-md border-2 transition-opacity',
                                !isShown && 'opacity-40',
                                meta.box,
                                meta.bg,
                            )}
                        >
                            <div className='p-3'>
                                <p className='text-sm font-bold tracking-wide flex items-center justify-between'>
                                    {meta.code}
                                    <img
                                        src={meta.img}
                                        className={cn('w-6 h-6 object-cover rounded-full', !isShown && 'grayscale')}
                                        alt={meta.label}
                                    />
                                </p>
                                <p className='text-4xl font-bold text-left'>{cellCounts[type]}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
            <p className='text-sm text-muted-foreground'>Counts per field. Tap a type to hide it.</p>
        </>
    );
};

export default DetectionViewer;
