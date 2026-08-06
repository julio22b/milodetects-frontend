export interface CapturedImage {
    id: string;
    previewUrl: string;
    type: string;
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
    batch_id: string;
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

export type AnalyzedImage = AnalyzedImageOk | AnalyzedImageFailed;

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
