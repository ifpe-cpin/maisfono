import { AgendaDisponibilidade } from "../models/agenda-disponibilidade";


export class AgendaDisponibilidadeSerializer {
    fromJson(json: any): AgendaDisponibilidade {
      let disponibilidade = new AgendaDisponibilidade();
      disponibilidade = json;
      
      return disponibilidade;
    }
  
    toJson(disponibilidade: AgendaDisponibilidade): any {
      return JSON.stringify(disponibilidade)
    }
  }