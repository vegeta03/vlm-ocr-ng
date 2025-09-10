import { Injectable, inject } from '@angular/core';
import { FileState } from './file-state';

@Injectable({
  providedIn: 'root'
})
export class Ocr {
  private readonly state = inject(FileState);

  process() {
    const file = this.state.file();
    if (!file) return;

    this.state.status.set('processing');
    setTimeout(() => {
      const out = this.mockResult();
      this.state.output.set(out);
      this.state.status.set('complete');
    }, 1200);
  }

  updateFormat() {
    if (this.state.status() === 'complete') {
      this.state.output.set(this.mockResult());
    }
  }

  private mockResult(): string {
    const format = this.state.format();
    switch (format) {
      case 'markdown':
        return `# Explanation of Benefits\n\n**Patient:** John Doe\n**Service Date:** 03/15/2023\n**Total Amount:** $523.45\n\n## Claims Details\n\n| Service | Amount | Coverage | Patient Responsibility |\n|---------|--------|----------|------------------------|\n| Office Visit | $150.00 | $120.00 | $30.00 |\n| Lab Work | $373.45 | $320.00 | $53.45 |`;
      case 'json':
        return JSON.stringify({
          documentType: 'Explanation of Benefits',
          patient: 'John Doe',
          serviceDate: '03/15/2023',
          totalAmount: 523.45,
          claims: [
            { service: 'Office Visit', amount: 150.0, coverage: 120.0, patientResponsibility: 30.0 },
            { service: 'Lab Work', amount: 373.45, coverage: 320.0, patientResponsibility: 53.45 }
          ]
        }, null, 2);
      case 'yaml':
        return `documentType: Explanation of Benefits\npatient: John Doe\nserviceDate: 03/15/2023\ntotalAmount: 523.45\nclaims:\n  - service: Office Visit\n    amount: 150.00\n    coverage: 120.00\n    patientResponsibility: 30.00\n  - service: Lab Work\n    amount: 373.45\n    coverage: 320.00\n    patientResponsibility: 53.45`;
      default:
        return 'Ready';
    }
  }
}
