import { Resource } from './resource';
import { Fonoaudiologo } from './fonoaudiologo';
import { Paciente } from './paciente';


const FONOAUDIOLOGO=1;
const PACIENTE = 2;

export class User extends Resource{
    frg_pessoa:number;
    email: string;
    photoUrl?: string;
    displayName?: string;
    roles?: string[];
    tipo:number;
    status:number;
    ultimo_acesso: Date

    _fonoaudiologo: Fonoaudiologo;
    _paciente: Paciente;

    isPaciente(): boolean{
      if(this.tipo==PACIENTE){
        return true;
      }
      return false;
    }

    isFonoaudiologo(): boolean{
      if(this.tipo==FONOAUDIOLOGO){
        return true;
      }
      return false;
    }
  }