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

interface AnalyzedImageOk {
    id: string;
    batch_id: string;
    status: 'ok';
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

export type AnalysisStatus = 'idle' | 'uploading' | 'analyzing' | 'error';
