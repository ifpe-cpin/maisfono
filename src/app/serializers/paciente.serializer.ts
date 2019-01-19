import { Paciente } from "../models/Paciente";

export class PacienteSerializer {
    fromJson(json: any): Paciente {
      let paciente = new Paciente();
      paciente = json;
      
      return paciente;
    }
  
    toJson(paciente: Paciente): any {
      return JSON.stringify(paciente)
    }
  }