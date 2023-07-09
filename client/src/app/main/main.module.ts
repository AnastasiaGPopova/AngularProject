import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    CatalogComponent
  ],
  imports: [
    CommonModule, SharedModule,
    FormsModule, ReactiveFormsModule
  ], 
  exports:[HomeComponent,
    CatalogComponent]
})
export class MainModule { }
