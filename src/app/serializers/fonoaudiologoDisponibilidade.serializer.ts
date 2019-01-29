import { FonoaudiologoDisponibilidade } from "../models/fonoaudiologoDisponibilidade";

export class FonoaudiologoDisponibilidadeSerializer {
    fromJson(json: any): FonoaudiologoDisponibilidade {
      let fonoaudiologoDisponibilidade = new FonoaudiologoDisponibilidade();
      
      fonoaudiologoDisponibilidade.data = json.data
      fonoaudiologoDisponibilidade.hora_inicio = json.hora_inicio
      fonoaudiologoDisponibilidade.hora_fim = json.hora_fim
      
      return fonoaudiologoDisponibilidade;
    }
  
    toJson(fonoaudiologoDisponibilidade: FonoaudiologoDisponibilidade): any {
      let json = {
        "data":fonoaudiologoDisponibilidade.data,
        "hora_inicio":fonoaudiologoDisponibilidade.hora_inicio,
        "hora_fim":fonoaudiologoDisponibilidade.hora_fim
      }
      
      return json
    }
}