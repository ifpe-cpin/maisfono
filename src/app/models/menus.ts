import { Menu, CUSTOM } from '../role-menu/menu';
let admin = {
    role:"admin",
    titulo:"Administração",
    categorias:[
        {
            nome:"Usuário",
            icon: "fa fa-user",
            itens:[
                {
                    nome:"Admin",
                    url:"/sistema/user/admin",
                    icone:"fa fa-circle-o"
                },
            ]
        },
    ]
};

let paciente = {
    role:"paciente",
    titulo:"Paciente",
    categorias:[
        {
            nome:"Fono",
            icon: "fa fa-user",
            itens:[
                {
                    nome:"Admin",
                    url:"/sistema/paciente/paciente-fono",
                    icone:"fa fa-circle-o"
                },
            ]
        },
    ]
};




let fono = {
    role:"fono",
    titulo:"Fonoaudiologo",
    categorias:[
        {
            nome:"Fono",
            icon: "fa fa-user-md",
            itens:[
                {
                    nome:"Admin",
                    url:"/sistema/fonoaudiologo/admin",
                    icone:"fa fa-circle-o"
                },
               
            ]
        },
        {
            nome:"Paciente",
            icon: "fa fa-user",
            itens:[
                {
                    nome:"Admin",
                    url:"/sistema/fonoaudiologo/adminPaciente",
                    icone:"fa fa-circle-o"
                },
                {
                    nome:"Consultar Pacientes",
                    url:"/sistema/fonoaudiologo/consultarPacientes",
                    icone:"fa fa-circle-o"
                },
                {
                    nome:"Meus Pacientes",
                    url:"/sistema/fonoaudiologo/consultarMeus",
                    icone:"fa fa-circle-o"
                },
            ],
        },
        {
            nome:"Agenda",
            icon: "fa fa-calendar",
            itens:[
                {
                    nome:"Calendário",
                    url:"/sistema/fonoaudiologo/agenda/calendarioAgenda",
                    icone:"fa fa-circle-o"
                },{
                    nome:"Consultar Agenda",
                    url:"/sistema/fonoaudiologo/agenda/consultaAgenda",
                    icone:"fa fa-circle-o"
                },
                {
                    nome:"Consulta Disponibilidade",
                    url:"/sistema/fonoaudiologo/agenda/calendarioDisponibilidade",
                    icone:"fa fa-circle-o"
                },
                {
                    nome:"Incluir Disponibilidade",
                    url:"/sistema/fonoaudiologo/consultarMeus",
                    icone:"fa fa-circle-o"
                },
            ],
        },
    ]
};

let custom = {
    role: CUSTOM,
    titulo:"Geral",
    categorias:[
        {
            nome:"Video",
            icon: "fa fa-user",
            itens:[
                {
                    nome:"Play",
                    url:"/sistema/video/play",
                    icone:"fa fa-circle-o"
                },
               
            ]
        },
        {
            nome:"Jogos",
            icon: "fa fa-user",
            itens:[
                {
                    nome:"Play",
                    url:"/sistema/jogos",
                    icone:"fa fa-circle-o"
                },
               
            ]
        },
    ]
};


export const MENU: Menu[] =[admin,fono,paciente,custom]; 