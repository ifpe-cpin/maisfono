import { Component, OnInit } from '@angular/core';
import { FonoaudiologoService } from '../../../services/fonoaudiologo.service';
import { Fono } from '../../../models/fono';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fono-admin',
  templateUrl: './fono-admin.component.html',
  styleUrls: ['./fono-admin.component.css'],
  providers:[FonoaudiologoService]
})
export class FonoAdminComponent implements OnInit {

  constructor(private fonoService:FonoaudiologoService,private router: Router) { }

  fonos: Fono[];
  ngOnInit() {

   this.refreshData();
  }

  refreshData(){
    this.fonoService.getAll().
                subscribe( fonos => this.fonos = fonos );
  }
  delete(fono:Fono){
    this.fonoService.delete(fono).then(
      result=>{
          console.log(result)
          this.refreshData();
    }
    ).catch(
      result=>console.log(result)
    );
    
  }

  createPage(){
    this.router.navigate(['/fonoaudiologo/fono/novo']);
  }

}
