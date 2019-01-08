import { Evolucao } from "../models/evolucao";

export class EvolucaoSerializer {
    fromJson(json: any): Evolucao {
      let evolucao = new Evolucao();
      evolucao = json;
      
      return evolucao;
    }
  
    toJson(evolucao: Evolucao): any {
      return JSON.stringify(evolucao)
    }
  }