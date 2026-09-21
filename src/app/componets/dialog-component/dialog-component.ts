import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogData } from '../../models';

@Component({
  selector: 'app-dialog-component',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule],
  templateUrl: './dialog-component.html',
  styleUrl: './dialog-component.scss',
})
export class DialogComponent {
  data = inject<DialogData>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<DialogComponent>);

  onConfirm(): void {
    this.data.onConfirm();
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
export type { DialogData };

