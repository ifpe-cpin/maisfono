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
                {
                    nome:"Create",
                    url:"/sistema/fonoaudiologo/novo",
                    icone:"fa fa-circle-o"
                }
            ]
        },
        {
            nome:"Paciente",
            itens:[
                {
                    nome:"Admin",
                    url:"/sistema/user/admin",
                    icone:"fa fa-circle-o"
                },
                {
                    nome:"Create",
                    url:"/sistema/fonoaudiologo/novo",
                    icone:"fa fa-circle-o"
                }
            ]
        }
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
                    url:"/sistema/fonoaudiologo/consultarPaciente",
                    icone:"fa fa-circle-o"
                },
                {
                    nome:"Meus Pacientes",
                    url:"/sistema/fonoaudiologo/consultarMeus",
                },
            ],
        },
    ]
};

let custom = {
    role: CUSTOM,
    titulo:"GERAL",
    categorias:[
        {
            nome:"FALE CONOSCO",
            itens:[
                {
                    nome:"Admin",
                    url:"/sistema/fonoaudiologo/admin",
                    icone:"fa fa-circle-o"
                },
               
            ]
        },
    ]
};


export const MENU: Menu[] =[admin,fono,custom]; 