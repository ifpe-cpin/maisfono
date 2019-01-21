import { Resource } from "./resource";

export class Evolucao extends Resource{

       dsc_evolucao?: string;
       fk_flag_evolucao?: number;
       fk_fonoaudiologo?: number;
       fk_paciente?: number;
       dsc_titulo?: string;
       dat_evolucao?: Date;  

}