import { Menu, CUSTOM } from '../role-menu/menu';
let admin = {
    role:"admin",
    titulo:"Administração",
    categorias:[
        {
            nome:"Usuário",
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




let fono = {
    role:"fono",
    titulo:"Fonoaudiologo",
    categorias:[
        {
            nome:"Fono",
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
            itens:[
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
    ]
};

let custom = {
    role: CUSTOM,
    titulo:"",
    categorias:[
        {
            nome:"Video",
            itens:[
                {
                    nome:"Play",
                    url:"/sistema/video/play",
                    icone:"fa fa-circle-o"
                },
               
            ]
        },
    ]
};


export const MENU: Menu[] =[admin,fono,custom]; 