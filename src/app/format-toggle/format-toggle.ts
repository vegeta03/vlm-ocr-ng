import { Component, computed, inject } from '@angular/core';
import { FileState } from '../core/file-state';
import { Ocr } from '../core/ocr';

@Component({
  selector: 'app-format-toggle',
  imports: [],
  templateUrl: './format-toggle.html',
  styleUrl: './format-toggle.scss'
})
export class FormatToggle {
  private readonly state = inject(FileState);
  private readonly ocr = inject(Ocr);
  readonly format = computed(() => this.state.format());
  readonly hasFile = computed(() => !!this.state.file());
  readonly processing = computed(() => this.state.status() === 'processing');

  set(f: 'markdown' | 'json' | 'yaml') {
    if (this.state.format() !== f) {
      this.state.format.set(f);
      if (this.state.status() === 'complete') {
        this.ocr.updateFormat();
      }
    }
  }

  process() {
    this.ocr.process();
  }
}
