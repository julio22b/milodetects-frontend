import { Outlet } from 'react-router';
import { BottomNav } from '@/components/BottomNav';
import { Toaster } from '@/components/ui/sonner';

function App() {
    return (
        <main className='relative mx-auto flex min-h-svh max-w-md flex-col gap-4 border-x border-border bg-background p-4 pb-24 shadow-sm'>
            <Outlet />
            <BottomNav />
            <Toaster />
        </main>
    );
}

export default App;
