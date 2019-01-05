import { User } from "../models/user";


export class UsuarioSerializer {
    fromJson(json: any): User {
      let user = new User();
      user = json;
      
      return user;
    }
  
    toJson(user: User): any {
      return JSON.stringify(user)
    }
  }