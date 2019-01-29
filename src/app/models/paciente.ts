import { Resource } from "./resource";

export class Paciente extends Resource {
    dsc_nome?: string;
    dsc_cpf?: string;
    id_pessoa?:number;
    //img_perfil?: string;
    data_nascimento?: string;
    dsc_email?: string;
    dsc_endbairro?: string;
    dsc_endcep?: string;
    dsc_endnum?: string;
    dsc_endrua?: string;
    dsc_nomemae?: string;
    dsc_nomepai?: string;
    dsc_telefone1?: string;
    dsc_telefone2?: string;
    frg_cor?: string;
    frg_endestado?: string;
    frg_endcidade?: string;
    frg_endzona?: string;
    frg_estadocivil?: string;
    frg_nasestado?: string;
    frg_nascidade?: string;
    frg_nacionalidade?: string;
    frg_sexo?: string;
    arr_deficiencia?: Array<any>;
    arr_fonema?: Array<any>;
}