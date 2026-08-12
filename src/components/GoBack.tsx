import { ArrowLeftIcon } from 'lucide-react';
import { Button } from './ui/button';
import { ROUTES } from '@/lib/constants';
import { useNavigate, useLocation } from 'react-router';
import type { ReactNode } from 'react';

interface GoBackProps {
    secondaryText?: string;
    redirectHome?: boolean;
    title?: string;
    secondaryAction?: ReactNode;
}

const GoBack = ({ secondaryText, redirectHome = false, title, secondaryAction }: GoBackProps) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const canGoBack = pathname !== ROUTES.HOME;
    const derivedTitle = pathname.replace('/', '').charAt(0).toUpperCase() + pathname.replace('/', '').slice(1);
    const heading = title ?? derivedTitle;

    const handleGoBack = () => {
        if (redirectHome) {
            navigate(ROUTES.HOME);
        } else {
            navigate(-1);
        }
    };

    return (
        <header className='flex items-center gap-2'>
            {canGoBack && (
                <Button variant='ghost' size='icon' onClick={handleGoBack} aria-label='Go back'>
                    <ArrowLeftIcon className='size-5' />
                </Button>
            )}
            <h1 className='text-lg font-bold'>{heading}</h1>
            {secondaryText && (
                <p className='border-2 border-primary rounded-md bg-secondary text-primary font-bold text-sm w-fit ml-auto p-1'>
                    {secondaryText}
                </p>
            )}
            {secondaryAction && <div className='ml-auto'>{secondaryAction}</div>}
        </header>
    );
};

export default GoBack;
