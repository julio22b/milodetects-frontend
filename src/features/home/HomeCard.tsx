import type { Batch } from '@/app/types';
import { Card, CardContent } from '../../components/ui/card';
import { cn, formatDate } from '@/lib/utils';
import { CELL_META, CELLS } from '@/app/constants';

interface HomeCardProps {
    batch: Batch;
}

const HomeCard = ({ batch }: HomeCardProps) => {
    const step = 6;
    const stack = batch.images.slice(0, 3);
    const cells = Object.values(CELLS);

    return (
        <Card className='bg-secondary/50 shadow-sm'>
            <CardContent className='flex gap-4 items-center'>
                <div className='relative size-16'>
                    {stack.map((image, i) => (
                        <img
                            key={image.id}
                            src={image.image_url}
                            alt='microscopy image'
                            className='absolute size-12 rounded-md border-2 border-secondary object-cover shadow-sm'
                            style={{
                                top: `${(stack.length - 1 - i) * step}px`,
                                left: `${i * step}px`,
                                zIndex: stack.length - i,
                            }}
                        />
                    ))}
                    <span className='absolute bottom-0 right-0 z-10 rounded bg-primary px-1.5 py-0.5 text-xs font-bold text-primary-foreground'>
                        ×{batch.image_count}
                    </span>
                </div>
                <div className='w-full'>
                    <p className='flex items-baseline text-sm text-muted-foreground'>
                        Spl: <span className='text-primary font-bold'>{batch.sample}</span>
                        <span className='ml-auto text-xs text-muted-foreground'>{formatDate(batch.created_at)}</span>
                    </p>
                    <p className='mt-4 flex gap-4'>
                        {cells.map((cell) => (
                            <span key={cell} className='flex w-12 items-center'>
                                <span className={cn('w-2 h-2 block rounded-full mr-1', CELL_META[cell].color)}></span>
                                {batch.summary[cell]}
                            </span>
                        ))}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default HomeCard;
