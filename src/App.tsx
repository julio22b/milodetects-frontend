import { Outlet } from 'react-router';
import { BottomNav } from '@/components/BottomNav';
import { Toaster } from '@/components/ui/sonner';

function App() {
    return (
        <div className='flex min-h-svh flex-col gap-4 border-2 border-red-50 max-w-md m-auto p-4 pb-24'>
            <h1 className='text-lg font-bold'>MiloDetects</h1>
            <Outlet />
            <BottomNav />
            <Toaster />
        </div>
    );
}

export default App;
