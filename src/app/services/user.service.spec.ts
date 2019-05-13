import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { QueryOptions } from '../models/query-options';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { userInfo } from 'os';

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

    {   id:2,
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

});