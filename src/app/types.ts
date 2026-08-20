export type Magnification = '4x' | '10x' | '40x' | '100x';

export interface CapturedImage {
    id: string;
    previewUrl: string;
    type: string;
    magnification: Magnification;
}

export type CellType = 'WBC' | 'RBC' | 'Platelets';
export interface Detection {
    cell_type: CellType;
    confidence: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Summary {
    WBC: number;
    RBC: number;
    Platelets: number;
}

interface AnalyzedImageOk {
    id: string;
    magnification: Magnification;
    status: 'completed';
    content_type: string;
    image_url: string;
    detections: Detection[];
    summary: Summary;
}

interface AnalyzedImageFailed {
    id?: string;
    status: 'failed';
    error: string;
}

export interface Analysis {
    batch_id: string;
    results: AnalyzedImage[];
    count: number;
    sample: string;
}

export type AnalyzedImage = AnalyzedImageOk | AnalyzedImageFailed;

export interface BatchDetail {
    batch_id: string;
    sample: string;
    created_at: string;
    images: AnalyzedImage[];
}

export type ImageStatus = 'completed' | 'failed';
export interface BatchImage {
    id: string;
    image_url: string;
    status: ImageStatus;
    summary: Summary;
}

export interface Batch {
    batch_id: string;
    created_at: string;
    sample: string;
    image_count: number;
    summary: Summary;
    images: BatchImage[];
}

export type AnalysisStatus = 'idle' | 'uploading' | 'analyzing' | 'error';
