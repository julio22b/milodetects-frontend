export interface CapturedImage {
    id: string;
    previewUrl: string;
    type: string;
}

export interface Detection {}

export interface Summary {
    WBC: number;
    RBC: number;
    Platelet: number;
}

export interface AnalyzedImage {
    id: string;
    filename: string;
    status: 'ok' | 'error';
    content_type: string;
    detections: Detection[];
    summary: Summary;
    error?: string;
}

export type AnalysisStatus = 'idle' | 'uploading' | 'analyzing' | 'error';
