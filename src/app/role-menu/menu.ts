import { Categoria } from "./categoria";

export const CUSTOM = "custom";
export interface Menu{

    role:string;
    titulo:string;
    categorias: Categoria[];
}
