import { MAX_IMAGES_PER_ANALYSIS } from '@/app/constants';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { CapturedImage } from '@/app/types';
import GoBack from '@/components/GoBack';
import { Button } from '@/components/ui/button';
import { addImage } from '@/features/camera/cameraSlice';
import { ROUTES } from '@/lib/constants';
import { ArrowRightIcon, ImagesIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const Camera = () => {
    const images = useAppSelector((state) => state.camera.images);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const streamRef = useRef<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const flashRef = useRef<HTMLDivElement | null>(null);
    const badgeRef = useRef<HTMLDivElement | null>(null);

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

        if (images.length >= MAX_IMAGES_PER_ANALYSIS) {
            toast.error(`You can only capture ${MAX_IMAGES_PER_ANALYSIS} images at a time`);
            return;
        }

        const canvas = canvasRef.current;
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');

        if (!context) return;

        flashRef.current?.animate([{ opacity: 0.85 }, { opacity: 0 }], { duration: 280, easing: 'ease-out' });

        context.drawImage(videoRef.current, 0, 0);

        canvasRef.current.toBlob(
            (blob) => {
                if (!blob) return;

                const id = crypto.randomUUID();
                const image: CapturedImage = {
                    id,
                    previewUrl: URL.createObjectURL(blob),
                    type: blob.type,
                };

                dispatch(addImage(image));
                badgeRef.current?.animate(
                    [{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }],
                    { duration: 300, easing: 'ease-out' },
                );
            },
            'image/jpeg',
            0.85,
        );
    };

    const handleReview = () => {
        if (!images.length) {
            toast.error('Please select at least one image');
            return;
        }
        navigate(ROUTES.REVIEW);
    };

    return (
        <>
            <GoBack />
            <div className='relative'>
                <video
                    ref={videoRef}
                    className='w-full h-[80svh] rounded-lg object-cover bg-black'
                    playsInline
                    muted
                    autoPlay
                />
                <div ref={flashRef} className='pointer-events-none absolute inset-0 rounded-lg bg-white opacity-0' />
                <div
                    ref={badgeRef}
                    className='absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-primary/50 px-3 py-1.5 text-sm font-medium text-white backdrop-blur'
                >
                    <ImagesIcon className='size-4' />
                    {images.length}
                </div>
                <button
                    type='button'
                    onClick={handleCapture}
                    aria-label='Take photo'
                    className='group absolute bottom-6 left-1/2 flex size-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-primary bg-transparent shadow-lg transition active:scale-95'
                >
                    <span className='size-12 rounded-full bg-white transition-all group-active:size-11' />
                </button>
                <Button className='absolute bottom-6 right-2 -translate-y-1/2' onClick={handleReview}>
                    Review
                    <ArrowRightIcon className='size-4' />
                </Button>
            </div>
            <canvas ref={canvasRef} className='hidden' />
        </>
    );
};

export default Camera;
