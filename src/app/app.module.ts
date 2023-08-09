import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { registerLocaleData } from '@angular/common';
import LocaleEsPe from '@angular/common/locales/es-PE';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

registerLocaleData(LocaleEsPe);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "es-PE" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
