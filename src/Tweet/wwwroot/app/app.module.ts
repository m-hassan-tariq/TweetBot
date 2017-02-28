import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from '@angular/material';
import 'node_modules/hammerjs/hammer.js';

import { AppComponent } from './app.component';
import { AppRoutingModule  } from './app.routing';
import { All_Services, All_Components, All_Filters } from './app.provider';

@NgModule({
    imports: [
        //angular builtin module
        BrowserModule,
        HttpModule,
        FormsModule,

        //ui module
        MaterialModule.forRoot(),

        //application feature module
        AppRoutingModule 
    ],
    declarations: [
        AppComponent,
        All_Components,

        All_Filters
    ],
    providers: [
        All_Services
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class AppModule {
}

