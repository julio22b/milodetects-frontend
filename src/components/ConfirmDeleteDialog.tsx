import { Trash2Icon } from 'lucide-react';
import {
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialog,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import type { Batch } from '@/app/types';

interface ConfirmDeleteDialogProps {
    batch: Batch;
    onDelete: () => void;
}

const ConfirmDeleteDialog = ({ batch, onDelete }: ConfirmDeleteDialogProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant='ghost' size='icon' className='text-destructive' aria-label='Delete batch'>
                    <Trash2Icon />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete this analysis?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This permanently deletes the analysis and its {batch.images.length} analyzed image
                        {batch.images.length !== 1 ? 's' : ''}.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete} className='bg-destructive text-white hover:bg-destructive/90'>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmDeleteDialog;
