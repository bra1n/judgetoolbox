import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SituationGeneratorComponent } from './situation-generator/situation-generator.component';
import { SituationService } from "./situation-generator/situation.service";
import {
  SituationGeneratorConfigComponent,
  SituationGeneratorConfigDialog
} from "./situation-generator/situation-generator-config.component";
import { UniquePipe } from './situation-generator/unique.pipe';
import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule, MdCardModule, MdDialogModule, MdGridListModule, MdIconModule, MdMenuModule, MdSelectModule,
  MdToolbarModule
} from '@angular/material';

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

@NgModule({
  declarations: [
    AppComponent,
    SituationGeneratorComponent,
    SituationGeneratorConfigComponent,
    SituationGeneratorConfigDialog,
    UniquePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdSelectModule,
    MdToolbarModule,
    MdMenuModule,
    MdGridListModule,
    MdCardModule,
    MdIconModule,
    MdDialogModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })
  ],
  providers: [
    SituationService
  ],
  entryComponents: [
    SituationGeneratorConfigDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
