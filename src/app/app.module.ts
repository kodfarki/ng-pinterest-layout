import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import { NgPinterestLayout } from './ng-pinterest-layout/ng-pinterest-layout.component';

@NgModule({
    declarations: [
        AppComponent,
        NgPinterestLayout
    ],
    imports: [
        BrowserModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
