import { Resource } from "./resource";

export class Agenda extends Resource{
        paciente?: string;
        data?: string;
        hora_inicio?: string;
        hora_fim?: string;
        fk_status?: number;
        nome_status?: string;
}
