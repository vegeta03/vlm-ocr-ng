import { Injectable, signal } from '@angular/core';

export interface BoundingBox {
  id: string;
  page: number;
  x: number; // normalized 0..1
  y: number; // normalized 0..1
  w: number; // normalized 0..1
  h: number; // normalized 0..1
  label?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FileState {
  readonly file = signal<File | null>(null);
  readonly currentPage = signal<number>(0);
  readonly totalPages = signal<number>(0);
  readonly format = signal<'markdown' | 'json' | 'yaml'>('markdown');
  readonly status = signal<'ready' | 'processing' | 'complete' | 'error'>('ready');
  readonly output = signal<string>('');
  readonly boxes = signal<BoundingBox[]>([]);

  setFile(file: File) {
    this.file.set(file);
    // mock paging for pdf/tiff
    const type = file.type;
    const pages = type === 'application/pdf' ? 3 : (type === 'image/tiff' ? 2 : 1);
    this.totalPages.set(pages);
    this.currentPage.set(0);
    this.status.set('ready');
    this.output.set('');
    this.boxes.set([]);
  }

  clear() {
    this.file.set(null);
    this.currentPage.set(0);
    this.totalPages.set(0);
    this.status.set('ready');
    this.output.set('');
    this.boxes.set([]);
  }

  setBoxes(boxes: BoundingBox[]) {
    this.boxes.set(boxes);
  }
}
