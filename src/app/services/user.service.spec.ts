import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { QueryOptions } from '../models/query-options';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Paciente } from '../models/paciente';

fdescribe('UserService', () => {
  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;

  const dummyUsers: User[] = [
    {   id:1,
        frg_pessoa:1,
        email: "pires@gmail.com",
        tipo:1,
        status:1,
        ultimo_acesso: new Date(),
        _fonoaudiologo: null,
        _paciente: null,
        isFonoaudiologo(){return true},
        isPaciente(){return false}},

    {   id:3,
        frg_pessoa:3,
        email: "victor@gmail.com",
        tipo:1,
        status:1,
        ultimo_acesso: new Date(),
        _fonoaudiologo: null,
        _paciente: null,
        isFonoaudiologo(){return true},
        isPaciente(){return false}},
  ];
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    injector = getTestBed();
    service = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  fdescribe('#getUsers', () => {
    it('should return 2 users', () => {
      service.list(new QueryOptions()).subscribe(users => {
        expect(users.length).toBe(2);
        //expect(users).toEqual(dummyUsers);
      });
  
      const req = httpMock.expectOne(`${environment.request_base_url}/usuarios/`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyUsers);
    });
  });

  fdescribe('#createUser', () => {
    it('should return the user object created', () => {
        


        let user:User  = new User()
        user.id=3
        user.frg_pessoa = 7
        user.email = "williane@gmail.com"
        user.status = 1
        user.ultimo_acesso = new Date()
        user._fonoaudiologo = null
        user._paciente
        user.roles = ["paciente","admin"]


      service.create(user).subscribe(_user => {
        expect(_user).toBe(user);
      });
  
      const req = httpMock.expectOne(`${environment.request_base_url}/usuarios`);
      expect(req.request.method).toBe("POST");
      req.flush(user);
    });
  });

  fdescribe('#updateUser', () => {
    it('should return the user object updated', () => {
        


        let user:User  = new User()
        user.id=3
        user.frg_pessoa = 7
        user.email = "williane@gmail.com"
        user.status = 1
        user.ultimo_acesso = new Date()
        user._fonoaudiologo = null
        user._paciente = new Paciente()
        user.roles = ["paciente","admin"]


      service.update(user).subscribe(_user => {
        expect(_user).toBe(user);
      });
  
      const req = httpMock.expectOne(`${environment.request_base_url}/usuarios/3`);
      expect(req.request.method).toBe("PUT");
      req.flush(user);
    });
  });

  fdescribe('#deleteUser', () => {
    it('should remove user by id', () => {
      let id = 3
      service.delete(id).subscribe();
  
      const req = httpMock.expectOne(`${environment.request_base_url}/usuarios/`+id);
      expect(req.request.method).toBe("DELETE");
      req.flush(dummyUsers[1]);
    });
  });

  fdescribe('#readUser', () => {
    it('should return user object by id pass', () => {
      let id = 1
      service.read(id).subscribe(user=>
        expect(user.id).toEqual(id) 
      );
  
      const req = httpMock.expectOne(`${environment.request_base_url}/usuarios/`+id);
      expect(req.request.method).toBe("GET");
      req.flush(dummyUsers[0]);
    });
  });


});