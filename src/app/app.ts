import { Component } from '@angular/core';
import { Header } from './header/header';
import { FileUpload } from './file-upload/file-upload';
import { ImagePreview } from './image-preview/image-preview';
import { FormatToggle } from './format-toggle/format-toggle';
import { OcrOutput } from './ocr-output/ocr-output';

@Component({
  selector: 'app-root',
  imports: [Header, FileUpload, ImagePreview, FormatToggle, OcrOutput],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
