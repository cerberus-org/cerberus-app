import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Category } from '../../../shared/models/category';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent implements OnInit {
  label: string;
  description: string;

  constructor(public dialogRef: MatDialogRef<CategoryDialogComponent>) { }

  ngOnInit(): void {
    this.label = '';
    this.description = '';
  }

  /**
   * Close dialog and pass back data.
   */
  close() {
    this.dialogRef.close(new Category(this.label, this.description));
  }
}
