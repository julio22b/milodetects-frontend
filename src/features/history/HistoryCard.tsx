import type { Batch } from '@/app/types';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import Sample from '@/components/Sample';
import Summary from '@/components/Summary';
import { useAppDispatch } from '@/app/hooks';
import { deleteBatch } from '@/features/batches/batchesSlice';
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface HistoryCardProps {
    batch: Batch;
}

const HistoryCard = ({ batch }: HistoryCardProps) => {
    const dispatch = useAppDispatch();

    const { completed, failed } = batch.images.reduce(
        (acc, image) => {
            acc[image.status]++;
            return acc;
        },
        { completed: 0, failed: 0 },
    );

    const handleDelete = async () => {
        try {
            await dispatch(deleteBatch(batch.batch_id)).unwrap();
            toast.success('Analysis deleted');
        } catch {}
    };

    return (
        <Card>
            <CardHeader>
                <Sample batch={batch} action={<ConfirmDeleteDialog batch={batch} onDelete={handleDelete} />} />
                <div className='flex items-center justify-between gap-2'>
                    <Badge variant='secondary'>{completed} valid</Badge>
                    <Summary summary={batch.summary} className='text-xl' />
                </div>
                {failed > 0 && <Badge variant='destructive'>{failed} failed</Badge>}
            </CardHeader>
            <CardContent>
                <div className='divide-y divide-border'>
                    {batch.images.map((image) => (
                        <div key={image.id} className='flex items-center gap-3 py-2 hover:bg-primary/10 rounded-md'>
                            <img
                                src={image.image_url}
                                alt='microscopy image'
                                className='size-14 shrink-0 rounded-md border-2 border-secondary object-cover shadow-sm'
                            />
                            <Summary summary={image.summary} className='text-lg' />
                            {image.status === 'failed' && (
                                <span className='rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600'>
                                    Failed
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default HistoryCard;
