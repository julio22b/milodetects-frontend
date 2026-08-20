import { InfoIcon, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/app/utils';

interface InfoBoxProps {
    children: ReactNode;
    icon?: LucideIcon;
    className?: string;
}

const InfoBox = ({ children, icon: Icon = InfoIcon, className }: InfoBoxProps) => {
    return (
        <div
            className={cn('flex items-center gap-3 rounded-md border-2 border-primary bg-secondary/50 p-3', className)}
        >
            <Icon className='size-6 shrink-0 text-primary' />
            <p className='text-sm'>{children}</p>
        </div>
    );
};

export default InfoBox;
