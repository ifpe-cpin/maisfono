import { Calendario } from "../models/calendario";

export class CalendarioSerializer {
    fromJson(json: any): Calendario {
      let calendario = new Calendario();
      
      calendario.title = json.title
      calendario.start = json.start
      calendario.end = json.end
      calendario.color = json.color
      
      return calendario;
    }
  
    toJson(calendario: Calendario): any {

      let json = {
        "title": calendario.title,
        "start": calendario.start,
        "end": calendario.end,
        "color": calendario.color,
      }
      
      return json
    }
}