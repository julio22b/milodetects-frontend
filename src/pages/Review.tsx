import { useAppDispatch, useAppSelector } from '@/app/hooks';
import AnalysisLoader from '@/features/camera/AnalysisLoader';
import GoBack from '@/components/GoBack';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel } from '@/components/ui/field';
import { analyzeImages, removeImage, setImageMagnification } from '@/features/camera/cameraSlice';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ROUTES } from '@/app/constants';
import { useNavigate } from 'react-router';
import ImagesGallery from '@/components/ImagesGallery';
import InfoBox from '@/components/InfoBox';

const Review = () => {
    const images = useAppSelector((state) => state.camera.previewImages);
    const status = useAppSelector((state) => state.camera.status);
    const uploadProgress = useAppSelector((state) => state.camera.uploadProgress);
    const [selectedId, setSelectedId] = useState<string>(images[0]?.id);
    const [submitting, setSubmitting] = useState(false);
    const [sample, setSample] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const selectedImage = images.find((image) => image.id === selectedId) ?? images[0];
    const isAnalyzing = status === 'uploading' || status === 'analyzing';

    const handleRemoveImage = (id: string) => {
        const image = images.find((img) => img.id === id);
        if (!image) return;

        URL.revokeObjectURL(image.previewUrl);
        dispatch(removeImage(image));

        if (id === selectedId) {
            setSelectedId(images.find((img) => img.id !== id)?.id || images[0]?.id);
        }
    };

    const handleAnalyze = async () => {
        setSubmitting(true);

        const formData = new FormData();
        for (const image of images) {
            const blob = await fetch(image.previewUrl).then((res) => res.blob());
            const file = new File([blob], image.id, { type: image.type });
            formData.append('files', file);
            formData.append('magnifications', image.magnification);
        }
        formData.append('sample', sample.trim());

        try {
            await dispatch(analyzeImages(formData)).unwrap();
            images.forEach((image) => URL.revokeObjectURL(image.previewUrl));
            toast.success('Analysis complete');
            navigate(ROUTES.RESULTS);
        } catch {
            setSubmitting(false);
        }
    };

    return (
        <>
            <GoBack secondaryText={`${images.length}/10`} />
            <div className='flex flex-col gap-4'>
                <Field>
                    <FieldLabel htmlFor='sample'>Sample ID</FieldLabel>
                    <Input
                        id='sample'
                        value={sample}
                        maxLength={10}
                        onChange={(event) => setSample(event.target.value)}
                        placeholder='Optional label'
                    />
                </Field>
                <img
                    src={selectedImage?.previewUrl}
                    alt='Image'
                    className='w-full h-100 object-cover rounded-md border-2 shadow-md border-primary'
                />
                <ImagesGallery
                    images={images.map((image) => ({
                        id: image.id,
                        url: image.previewUrl,
                        magnification: image.magnification,
                    }))}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    onRemove={handleRemoveImage}
                    onMagnificationChange={(id, magnification) =>
                        dispatch(setImageMagnification({ id, magnification }))
                    }
                />
                <InfoBox>
                    Check each shot. Tap <TrashIcon className='inline align-text-bottom size-4 mx-1' /> to remove it
                    from the list.
                </InfoBox>
                <Button className='w-full h-12' onClick={handleAnalyze}>
                    Analyze {images.length} image{images.length > 1 ? 's' : ''}
                </Button>
            </div>
            {(isAnalyzing || submitting) && <AnalysisLoader status={status} progress={uploadProgress} />}
        </>
    );
};

export default Review;
