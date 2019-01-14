import { Calendario } from "../models/calendario";

export class EvolucaoSerializer {
    fromJson(json: any): Calendario {
      let calendario = new Calendario();
      calendario = json;
      
      return calendario;
    }
  
    toJson(calendario: Calendario): any {
      return JSON.stringify(calendario)
    }
}