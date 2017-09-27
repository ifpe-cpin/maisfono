import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home.component';
import { DashComponent } from './dash/dash.component';
import { VideoComponent } from './video/video.component';


@NgModule({
  imports: [
    CommonModule,
    
    HomeRoutingModule
   
  ],
  declarations: [HomeComponent, DashComponent,VideoComponent]
})
export class HomeModule { }
