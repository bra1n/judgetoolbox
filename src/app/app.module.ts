import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SituationGeneratorComponent } from './situation-generator/situation-generator.component';
import { SituationService } from "./situation-generator/situation.service";
import { SituationGeneratorConfigComponent } from "./situation-generator/situation-generator-config.component";
import { UniquePipe } from './situation-generator/unique.pipe';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SituationGeneratorComponent,
    SituationGeneratorConfigComponent,
    UniquePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    MaterialModule.forRoot()
  ],
  providers: [
    SituationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
