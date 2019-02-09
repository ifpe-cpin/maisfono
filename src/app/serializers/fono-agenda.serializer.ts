import { FonoAgenda } from "../models/fono-agenda";

export class FonoAgendaSerializer {
    fromJson(json: any): FonoAgenda {
      let fonoAgenda = new FonoAgenda();
      fonoAgenda = json;
      
      return fonoAgenda;
    }
  
    toJson(fonoAgenda: FonoAgenda): any {
      return JSON.stringify(fonoAgenda)
    }
  }