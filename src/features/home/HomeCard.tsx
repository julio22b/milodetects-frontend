import type { Batch } from '@/app/types';
import { Card, CardContent } from '../../components/ui/card';
import Sample from '@/components/Sample';
import Summary from '@/components/Summary';
import { ROUTES } from '@/lib/constants';
import { Link } from 'react-router';

interface HomeCardProps {
    batch: Batch;
}

const HomeCard = ({ batch }: HomeCardProps) => {
    const step = 6;
    const stack = batch.images.slice(0, 3);

    return (
        <Link
            to={`${ROUTES.BATCH}/${batch.batch_id}`}
            className='block rounded-xl transition-colors hover:bg-primary/5'
        >
            <Card>
                <CardContent className='flex gap-6 items-center'>
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
                    <div className='w-full flex flex-col gap-2'>
                        <Sample batch={batch} />
                        <Summary summary={batch.summary} />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default HomeCard;
