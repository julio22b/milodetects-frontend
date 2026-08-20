import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatDate = (iso: string) => {
    const date = new Date(iso);
    const MS_PER_DAY = 86_400_000;
    const atMidnight = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const dayDiff = Math.round((atMidnight(new Date()) - atMidnight(date)) / MS_PER_DAY);

    if (dayDiff === 0) return 'Today';
    if (dayDiff === 1) return 'Yesterday';

    const showYear = date.getFullYear() !== new Date().getFullYear();
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: showYear ? 'numeric' : undefined,
    });
};
