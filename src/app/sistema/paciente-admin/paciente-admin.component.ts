import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Paciente } from '../models/paciente/paciente';
import { PacientesService } from '../../services/pacientes.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { element } from 'protractor';

@Component({
  selector: 'app-paciente-admin',
  templateUrl: './paciente-admin.component.html',
  styleUrls: ['./paciente-admin.component.css'],
  providers:[PacientesService]
})
export class PacienteAdminComponent implements OnInit {


  pacientes: Paciente[];



  constructor(
    private pacienteService: PacientesService,
    private router: Router,
    private chRef: ChangeDetectorRef,
    public dialog: MatDialog,
    public db: AngularFirestore
  ) { }

  ngOnInit() {

    let p1 = new Paciente(this.db);
    p1.nome="Pires";
    p1.id="1";
    p1.telefone="32312312";
    p1.email="w@gmail.com"
   
    //this.pacientes =[p1]
  
    this.refreshData();
  }

  refreshData(){
    this.pacienteService.getAll().
                subscribe( pacientes => {
                  let p:Paciente[]=[];
                  pacientes.forEach(element=>p.push(element));
                
                  this.pacientes = p
                  
                  this.chRef.detectChanges();

              
                });
  }
  delete(paciente:Paciente){
    this.openDialog(paciente);
    
  }

  // createPage(){
  //   this.router.navigate(['/fonoaudiologo/fono/novo']);
  // }


  openDialog(paciente:Paciente): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {msg: "Deseja realmente apagar esse registro?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){

        this.pacienteService.delete(paciente).then(
          result=>{
              console.log(result)
              this.refreshData();
        }
        ).catch(
          result=>console.log(result)
        );

      }
    });
  }

}
