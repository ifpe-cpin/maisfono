import { Fonoaudiologo } from "../models/fonoaudiologo";

export class FonoaudiologoSerializer {
    fromJson(json: any): Fonoaudiologo {
      let fono = new Fonoaudiologo();
      fono = json;
      
      return fono;
    }
  
    toJson(fono: Fonoaudiologo): any {
      return JSON.stringify(fono)
    }
  }