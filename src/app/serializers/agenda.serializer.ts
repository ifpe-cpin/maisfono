import { Agenda } from "../models/agenda";

export class AgendaSerializer {
    fromJson(json: any): Agenda {
      let agenda = new Agenda();

      agenda.id = json.id
      agenda.paciente = json.paciente;
      agenda.data = json.data;
      agenda.hora_inicio = json.hora_inicio;
      agenda.hora_fim = json.hora_fim;
      agenda.fk_status = json.fk_status;
      agenda.nome_status = json.nome_status;
      
      return agenda;
    }
  
    toJson(agenda: Agenda): any {
      let json = {
        "paciente": agenda.paciente,
        "data": agenda.data,
        "hora_inicio": agenda.hora_inicio,
        "hora_fim": agenda.hora_fim,
        "fk_status": agenda.fk_status,
        "nome_status": agenda.nome_status
      }

      return json
    }
}