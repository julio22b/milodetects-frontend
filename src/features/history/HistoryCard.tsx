import type { Batch } from '@/app/types';
import { Fragment } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import Sample from '@/components/Sample';
import Summary from '@/components/Summary';
import { Separator } from '@/components/ui/separator';
import ErrorText from '@/components/ErrorText';

interface HistoryCardProps {
    batch: Batch;
}

const HistoryCard = ({ batch }: HistoryCardProps) => {
    const { completed, failed } = batch.images.reduce(
        (acc, image) => {
            acc[image.status]++;
            return acc;
        },
        { completed: 0, failed: 0 },
    );

    return (
        <Card>
            <CardContent className='flex flex-col gap-2'>
                <Sample batch={batch} />
                <div className='flex items-center space-between w-full'>
                    <Summary summary={batch.summary} className='text-xl' />
                    <p className='text-sm ml-auto'>in {completed} valid fields</p>
                </div>
                {failed > 0 && <ErrorText error={`${failed} field${failed > 1 ? 's' : ''} failed`} />}
                <div className='flex flex-col gap-4 '>
                    {batch.images.map((image, index) => (
                        <Fragment key={image.id}>
                            <Separator />
                            <div className='flex items-center gap-6'>
                                <p className='text-sm text-muted-foreground'>{index + 1}</p>
                                <img
                                    src={image.image_url}
                                    alt='microscopy image'
                                    className='size-16 object-cover rounded-md'
                                />
                                <Summary summary={image.summary} className='text-lg' />
                                {image.status === 'failed' && <ErrorText error={image.status} />}
                            </div>
                        </Fragment>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default HistoryCard;
