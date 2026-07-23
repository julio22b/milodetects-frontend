import { useState } from 'react';
import { HomeIcon, HistoryIcon, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = {
    id: string;
    label: string;
    icon: LucideIcon;
};

const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'history', label: 'History', icon: HistoryIcon },
];

export function BottomNav() {
    const [active, setActive] = useState('home');

    return (
        <nav className='fixed inset-x-0 bottom-0 z-50 border-t border-border pb-[env(safe-area-inset-bottom)] backdrop-blur'>
            <ul className='mx-auto flex max-w-md items-stretch justify-around'>
                {navItems.map(({ id, label, icon: Icon }) => {
                    const isActive = active === id;
                    return (
                        <li key={id} className='flex-1'>
                            <button
                                type='button'
                                onClick={() => setActive(id)}
                                aria-current={isActive ? 'page' : undefined}
                                className={cn(
                                    'flex w-full flex-col items-center gap-1 px-2 py-2.5 text-xs font-medium transition-colors',
                                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                                )}
                            >
                                <Icon className={cn('size-5', isActive && 'fill-primary/10')} />
                                {label}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
