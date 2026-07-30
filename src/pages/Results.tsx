import { CELL_META, CELL_ORDER } from '@/app/constants';
import { useAppSelector } from '@/app/hooks';
import type { AnalyzedImage, CellType } from '@/app/types';
import GoBack from '@/components/GoBack';
import ImagesGallery from '@/components/ImagesGallery';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { InfoIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

// Self-contained mock microscopy field (inline SVG) so the page renders without a backend image.
const MOCK_IMAGE = `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">' +
        '<rect width="400" height="400" fill="#171717"/>' +
        '<defs>' +
        '<radialGradient id="f" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="#e88" stop-opacity="0.32"/>' +
        '<stop offset="100%" stop-color="#e88" stop-opacity="0.08"/>' +
        '</radialGradient>' +
        '<pattern id="h" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
        '<rect width="6" height="12" fill="#dc5a5a" fill-opacity="0.14"/>' +
        '</pattern>' +
        '</defs>' +
        '<circle cx="200" cy="200" r="185" fill="url(#f)"/>' +
        '<circle cx="200" cy="200" r="185" fill="url(#h)"/>' +
        '</svg>',
)}`;

// TODO: placeholder field so the page renders standalone. Replace with the analyzed field from
// the store once the results flow routes here.
const MOCK_FIELD: AnalyzedImage = {
    id: 'mock',
    filename: 'mock.png',
    status: 'ok',
    content_type: 'image/png',
    image_url: MOCK_IMAGE,
    summary: { WBC: 3, RBC: 9, Platelet: 6 },
    detections: [
        { cell_type: 'WBC', confidence: 0.94, x: 0.12, y: 0.14, width: 0.15, height: 0.17 },
        { cell_type: 'WBC', confidence: 0.88, x: 0.62, y: 0.55, width: 0.15, height: 0.17 },
        { cell_type: 'WBC', confidence: 0.91, x: 0.4, y: 0.72, width: 0.15, height: 0.16 },
        { cell_type: 'RBC', confidence: 0.86, x: 0.3, y: 0.12, width: 0.09, height: 0.09 },
        { cell_type: 'RBC', confidence: 0.92, x: 0.55, y: 0.2, width: 0.09, height: 0.09 },
        { cell_type: 'RBC', confidence: 0.83, x: 0.75, y: 0.33, width: 0.09, height: 0.09 },
        { cell_type: 'RBC', confidence: 0.9, x: 0.2, y: 0.4, width: 0.09, height: 0.09 },
        { cell_type: 'RBC', confidence: 0.81, x: 0.48, y: 0.44, width: 0.09, height: 0.09 },
        { cell_type: 'RBC', confidence: 0.95, x: 0.68, y: 0.66, width: 0.09, height: 0.09 },
        { cell_type: 'RBC', confidence: 0.87, x: 0.15, y: 0.68, width: 0.09, height: 0.09 },
        { cell_type: 'RBC', confidence: 0.84, x: 0.34, y: 0.54, width: 0.09, height: 0.09 },
        { cell_type: 'RBC', confidence: 0.79, x: 0.8, y: 0.78, width: 0.09, height: 0.09 },
        { cell_type: 'Platelet', confidence: 0.6, x: 0.45, y: 0.3, width: 0.045, height: 0.045 },
        { cell_type: 'Platelet', confidence: 0.72, x: 0.25, y: 0.26, width: 0.045, height: 0.045 },
        { cell_type: 'Platelet', confidence: 0.88, x: 0.6, y: 0.4, width: 0.045, height: 0.045 },
        { cell_type: 'Platelet', confidence: 0.65, x: 0.3, y: 0.82, width: 0.045, height: 0.045 },
        { cell_type: 'Platelet', confidence: 0.83, x: 0.72, y: 0.18, width: 0.045, height: 0.045 },
        { cell_type: 'Platelet', confidence: 0.7, x: 0.55, y: 0.8, width: 0.045, height: 0.045 },
    ],
};

const Results = () => {
    const analyzedImages = useAppSelector((state) => state.camera.analyzedImages);
    const navigate = useNavigate();
    const fields = analyzedImages.length ? analyzedImages : [MOCK_FIELD];
    const [selectedFieldId, setSelectedFieldId] = useState<string>(fields[0].id);
    const [shownCells, setShownCells] = useState<CellType[]>(CELL_ORDER);
    const [selectedCellIndex, setSelectedCellIndex] = useState<number | null>(null);
    const [note, setNote] = useState('');

    const field = fields.find((f) => f.id === selectedFieldId) || fields[0];

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

    const handleSave = () => {
        // TODO: persist the field + note into history.
        toast.success('Resultado guardado');
        navigate(ROUTES.HOME);
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
                                left: `${detection.x * 100}%`,
                                top: `${detection.y * 100}%`,
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
                images={fields.map((f) => ({ id: f.id, url: f.image_url }))}
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

            {/* Disclaimer */}
            <div className='flex items-center gap-3 rounded-md border-2 border-primary bg-secondary p-2'>
                <InfoIcon className='size-6 text-primary' />
                <p className='text-xs'>Assistive tool. Do not replace professional diagnosis.</p>
            </div>

            <div className='grid grid-cols-2 gap-3'>
                {/*                  TODO: it should delete the data from backend                 */}
                <Button variant='outline' className='h-12' onClick={() => navigate(ROUTES.HOME)}>
                    Discard
                </Button>
                <Button className='h-12 text-white' onClick={() => navigate(ROUTES.CAMERA)}>
                    Another analysis
                </Button>
            </div>
        </div>
    );
};

export default Results;
