import type { Batch } from '@/app/types';
import { Card, CardContent } from '../../components/ui/card';

interface HomeCardProps {
    batch: Batch;
}

const formatRelativeDay = (iso: string) => {
    const date = new Date(iso);
    const atMidnight = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const dayDiff = Math.round((atMidnight(new Date()) - atMidnight(date)) / 86_400_000);

    if (dayDiff === 0) return 'Today';
    if (dayDiff === 1) return 'Yesterday';
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

const HomeCard = ({ batch }: HomeCardProps) => {
    const step = 6;
    const stack = batch.images.slice(0, 3);

    return (
        <Card>
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
                <div>
                    <p className='text-sm text-muted-foreground'>
                        Sample: <span className='text-primary font-bold'>{batch.sample}</span>
                    </p>
                    <p className='text-sm text-muted-foreground'>{formatRelativeDay(batch.created_at)}</p>
                    <p>WBC 6.1 &middot; RBC 4.3 &middot; PLT 300 </p>
                    <p>Some note or description</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default HomeCard;
