import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { CameraIcon, ImagesIcon } from 'lucide-react';
import { useState } from 'react';

export function Home() {
    const [images, setImages] = useState<string[]>([]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        const fileUrls = files.map((file) => URL.createObjectURL(file));
        setImages((prev) => [...prev, ...fileUrls]);
    };

    return (
        <>
            <h3 className='text-2xl font-bold'>Detect your milo</h3>
            <div className='flex gap-4'>
                <Button className='flex flex-1 flex-col px-6 py-12 bg-primary border-2 border-primary'>
                    <CameraIcon className='size-6' />
                    Take photo
                </Button>
                <Field>
                    <FieldLabel htmlFor='picture'>Picture</FieldLabel>
                    <Input
                        id='picture'
                        type='file'
                        accept='image/*'
                        capture='environment'
                        multiple
                        onChange={handleImageChange}
                    />
                    <FieldDescription>Only JPG, PNG, GIF, and WebP files are supported.</FieldDescription>
                </Field>
                <Button
                    className='flex flex-1 flex-col px-6 py-12 border-2 border-primary text-primary'
                    variant='outline'
                >
                    <ImagesIcon className='size-6' />
                    Choose from gallery
                </Button>
            </div>
            <div className='flex flex-wrap gap-4'>
                {images.map((image) => (
                    <div className='relative' key={image}>
                        <Button
                            className='w-12 h-6 absolute inline-0 -right-3 -top-3 rounded-full text-center'
                            variant='destructive'
                        >
                            x
                        </Button>
                        <img src={image} alt='Image' className='w-16 h-16 object-cover rounded-md' />
                    </div>
                ))}
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
        </>
    );
}
