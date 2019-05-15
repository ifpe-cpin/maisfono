import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QueryOptions } from '../models/query-options';
import { environment } from '../../environments/environment';
import { FonoaudiologoService } from './fonoaudiologo.service';
import { Fonoaudiologo } from '../models/fonoaudiologo';

fdescribe('FonoaudiologoService', () => {
  let injector: TestBed;
  let service: FonoaudiologoService;
  let httpMock: HttpTestingController;

  const dummyFonoaudiologos: Fonoaudiologo[] = [
    {   
        id:1,
        dsc_nome:"João",
        dsc_cpf: "99999999999",
        frg_pessoa:2,
        dat_nascimento: "1995-01-01",
        dsc_email: "joao1@gmail.com"
    },
    { 
      id:2,
      dsc_nome:"Pedro",
      dsc_cpf: "88888888888",
      frg_pessoa:2,
      dat_nascimento: "1996-01-01",
      dsc_email: "pedro@gmail.com"
  },

  ];
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FonoaudiologoService]
    });
    injector = getTestBed();
    service = injector.get(FonoaudiologoService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  fdescribe('#getFonoaudiologos', () => {
    it('should return 2 fonoaudiologos', () => {
      service.list(new QueryOptions()).subscribe(fonoaudiologos => {
        expect(fonoaudiologos.length).toBe(2);
      });
  
      const req = httpMock.expectOne(`${environment.request_base_url}/fonoaudiologos/`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyFonoaudiologos);
    });
  });

  fdescribe('#createFonoaudiologo', () => {
    it('should return the fonoaudiologo object created', () => {
        


        let fonoaudiologo:Fonoaudiologo  = new Fonoaudiologo()
        fonoaudiologo.id=3
        fonoaudiologo.dsc_nome="Ana"
        fonoaudiologo.dsc_email = "ana@gmail.com"
        fonoaudiologo.dsc_cpf= "22222222222"
        fonoaudiologo.frg_pessoa=5,
        fonoaudiologo.dat_nascimento= "1995-01-01"
        fonoaudiologo.dsc_email= "ana@gmail.com"


      service.create(fonoaudiologo).subscribe(_fonoaudiologo => {
        expect(_fonoaudiologo).toBe(fonoaudiologo);
      });
  
      const req = httpMock.expectOne(`${environment.request_base_url}/fonoaudiologos`);
      expect(req.request.method).toBe("POST");
      req.flush(fonoaudiologo);
    });
  });

  fdescribe('#updateFonoaudiologo.', () => {
    it('should return the fonoaudiologo object updated', () => {
        


      let fonoaudiologo:Fonoaudiologo  = new Fonoaudiologo()
      fonoaudiologo.id=3
      fonoaudiologo.dsc_nome="Ana"
      fonoaudiologo.dsc_email = "ana123@gmail.com"
      fonoaudiologo.dsc_cpf= "22222222222"
      fonoaudiologo.frg_pessoa=5,
      fonoaudiologo.dat_nascimento= "1995-01-01"
      fonoaudiologo.dsc_email= "ana@gmail.com"


      service.update(fonoaudiologo).subscribe(_fonoaudiologo => {
        expect(_fonoaudiologo).toBe(fonoaudiologo);
      });
  
      const req = httpMock.expectOne(`${environment.request_base_url}/fonoaudiologos/3`);
      expect(req.request.method).toBe("PUT");
      req.flush(fonoaudiologo);
    });
  });

  fdescribe('#deleteFonoaudiologo', () => {
    it('should remove fonoaudiologo by id', () => {
      let id = 3
      service.delete(id).subscribe();
  
      const req = httpMock.expectOne(`${environment.request_base_url}/fonoaudiologos/`+id);
      expect(req.request.method).toBe("DELETE");
    });
  });

  fdescribe('#readFonoaudiologo', () => {
    it('should return fonoaudiologo object by id pass', () => {
      let id = 1
      service.read(id).subscribe(fonoaudiologo=>
        expect(fonoaudiologo.id).toEqual(id) 
      );
  
      const req = httpMock.expectOne(`${environment.request_base_url}/fonoaudiologos/`+id);
      expect(req.request.method).toBe("GET");
      req.flush(dummyFonoaudiologos[0]);
    });
  });


});