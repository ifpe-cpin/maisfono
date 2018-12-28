import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FonoaudiologoService } from '../../../services/fonoaudiologo.service';
import { Fonoaudiologo } from '../../../models/fonoaudiologo';

@Component({
  selector: 'app-consultar-fono',
  templateUrl: './consultar-fono.component.html',
  styleUrls: ['./consultar-fono.component.css'],
 	providers: [FonoaudiologoService],
   encapsulation: ViewEncapsulation.None
}) 
export class ConsultarFonoComponent implements OnInit {
  fonoaudiologos: Fonoaudiologo[];
  editState: boolean = false;
  fonoaudiologoToEdit: Fonoaudiologo;
  dataTable: any;
  loading:boolean;
  

  constructor(private fonoaudiologoService: FonoaudiologoService) {}
  
   ngOnInit() {
  //   this.loading = true;
  //   this.fonoaudiologoService.getFonoaudiologos().subscribe(fonoaudiologos => {
  //     this.fonoaudiologos = fonoaudiologos;
  //     this.loading = false;
  //   });
   }

  // deleteFonoaudiologo(event, fonoaudiologo) {
  //   const response = confirm('are you sure you want to delete?');
  //   if (response ) {
  //     this.fonoaudiologoService.deleteFonoaudiologo(fonoaudiologo);
  //   }
  //   return;
  // }

  // editFonoaudiologo(event, fonoaudiologo) {
  //   this.editState = !this.editState;
  //   this.fonoaudiologoToEdit = fonoaudiologo;
  // }

  // updateFonoaudiologo(fonoaudiologo) {
  //   this.fonoaudiologoService.updateFonoaudiologo(fonoaudiologo);
  //   this.fonoaudiologoToEdit = null;
  //   this.editState = false;
  // }

}
