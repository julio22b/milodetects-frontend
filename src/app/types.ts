export interface CapturedImage {
    id: string;
    previewUrl: string;
    type: string;
}

export type CellType = 'WBC' | 'RBC' | 'Platelet';

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
    Platelet: number;
}

export interface AnalyzedImage {
    id: string;
    filename: string;
    status: 'ok' | 'error';
    content_type: string;
    detections: Detection[];
    summary: Summary;
    image_url: string;
    error?: string;
}

export type AnalysisStatus = 'idle' | 'uploading' | 'analyzing' | 'error';
