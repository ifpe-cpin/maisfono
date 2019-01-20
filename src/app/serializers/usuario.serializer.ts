import { User } from "../models/user";


export class UsuarioSerializer {
    fromJson(json: any): User {
      let user = new User();

      user.id = json.id
      user.photoUrl = json.photoUrl
      user.displayName = json.displayName
      user.email = json.email
      user.tipo = json.tipo
      if(json.roles!=undefined){
         user.roles = json.roles.split(",")
      }
      
      
      return user;
    }
  
    toJson(user: User): any {
      let json = {
        "id":user.id,
        "email":user.email,
        "photoUrl":user.photoUrl,
        "displayName":user.displayName,
        "tipo":user.tipo,
        "roles": user.roles.join()
      }

      console.log(json)
      return json
      
      
    }
  }