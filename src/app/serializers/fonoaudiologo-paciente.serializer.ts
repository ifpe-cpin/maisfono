import { FonoaudiologoPaciente } from "../models/fonoaudiologo-paciente";

export class FonoaudiologoPacienteSerializer {
    fromJson(json: any): FonoaudiologoPaciente {
      let fonoaudiologoPaciente = new FonoaudiologoPaciente();
      fonoaudiologoPaciente = json;
      
      return fonoaudiologoPaciente;
    }
  
    toJson(fonoaudiologoPaciente: FonoaudiologoPaciente): any {
      return JSON.stringify(fonoaudiologoPaciente)
    }
  }