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
import type { ReactNode } from 'react';

interface ConfirmDeleteDialogProps {
    imageCount: number;
    onDelete: () => void;
    trigger?: ReactNode;
}

const ConfirmDeleteDialog = ({ imageCount, onDelete, trigger }: ConfirmDeleteDialogProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger ?? (
                    <Button
                        variant='ghost'
                        size='icon'
                        className='text-destructive'
                        aria-label='Delete batch'
                        onClick={(event) => event.stopPropagation()}
                    >
                        <Trash2Icon />
                    </Button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete this analysis?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This permanently deletes the analysis and its {imageCount} analyzed image
                        {imageCount !== 1 ? 's' : ''}.
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
