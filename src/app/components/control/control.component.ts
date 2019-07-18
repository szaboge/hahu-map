import {Component, OnInit} from '@angular/core';
import {PageService} from '../../services/page.service';
import {FormControl} from '@angular/forms';
import {AppService} from '../../services/app.service';
import {MatDialog} from '@angular/material';
import {HtmlDialogComponent} from './html-dialog/html-dialog.component';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent implements OnInit {
  formControl = new FormControl();

  constructor(private pageService: PageService,
              private app: AppService,
              public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
  }

  async addToMap() {
    if (!this.formControl.value) return;
    this.app.newLayer.next(this.formControl.value);
    this.formControl.setValue('');
  }

  addHtml() {
    const dialogRef = this.dialog.open(HtmlDialogComponent,
      {width: '600px'});
  }
}
