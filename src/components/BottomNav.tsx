import { NavLink, useLocation } from 'react-router';
import { ROUTES, type RoutePath } from '@/lib/constants';
import { cn } from '@/lib/utils';

type NavItem = {
    to: RoutePath;
    label: string;
};

const navItems: NavItem[] = [
    { to: ROUTES.HOME, label: 'Home' },
    { to: ROUTES.HISTORY, label: 'History' },
];

export function BottomNav() {
    const { pathname } = useLocation();

    if (pathname === ROUTES.CAMERA) return null;

    const activeTo = pathname === ROUTES.HISTORY ? ROUTES.HISTORY : ROUTES.HOME;

    return (
        <nav className='fixed inset-x-0 bottom-0 z-50 px-4 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]'>
            <div className='mx-auto flex max-w-md overflow-hidden rounded-sm border border-border bg-background shadow-lg'>
                {navItems.map(({ to, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={cn(
                            'flex-1 rounded-sm px-4 py-3 text-center text-sm font-bold transition-colors',
                            activeTo === to
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground',
                        )}
                    >
                        {label}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
