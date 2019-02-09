import { Resource } from "./resource";

export class FonoAgenda extends Resource{
        fk_agenda_disponibilidade: number;
        fk_paciente: number;
        fk_fonoaudiologo: number;
        fk_status: number;
}
