import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BytesPipe } from '../shared/bytes-pipe';
import { FileState } from '../core/file-state';

@Component({
  selector: 'app-file-upload',
  imports: [BytesPipe, MatCardModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.scss'
})
export class FileUpload {
  private readonly state = inject(FileState);
  file: File | null = null;
  uploading = false;
  progress = 0;

  onChange(evt: Event) {
    const input = evt.target as HTMLInputElement;
    const file = input.files && input.files[0] ? input.files[0] : null;
    if (!file) { return; }
    this.file = file;
    this.state.setFile(file);
    this.simulateProgress();
  }

  clear() {
    this.file = null;
    this.progress = 0;
    this.uploading = false;
    this.state.clear();
    const el = document.getElementById('fileInput') as HTMLInputElement | null;
    if (el) el.value = '';
  }

  private simulateProgress() {
    this.uploading = true;
    this.progress = 0;
    const timer = setInterval(() => {
      this.progress += 20;
      if (this.progress >= 100) {
        clearInterval(timer);
        this.uploading = false;
      }
    }, 120);
  }
}
