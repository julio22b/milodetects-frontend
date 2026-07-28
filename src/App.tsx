import { Outlet } from 'react-router';
import { BottomNav } from '@/components/BottomNav';
import { Toaster } from '@/components/ui/sonner';

function App() {
    return (
        <main className='flex min-h-svh flex-col gap-4 border-2 border-red-50 max-w-md m-auto p-4 pb-24'>
            <Outlet />
            <BottomNav />
            <Toaster />
        </main>
    );
}

export default App;
