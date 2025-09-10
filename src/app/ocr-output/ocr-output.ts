import { Component, computed, inject } from '@angular/core';
import { FileState } from '../core/file-state';

@Component({
  selector: 'app-ocr-output',
  imports: [],
  templateUrl: './ocr-output.html',
  styleUrl: './ocr-output.scss'
})
export class OcrOutput {
  readonly state = inject(FileState);
  readonly statusText = computed(() => {
    switch (this.state.status()) {
      case 'processing': return 'Processing...';
      case 'complete': return 'Complete';
      case 'error': return 'Error';
      default: return 'Ready';
    }
  });

  copy() {
    const text = this.state.output();
    if (!text) return;
    navigator.clipboard.writeText(text);
  }

  download() {
    const file = this.state.file();
    if (!file || this.state.status() !== 'complete') return;
    const content = this.state.output();
    const ext = this.state.format() === 'markdown' ? 'md' : this.state.format() === 'json' ? 'json' : 'yml';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.name.split('.')[0]}_ocr.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
