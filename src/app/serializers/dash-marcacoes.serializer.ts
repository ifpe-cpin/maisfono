import { DashMarcacoes } from "../models/dash-marcacoes";

export class DashMarcacoesSerializer {
    fromJson(json: any): DashMarcacoes {
      let dashMarcacoes = new DashMarcacoes();

      dashMarcacoes.total_marcado = json.total_marcado;
      dashMarcacoes.total_atendido = json.total_atendido;
      dashMarcacoes.total_faltou = json.total_faltou;
      dashMarcacoes.total_aguardando = json.total_aguardando;
      
      return dashMarcacoes;
    }
  
    toJson(dashMarcacoes: DashMarcacoes): any {
      let json = {
        "total_marcado": dashMarcacoes.total_marcado,
        "total_atendido": dashMarcacoes.total_atendido,
        "total_faltou": dashMarcacoes.total_faltou,
        "total_aguardando": dashMarcacoes.total_aguardando
      }

      return json
    }
}