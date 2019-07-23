import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatToolbarModule} from '@angular/material';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MapComponent} from './components/map/map.component';
import {HttpClientModule} from '@angular/common/http';
import {ControlComponent} from './components/control/control.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HtmlDialogComponent} from './components/control/html-dialog/html-dialog.component';
import {CarService} from './services/car.service';
import {LayersComponent} from './components/layers/layers.component';
import {LayerComponent} from './components/layers/layer/layer.component';
import {MapService} from './services/map.service';
import {PageService} from './services/page.service';
import {LayerService} from "./services/layer.service";

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ControlComponent,
    HtmlDialogComponent,
    LayersComponent,
    LayerComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  entryComponents: [HtmlDialogComponent],
  providers: [MapService, PageService, CarService, LayerService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
