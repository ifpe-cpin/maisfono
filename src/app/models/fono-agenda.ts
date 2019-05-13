import { Resource } from "./resource";

export const CONFIRMADO = 2
export const ATENDIDO = 5
export const FALTOU = 4

export class FonoAgenda extends Resource{
        fk_agenda_disponibilidade: number;
        fk_paciente: number;
        fk_fonoaudiologo: number;
        fk_status: number;
}
