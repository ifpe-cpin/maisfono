import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { UserViewComponent } from './user-view/user-view.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material';
import { RouterModule } from '@angular/router';
import { UserUpdateComponent } from './user-update/user-update.component';
import { SistemaModule } from '../sistema.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    RouterModule,
    SistemaModule
  ],
  providers:[MatDialog],
  exports:[RouterModule],
  declarations: [UserAdminComponent, UserViewComponent, UserUpdateComponent]
})
export class UserModule { }
