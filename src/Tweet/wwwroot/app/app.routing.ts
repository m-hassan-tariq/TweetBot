import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: 'dashboard/home',
                pathMatch: 'full'
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
    
