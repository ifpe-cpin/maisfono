import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home.component';
import { DashComponent } from './dash/dash.component';


@NgModule({
  imports: [
    CommonModule,
    
    HomeRoutingModule
   
  ],
  declarations: [HomeComponent, DashComponent]
})
export class HomeModule { }
