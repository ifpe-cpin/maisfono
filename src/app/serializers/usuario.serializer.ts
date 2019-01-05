import { User } from "../models/user";


export class UsuarioSerializer {
    fromJson(json: any): User {
      let user = new User();
      user = json;
      
      return user;
    }
  
    toJson(user: User): any {
      let json = {
        "id":user.id,
        "email":user.email,
        "photoUrl":user.photoURL,
        "displayName":user.displayName,
        "tipo":user.tipo,
        "roles":user.roles
      }

      console.log(json)
      return json
      
      
    }
  }