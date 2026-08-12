import { useAppDispatch, useAppSelector } from '@/app/hooks';
import DetectionViewer from '@/components/DetectionViewer';
import GoBack from '@/components/GoBack';
import { Button } from '@/components/ui/button';
import { clearImages } from '@/features/camera/cameraSlice';
import { ROUTES } from '@/lib/constants';
import { Navigate, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { deleteBatch } from '@/features/batches/batchesSlice';

const Results = () => {
    const analysis = useAppSelector((state) => state.camera.analysis);
    const analyzedImages = analysis?.results ?? [];
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    if (!analysis || !analyzedImages.length) return <Navigate to={ROUTES.HOME} replace />;

    const handleDiscard = async () => {
        try {
            await dispatch(deleteBatch(analysis.batch_id)).unwrap();
            toast.success('Analysis discarded');
            navigate(ROUTES.HOME);
        } catch {}
    };

    const handleAnalyzeAnother = () => {
        navigate(ROUTES.CAMERA);
        dispatch(clearImages());
    };

    return (
        <div className='flex flex-col gap-4'>
            <GoBack redirectHome />

            <DetectionViewer images={analyzedImages} />

            {/* <InfoBox>Assistive tool. Do not replace professional diagnosis.</InfoBox> */}

            <div className='grid grid-cols-2 gap-3'>
                <Button variant='outline' className='h-12' onClick={handleDiscard}>
                    Discard
                </Button>
                <Button className='h-12 text-white' onClick={handleAnalyzeAnother}>
                    Analyze another
                </Button>
            </div>
        </div>
    );
};

export default Results;
