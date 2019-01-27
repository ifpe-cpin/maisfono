import { User } from "../models/user";


export class UsuarioSerializer {
    fromJson(json: any): User {
      let user = new User();

      user.id = json.id
      user.frg_pessoa = json.frg_pessoa
      user.photoUrl = json.photoUrl
      user.displayName = json.displayName
      user.email = json.email
      user.tipo = json.tipo
      user.status = json.status
      if(json.roles!=undefined){
         user.roles = json.roles.split(",")
      }
      
      
      return user;
    }
  
    toJson(user: User): any {
      let json = {
        "id":user.id,
        "frg_pessoa":user.frg_pessoa,
        "email":user.email,
        "photoUrl":user.photoUrl,
        "displayName":user.displayName,
        "tipo":user.tipo,
        "status":user.status,
        "roles": user.roles.join()
      }

      console.log(json)
      return json
      
      
    }
  }