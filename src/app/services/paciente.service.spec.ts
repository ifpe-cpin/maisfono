import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QueryOptions } from '../models/query-options';
import { environment } from '../../environments/environment';
import { PacienteService } from './paciente.service';
import { Paciente } from '../models/paciente';

fdescribe('PacienteService', () => {
  let injector: TestBed;
  let service: PacienteService;
  let httpMock: HttpTestingController;

  const dummyPacientes: Paciente[] = [
    {   
        id:1,
        dsc_nome:"João",
        dsc_cpf: "99999999999",
        id_pessoa:2,
        data_nascimento: "1995-01-01",
        dsc_email: "joao1@gmail.com"
    },
    { 
      id:2,
      dsc_nome:"Pedro",
      dsc_cpf: "88888888888",
      id_pessoa:2,
      data_nascimento: "1996-01-01",
      dsc_email: "pedro@gmail.com"
  },

  ];
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PacienteService]
    });
    injector = getTestBed();
    service = injector.get(PacienteService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  fdescribe('#getPacientes', () => {
    it('should return 2 pacientes', () => {
      service.list(new QueryOptions()).subscribe(pacientes => {
        expect(pacientes.length).toBe(2);
      });
  
      const req = httpMock.expectOne(`${environment.request_base_url}/pacientes/`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyPacientes);
    });
  });

  fdescribe('#createPaciente', () => {
    it('should return the paciente object created', () => {
        


        let paciente:Paciente  = new Paciente()
        paciente.id=3
        paciente.dsc_nome="Ana"
        paciente.dsc_email = "ana@gmail.com"
        paciente.dsc_cpf= "22222222222"
        paciente.id_pessoa=5,
        paciente.data_nascimento= "1995-01-01"
        paciente.dsc_email= "ana@gmail.com"


      service.create(paciente).subscribe(_paciente => {
        expect(_paciente).toBe(paciente);
      });
  
      const req = httpMock.expectOne(`${environment.request_base_url}/pacientes`);
      expect(req.request.method).toBe("POST");
      req.flush(paciente);
    });
  });

  fdescribe('#updatePaciente.', () => {
    it('should return the paciente object updated', () => {
        


      let paciente:Paciente  = new Paciente()
      paciente.id=3
      paciente.dsc_nome="Ana"
      paciente.dsc_email = "ana123@gmail.com"
      paciente.dsc_cpf= "22222222222"
      paciente.id_pessoa=5,
      paciente.data_nascimento= "1995-01-01"
      paciente.dsc_email= "ana@gmail.com"


      service.update(paciente).subscribe(_paciente => {
        expect(_paciente).toBe(paciente);
      });
  
      const req = httpMock.expectOne(`${environment.request_base_url}/pacientes/3`);
      expect(req.request.method).toBe("PUT");
      req.flush(paciente);
    });
  });

  fdescribe('#deletePaciente', () => {
    it('should remove paciente by id', () => {
      let id = 3
      service.delete(id).subscribe();
  
      const req = httpMock.expectOne(`${environment.request_base_url}/pacientes/`+id);
      expect(req.request.method).toBe("DELETE");
    });
  });

  fdescribe('#readPaciente', () => {
    it('should return paciente object by id pass', () => {
      let id = 1
      service.read(id).subscribe(paciente=>
        expect(paciente.id).toEqual(id) 
      );
  
      const req = httpMock.expectOne(`${environment.request_base_url}/pacientes/`+id);
      expect(req.request.method).toBe("GET");
      req.flush(dummyPacientes[0]);
    });
  });


});