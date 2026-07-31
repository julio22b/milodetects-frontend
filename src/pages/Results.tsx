import { CELL_META, CELL_ORDER } from '@/app/constants';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { CellType } from '@/app/types';
import GoBack from '@/components/GoBack';
import ImagesGallery from '@/components/ImagesGallery';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { clearImages } from '@/features/camera/cameraSlice';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import InfoBox from '@/components/InfoBox';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { toast } from 'sonner';

const Results = () => {
    const analyzedImages = useAppSelector((state) => state.camera.analyzedImages);
    const [selectedFieldId, setSelectedFieldId] = useState<string>(analyzedImages[0]?.id ?? '');
    const [shownCells, setShownCells] = useState<CellType[]>(CELL_ORDER);
    const [selectedCellIndex, setSelectedCellIndex] = useState<number | null>(null);
    const [note, setNote] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    if (!analyzedImages.length) return <Navigate to={ROUTES.HOME} replace />;

    const field = analyzedImages.find((img) => img.id === selectedFieldId) || analyzedImages[0];

    const cellCounts = field.detections.reduce(
        (acc, detection) => {
            acc[detection.cell_type] += 1;
            return acc;
        },
        { WBC: 0, RBC: 0, Platelet: 0 } as Record<CellType, number>,
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

    const handleDiscard = () => {
        // TODO: delete the field + note from history.
        toast('Analysis discarded');
        navigate(ROUTES.HOME);
    };

    const handleAnalyzeAnother = () => {
        navigate(ROUTES.CAMERA);
        dispatch(clearImages());
    };

    return (
        <div className='flex flex-col gap-4'>
            <GoBack secondaryText='#1042' redirectHome />

            <p className='text-sm text-muted-foreground'>Tap a cell to see its confidence.</p>

            <div className='relative aspect-square w-full overflow-hidden rounded-md bg-neutral-900'>
                <img
                    src={field.image_url}
                    alt='Microscopy field'
                    className='absolute inset-0 h-full w-full object-cover'
                />

                {/* Viewfinder corner brackets */}
                <span className='absolute left-3 top-3 size-5 border-l-2 border-t-2 border-white/50' />
                <span className='absolute right-3 top-3 size-5 border-r-2 border-t-2 border-white/50' />
                <span className='absolute bottom-3 left-3 size-5 border-b-2 border-l-2 border-white/50' />
                <span className='absolute bottom-3 right-3 size-5 border-b-2 border-r-2 border-white/50' />

                {field.detections.map((detection, index) => {
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
                    ????
                </span>
            </div>

            <ImagesGallery
                images={analyzedImages.map(({ id, image_url }) => ({ id, url: image_url }))}
                selectedId={selectedFieldId}
                onSelect={setSelectedFieldId}
            />

            <p className='text-sm text-muted-foreground'>Counts per field. Tap a type to hide it.</p>

            {/* Per-type summary */}
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

            <Textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder='Add a note (optional)...'
            />

            <InfoBox>Assistive tool. Do not replace professional diagnosis.</InfoBox>

            <div className='grid grid-cols-2 gap-3'>
                <Button variant='outline' className='h-12' onClick={handleDiscard}>
                    Discard
                </Button>
                <Button className='h-12 text-white' onClick={handleAnalyzeAnother}>
                    Analyze another
                </Button>
            </div>
        </div>
    );
};

export default Results;
