import { UserStatus } from "./user-status";

export const STATUS: UserStatus[] = [
                    {
                        id:1,
                        name:"Off-line",
                        classStyle:"text-muted"
                    },
                    {
                        id:2,
                        name:"Disponível",
                        classStyle:"text-success"
                    },
                    {
                        id:3,
                        name:"Ausente",
                        classStyle:"text-warning"
                    },
                    {
                        id:4,
                        name:"Ocupado",
                        classStyle:"text-danger"
                    },
]