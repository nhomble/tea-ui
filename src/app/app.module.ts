import{BrowserModule}from'@angular/platform-browser';
import {NgModule}from '@angular/core';

import {FormsModule}from '@angular/forms';
import {HttpModule}from '@angular/http';

import {AppComponent}from './app.component';
import {NavComponent} from "./app.nav";


@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
