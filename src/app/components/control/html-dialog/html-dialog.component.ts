import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { PageService } from '../../../services/page.service';
import { AppService } from '../../../services/app.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-html-dialog',
  templateUrl: './html-dialog.component.html',
  styleUrls: ['./html-dialog.component.scss']
})
export class HtmlDialogComponent implements OnInit {

  formControl = new FormControl();

  constructor(public dialogRef: MatDialogRef<HtmlDialogComponent>,
              private pageService: PageService,
              private map: AppService) { }

  ngOnInit() {
  }

  async addToMap() {
    if (!this.formControl.value) return;
    this.formControl.disable();
    let html = this.formControl.value;
    let page = new DOMParser().parseFromString(html, 'text/html');
    let cars = await this.pageService.processHtml(page);
    cars.forEach((car) => {
      this.map.newMarker.next(car);
    });
    this.formControl.enable();
    this.dialogRef.close();
  }
}
