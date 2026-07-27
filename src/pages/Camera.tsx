import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { CameraIcon, TrashIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

const Camera = () => {
    const [images, setImages] = useState<string[]>([]);
    const streamRef = useRef<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        let cancelled = false;

        const requestCameraPermission = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: { ideal: 'environment' }, width: { ideal: 3840 }, height: { ideal: 2160 } },
                    audio: false,
                });
                if (cancelled) {
                    stream.getTracks().forEach((track) => track.stop());
                    return;
                }

                streamRef.current = stream;
                if (videoRef.current && canvasRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                toast.error('Camera permission denied. Please allow it in your browser settings.');
            }
        };

        requestCameraPermission();

        return () => {
            cancelled = true;
            streamRef.current?.getTracks().forEach((track) => track.stop());
        };
    }, []);

    const handleCapture = () => {
        if (!streamRef.current || !videoRef.current || !canvasRef.current || videoRef.current.videoWidth === 0) {
            return;
        }

        const canvas = canvasRef.current;
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');

        if (!context) return;

        context.drawImage(videoRef.current, 0, 0);

        canvasRef.current.toBlob((blob) => {
            if (!blob) return;

            setImages((prev) => [...prev, URL.createObjectURL(blob)]);
        });
    };

    const handleRemoveImage = (image: string) => {
        URL.revokeObjectURL(image);
        setImages((prev) => prev.filter((img) => img !== image));
    };

    return (
        <>
            <video
                ref={videoRef}
                className='w-full h-[80svh] rounded-lg object-cover bg-black'
                playsInline
                muted
                autoPlay
            />
            <Button onClick={handleCapture}>Camera</Button>
            <canvas ref={canvasRef} className='hidden' />
            <div className='flex flex-wrap gap-4'>
                {images.map((image) => (
                    <div className='relative' key={image}>
                        <Button
                            className='w-12 h-6 absolute inline-0 -right-3 -top-3 rounded-full text-center'
                            variant='destructive'
                            onClick={() => handleRemoveImage(image)}
                        >
                            <TrashIcon className='size-3' />
                        </Button>
                        <img src={image} alt='Image' className='w-16 h-16 object-cover rounded-md' />
                    </div>
                ))}
                <p className='text-sm text-muted-foreground'>
                    {images.length ? `You have selected ${images.length} image${images.length > 1 ? 's' : ''}` : ''}
                </p>
            </div>
        </>
    );
};

export default Camera;
