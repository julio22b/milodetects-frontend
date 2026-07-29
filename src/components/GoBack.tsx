import { ArrowLeftIcon } from 'lucide-react';
import { Button } from './ui/button';
import { ROUTES } from '@/lib/constants';
import { useNavigate, useLocation } from 'react-router';

interface GoBackProps {
    secondaryText?: string;
}

const GoBack = ({ secondaryText }: GoBackProps) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const canGoBack = pathname !== ROUTES.HOME;
    const title = pathname.replace('/', '').charAt(0).toUpperCase() + pathname.replace('/', '').slice(1);

    return (
        <header className='flex items-center gap-2'>
            {canGoBack && (
                <Button variant='ghost' size='icon' onClick={() => navigate(-1)} aria-label='Go back'>
                    <ArrowLeftIcon className='size-5' />
                </Button>
            )}
            <h1 className='text-lg font-bold'>{title}</h1>
            {secondaryText && (
                <p className='border-2 border-primary bg-secondary text-primary font-bold text-sm w-fit ml-auto p-1'>
                    {secondaryText}
                </p>
            )}
        </header>
    );
};

export default GoBack;
