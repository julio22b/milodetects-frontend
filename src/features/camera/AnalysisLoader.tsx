import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import InfoBox from '@/components/InfoBox';
import type { AnalysisStatus } from '@/app/types';

export type AnalysisStepStatus = 'pending' | 'active' | 'done';

export interface AnalysisStep {
    label: string;
    status: AnalysisStepStatus;
    detail?: string;
}

interface AnalysisLoaderProps {
    progress: number;
    status: AnalysisStatus;
}

const StepIcon = ({ status }: { status: AnalysisStepStatus }) => {
    if (status === 'done') {
        return (
            <div className='flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                <CheckIcon className='size-6' />
            </div>
        );
    }

    if (status === 'active') {
        return <div className='size-8 shrink-0 animate-spin rounded-full border-[3px] border-muted border-t-primary' />;
    }

    return <div className='size-8 shrink-0 rounded-full border-2 border-muted' />;
};

const AnalysisLoader = ({ status, progress }: AnalysisLoaderProps) => {
    const analysisSteps: AnalysisStep[] = [
        {
            label: 'Uploading images',
            status: status === 'uploading' ? 'active' : 'done',
        },
        {
            label: 'Analyzing sample',
            status: status === 'analyzing' ? 'active' : 'pending',
        },
    ];

    return (
        <div className='fixed inset-0 z-60 bg-muted'>
            <div className='mx-auto flex h-full max-w-md flex-col bg-background px-6 py-8'>
                <div className='pt-[14vh]'>
                    <div className='mt-14 flex flex-col gap-5'>
                        <p className='text-lg font-semibold text-center mb-6'>Analysis in progress</p>

                        {analysisSteps.map((step) => (
                            <div key={step.label} className='flex items-center gap-4'>
                                <StepIcon status={step.status} />
                                <span
                                    className={cn(
                                        'text-lg font-semibold',
                                        step.status === 'pending' && 'text-muted-foreground',
                                    )}
                                >
                                    {step.label}
                                </span>
                            </div>
                        ))}

                        {/*  <div className='mt-2 h-2 w-full overflow-hidden rounded-full bg-muted'>
                            <div
                                className='h-full rounded-full bg-primary transition-[width] duration-300 ease-out'
                                style={{ width: `${progress}%` }}
                            />
                        </div> */}
                    </div>
                </div>

                <InfoBox className='mt-auto'>
                    Running on a free server. The first analysis after a while can take up to a minute.
                </InfoBox>
            </div>
        </div>
    );
};

export default AnalysisLoader;
