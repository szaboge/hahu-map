import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import {LayerService} from "../../../services/layer.service";

@Component({
  selector: 'app-html-dialog',
  templateUrl: './html-dialog.component.html',
  styleUrls: ['./html-dialog.component.scss']
})
export class HtmlDialogComponent implements OnInit {

  formControl = new FormControl();

  constructor(public dialogRef: MatDialogRef<HtmlDialogComponent>,
              private layerService: LayerService) { }

  ngOnInit() {
  }

  async addToMap() {
    if (!this.formControl.value) return;
    this.layerService.addNewHtmlLayer(this.formControl.value);
    this.dialogRef.close();
  }
}
