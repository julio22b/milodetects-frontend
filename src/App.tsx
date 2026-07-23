import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { BottomNav } from '@/components/BottomNav';
import { CameraIcon, ImagesIcon } from 'lucide-react';

function App() {
    return (
        <div className='flex min-h-svh flex-col gap-4 border-2 border-red-50 max-w-md m-auto p-4 pb-24'>
            <h1 className='text-lg font-bold'>MiloDetects</h1>
            <h3 className='text-2xl font-bold'>Detect your milo</h3>
            <div className='flex gap-4'>
                <Button className='flex flex-1 flex-col px-6 py-12 bg-primary border-2 border-primary'>
                    <CameraIcon className='size-6' />
                    Take photo
                </Button>
                <Button
                    className='flex flex-1 flex-col px-6 py-12 border-2 border-primary text-primary'
                    variant='outline'
                >
                    <ImagesIcon className='size-6' />
                    Choose from gallery
                </Button>
            </div>
            <p className='text-sm text-muted-foreground'>Photograph through the microscope eyepiece.</p>
            <div className='flex justify-between'>
                <h3 className='text-md font-bold'>Recent analyses</h3>
                <Button className='text-primary' variant='link'>
                    View all
                </Button>
            </div>
            <Card className='bg-secondary'>
                <CardHeader>
                    <CardTitle>Sample #1112</CardTitle>
                    <CardDescription>Today 01:00 PM</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>WBC 6.1 &middot; RBC 4.3 &middot; PLT 300 </p>
                    <p>Some note or description</p>
                </CardContent>
            </Card>
            <BottomNav />
        </div>
    );
}

export default App;
