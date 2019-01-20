import { Agenda } from "../models/agenda";

export class AgendaSerializer {
    fromJson(json: any): Agenda {
      let agenda = new Agenda();
      agenda = json;
      
      return agenda;
    }
  
    toJson(agenda: Agenda): any {
      return JSON.stringify(agenda)
    }
}