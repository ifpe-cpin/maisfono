import { Resource } from "./resource";

export class AgendaDisponibilidade extends Resource{
        fk_fonoaudiologo: number
        dat_atendimento: Date
        hor_inicio: string
        hor_fim: string
        status: string
}
