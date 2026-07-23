import { NavLink } from 'react-router';
import { HomeIcon, HistoryIcon, type LucideIcon } from 'lucide-react';
import { ROUTES, type RoutePath } from '@/lib/constants';
import { cn } from '@/lib/utils';

type NavItem = {
    to: RoutePath;
    label: string;
    icon: LucideIcon;
};

const navItems: NavItem[] = [
    { to: ROUTES.HOME, label: 'Home', icon: HomeIcon },
    { to: ROUTES.HISTORY, label: 'History', icon: HistoryIcon },
];

export function BottomNav() {
    return (
        <nav className='fixed inset-x-0 bottom-0 z-50 border-t border-border pb-[env(safe-area-inset-bottom)] backdrop-blur'>
            <ul className='mx-auto flex max-w-md items-stretch justify-around'>
                {navItems.map(({ to, label, icon: Icon }) => (
                    <li key={to} className='flex-1'>
                        <NavLink
                            to={to}
                            end
                            className={({ isActive }) =>
                                cn(
                                    'flex w-full flex-col items-center gap-1 px-2 py-2.5 text-xs font-medium transition-colors',
                                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                                )
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon className={cn('size-5', isActive && 'fill-primary/10')} />
                                    {label}
                                </>
                            )}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
