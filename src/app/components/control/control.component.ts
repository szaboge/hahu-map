import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';
import { FormControl } from '@angular/forms';
import { MapService } from '../../services/map.service';
import { MatDialog } from '@angular/material';
import { HtmlDialogComponent } from './html-dialog/html-dialog.component';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent implements OnInit {
  formControl = new FormControl();

  constructor(private pageService: PageService,
              private map: MapService,
              public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
  }

  async addToMap() {
    if (!this.formControl.value) return;
    this.formControl.disable();
    let cars = await this.pageService.process(this.formControl.value);
    cars.forEach((car) => {
      this.map.newMarker.next(car);
    });
    this.formControl.enable();
  }

  addHtml() {
    const dialogRef = this.dialog.open(HtmlDialogComponent,
      {width: '600px'});
  }
}
