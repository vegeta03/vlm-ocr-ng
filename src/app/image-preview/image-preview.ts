import { Component, computed, inject } from '@angular/core';
import { FileState } from '../core/file-state';

@Component({
  selector: 'app-image-preview',
  imports: [],
  templateUrl: './image-preview.html',
  styleUrl: './image-preview.scss'
})
export class ImagePreview {
  private readonly state = inject(FileState);

  readonly pages = computed(() => this.state.totalPages());
  readonly page = computed(() => this.state.currentPage());
  readonly atStart = computed(() => this.page() <= 0);
  readonly atEnd = computed(() => this.page() >= this.pages() - 1);
  readonly showPager = computed(() => this.pages() > 1);
  readonly imgSrc = computed(() => {
    const file = this.state.file();
    if (!file) return '';
    return URL.createObjectURL(file);
  });

  readonly boxes = computed(() => this.state.boxes().filter(b => b.page === this.page()));

  // removed preview size toggle; preview always fills remaining space

  nav(delta: number) {
    const n = this.state.currentPage() + delta;
    if (n >= 0 && n < this.state.totalPages()) {
      this.state.currentPage.set(n);
    }
  }
}
