<?php

use Slim\Http\Request;
use Slim\Http\Response;


if (PHP_SAPI == 'cli-server') {
    // To help the built-in PHP dev server, check if the request was actually for
    // something which should probably be served as a static file
    $url  = parse_url($_SERVER['REQUEST_URI']);
    $file = __DIR__ . $url['path'];
    if (is_file($file)) {
        return false;
    }
}

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, POST, GET, DELETE,OPTIONS');
header('always_populate_raw_post_data: -1');

require __DIR__ . '/../vendor/autoload.php';

session_start();

// Instantiate the app
$settings = require __DIR__ . '/../src/settings.php';
$app = new \Slim\App($settings);

// Set up dependencies
require __DIR__ . '/../src/dependencies.php';

// Register middleware
require __DIR__ . '/../src/middleware.php';

// Register routes
require __DIR__ . '/../src/routes.php';



//header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

/*$corsOptions = array(
    "origin" => "*",
    //"exposeHeaders" => array("Content-Type","Access-Control-Allow-Headers", "X-Requested-With", "X-authentication", "X-client"),
    "allowMethods" => array('GET', 'POST', 'PUT', 'DELETE', 'OPTIONS')
);
$cors = new \CorsSlim\CorsSlim($corsOptions);*/

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

// Run app
$app->run();
/*______________________________________________________
|                                                       |
|                RESTS's - Usuário                      |
|______________________________________________________*/


function getUsuarios(Request $request, Response $response) {
	$sql = "SELECT * FROM tb_user u ";

    try {
        $stmt = getConnection()->query($sql);
        $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return  $response->withJson($usuarios, 200)
        ->withHeader('Content-type', 'application/json');

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getUsuario(Request $request, Response $response) {
    $id = $request->getAttribute('id');
    
    $sql = "SELECT * FROM tb_user u 
     WHERE u.id=:id";

    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        
        $stmt->bindParam(":id", $id);

        $stmt->execute();

        $usuario = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        
        return  $response->withJson($usuario, 200)
        ->withHeader('Content-type', 'application/json');

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function addUsuario(Request $request, Response $response){
    $usuario = json_decode($request->getBody());
    
    $sqlUsuario = "INSERT INTO tb_user(id,email,photoUrl,displayName,roles,tipo) 
                VALUES (:id,:email,:photoUrl,:displayName,:roles,:tipo)";

    $sqlPessoa = "INSERT INTO tb_pessoa(dsc_nome,img_perfil,dsc_email)
            VALUES (:dsc_nome,:img_perfil,:dsc_email)";

    $sqlFono = "INSERT INTO tb_fonoaudiologo(frg_pessoa,frg_user) 
                VALUES (:frg_pessoa,:frg_user)";
    
    $sqlPaciente = "INSERT INTO tb_paciente(id_pessoa,frg_user) 
                VALUES (:frg_pessoa,:frg_user)";
    

    $db = getConnection();
    try {
        
        $db->beginTransaction();

        $stmt = $db->prepare($sqlUsuario);
        $roles = $usuario->roles;

        $stmt->bindParam("id", $usuario->id);
        $stmt->bindParam("email", $usuario->email);
        $stmt->bindParam("photoUrl", $usuario->photoUrl);
        $stmt->bindParam("displayName", $usuario->displayName);
        $stmt->bindParam("roles",$roles);   
        $stmt->bindParam("tipo", $usuario->tipo);
       
        $stmt->execute();

        $stmt2 = $db->prepare($sqlPessoa);

        $stmt2->bindParam("dsc_nome", $usuario->displayName);
        $stmt2->bindParam("img_perfil", $usuario->photoUrl);
        $stmt2->bindParam("dsc_email", $usuario->email);
       
        $stmt2->execute();

        $idPessoa = $db->lastInsertId();

        switch ($usuario->tipo) {
            case 1:

                $stmt3 = $db->prepare($sqlFono);

                $stmt3->bindParam("frg_pessoa", $idPessoa);
                $stmt3->bindParam("frg_user", $usuario->id);

                $stmt3->execute();
                break;

            case 2:

                $stmt3 = $db->prepare($sqlPaciente);

                $stmt3->bindParam("frg_pessoa", $idPessoa);
                $stmt3->bindParam("frg_user", $usuario->id);

                $stmt3->execute();

                break;
        } 
       

        


        $db->commit();
        $db = null;

        return $response->withJson($usuario, 201)
        ->withHeader('Content-type', 'application/json');

    } catch(PDOException $e) {
        $db->rollBack();
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function updateUsuario(Request $request, Response $response) {
    $usuario = json_decode($request->getBody());

    $id = $request->getAttribute('id');
    
    $sqlUser = "UPDATE tb_user 
            SET 
            email = :email,
            photoUrl = :photoUrl,
            displayName = :displayName,
            roles = :roles,
            tipo = :tipo
            WHERE id=:id";

    

        $db = getConnection();
    try {
        $db->beginTransaction();
        
        $stmt = $db->prepare($sqlUser);
        
        $stmt->bindParam("email", $usuario->email);
        $stmt->bindParam("photoUrl", $usuario->photoUrl);
        $stmt->bindParam("displayName", $usuario->displayName);
        $stmt->bindParam("roles", $usuario->roles);
        $stmt->bindParam("tipo", $usuario->tipo);
        $stmt->bindParam("id", $usuario->id);
        

        $stmt->execute();

        $db->commit();
        $db = null;
        return $response->withJson($usuario, 200)
        ->withHeader('Content-type', 'application/json');
    } catch(PDOException $e) {
        $db->rollBack();
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

/*______________________________________________________
|                                                       |
|                RESTS's - Evolução                     |
|______________________________________________________*/

function getEvolucoes($request) {
	$idPaciente = $request->getAttribute('idPaciente');
    $idFonoaudiologo = $request->getAttribute('idFonoaudiologo');
    
    $sql = "SELECT id, dsc_evolucao, fk_flag_evolucao, 
                   fk_fonoaudiologo, fk_paciente, 
                   dsc_titulo, dat_evolucao
            FROM tb_evolucao 
            WHERE fk_paciente = ". $idPaciente ." 
            and fk_fonoaudiologo = ". $idFonoaudiologo ." 
            order by dat_evolucao DESC";

    try {
        $stmt = getConnection()->query($sql);
        $evolucoes = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
		
        return json_encode($evolucoes, JSON_UNESCAPED_UNICODE);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}



function addEvolucao($request) {
    $evolucao = json_decode($request->getBody());
	
    $sql = "INSERT INTO tb_evolucao(dsc_evolucao,fk_flag_evolucao,fk_fonoaudiologo,fk_paciente,dsc_titulo) VALUES (:dsc_evolucao, :fk_flag_evolucao, :fk_fonoaudiologo, :fk_paciente, :dsc_titulo)";

    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("dsc_evolucao", $evolucao->dsc_evolucao);
        $stmt->bindParam("fk_flag_evolucao", $evolucao->fk_flag_evolucao);
        $stmt->bindParam("fk_fonoaudiologo", $evolucao->fk_fonoaudiologo);
        $stmt->bindParam("fk_paciente", $evolucao->fk_paciente);
        $stmt->bindParam("dsc_titulo", $evolucao->dsc_titulo);
        $stmt->execute();
        $db = null;
        echo json_encode($evolucao);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function updateEvolucao($request) {
    $evolucao = json_decode($request->getBody());
	$id = $request->getAttribute('id');
    $sql = "UPDATE tb_evolucao 
            SET dsc_evolucao =:dsc_evolucao,
                fk_flag_evolucao =:fk_flag_evolucao,
                fk_fonoaudiologo =:fk_fonoaudiologo,
                fk_paciente =:fk_paciente,
                dsc_titulo =:dsc_titulo,
                dat_evolucao =:dat_evolucao
            WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("dsc_evolucao", $evolucao->dsc_evolucao);
        $stmt->bindParam("fk_flag_evolucao", $evolucao->fk_flag_evolucao);
        $stmt->bindParam("fk_fonoaudiologo", $evolucao->fk_fonoaudiologo);
        $stmt->bindParam("fk_paciente", $evolucao->fk_paciente);
        $stmt->bindParam("dsc_titulo", $evolucao->dsc_titulo);
        $stmt->bindParam("dat_evolucao", $evolucao->dat_evolucao);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $db = null;
        echo json_encode($evolucao);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}


function deleteEvolucao($request) {
	$id = $request->getAttribute('id');
    $sql = "DELETE FROM tb_evolucao WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $db = null;
		echo '{"error":{"text":"successfully! deleted Records"}}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}


/*______________________________________________________
|                                                       |
|               RESTS's - Fonoaudiologo                 |
|______________________________________________________*/

function addFonoaudiologo(Request $request, Response $response){
    $fonoaudiologo = json_decode($request->getBody());
	
    $sqlPessoa = "INSERT INTO tb_pessoa(dsc_cpf,dsc_nome,img_perfil,dsc_email,dat_nascimento,
                                    dsc_telefone1,dsc_telefone2,frg_cor,frg_endestado,
                                    frg_endcidade,dsc_endbairro,dsc_endcep,dsc_endnum,
                                    dsc_endrua,dsc_nomemae,dsc_nomepai,frg_estado_civil,
                                    frg_sexo,frg_nasestado,frg_nascidade,frg_tipo_sanguineo
                                    )
     VALUES (:dsc_cpf,:dsc_nome,:img_perfil,:dsc_email,:dat_nascimento,
            :dsc_telefone1,:dsc_telefone2,:frg_cor,:frg_endestado,
            :frg_endcidade,:dsc_endbairro,:dsc_endcep,:dsc_endnum,
            :dsc_endrua,:dsc_nomemae,:dsc_nomepai,:frg_estado_civil,
            :frg_sexo,:frg_nasestado,:frg_nascidade,:frg_tipo_sanguineo)";

    $sqlFono = "INSERT INTO tb_fonoaudiologo(frg_pessoa,num_crf,frg_grau_formacao,arr_areas,arr_cursos) 
                VALUES (:frg_pessoa,:num_crf,:frg_grau_formacao,:arr_areas,:arr_cursos)";
    
    
    $db = getConnection();
    try {
        
        $db->beginTransaction();

        $stmt = $db->prepare($sqlPessoa);

        $stmt->bindParam("dsc_cpf", $fonoaudiologo->dsc_cpf);
        $stmt->bindParam("dsc_nome", $fonoaudiologo->dsc_nome);
        $stmt->bindParam("img_perfil", $fonoaudiologo->img_perfil);
        $stmt->bindParam("dsc_email", $fonoaudiologo->dsc_email);
        $stmt->bindParam("dat_nascimento", $fonoaudiologo->dat_nascimento);
        $stmt->bindParam("dsc_telefone1", $fonoaudiologo->dsc_telefone1);
        $stmt->bindParam("dsc_telefone2", $fonoaudiologo->dsc_telefone2);
        $stmt->bindParam("frg_cor", $fonoaudiologo->frg_cor);
        $stmt->bindParam("frg_endestado", $fonoaudiologo->frg_endestado);
        $stmt->bindParam("frg_endcidade", $fonoaudiologo->frg_endcidade);
        $stmt->bindParam("dsc_endbairro", $fonoaudiologo->dsc_endbairro);
        $stmt->bindParam("dsc_endcep", $fonoaudiologo->dsc_endcep);
        $stmt->bindParam("dsc_endnum", $fonoaudiologo->dsc_endnum);
        $stmt->bindParam("dsc_endrua", $fonoaudiologo->dsc_endrua);
        $stmt->bindParam("dsc_nomemae", $fonoaudiologo->dsc_nomemae);
        $stmt->bindParam("dsc_nomepai", $fonoaudiologo->dsc_nomepai);
        $stmt->bindParam("frg_estado_civil", $fonoaudiologo->frg_estado_civil);
        $stmt->bindParam("frg_sexo", $fonoaudiologo->frg_sexo);
        $stmt->bindParam("frg_nasestado", $fonoaudiologo->frg_nasestado);
        $stmt->bindParam("frg_nascidade", $fonoaudiologo->frg_nascidade);
        $stmt->bindParam("frg_tipo_sanguineo", $fonoaudiologo->frg_tipo_sanguineo);
       
        $stmt->execute();

        $idPessoa = $db->lastInsertId();

        $fonoaudiologo->frg_pessoa = $idPessoa;

        $stmt2 = $db->prepare($sqlFono);

        $stmt2->bindParam("frg_pessoa", $fonoaudiologo->frg_pessoa);
        $stmt2->bindParam("num_crf", $fonoaudiologo->num_crf);
        $stmt2->bindParam("frg_grau_formacao", $fonoaudiologo->frg_grau_formacao);
        $stmt2->bindParam("arr_areas", $fonoaudiologo->arr_areas);
        $stmt2->bindParam("arr_cursos", $fonoaudiologo->arr_cursos);

        $stmt2->execute();

        $fonoaudiologo->id = $db->lastInsertId();

        $db->commit();
        $db = null;

        return $response->withJson($fonoaudiologo, 201)
        ->withHeader('Content-type', 'application/json');

    } catch(PDOException $e) {
        $db->rollBack();
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function updateFonoaudiologo(Request $request, Response $response) {
    $fonoaudiologo = json_decode($request->getBody());

    $id = $request->getAttribute('id');
    
    $sqlPessoa = "UPDATE tb_pessoa 
            SET 
            dsc_cpf = :dsc_cpf,
            dsc_nome = :dsc_nome,
            img_perfil = :img_perfil,
            dsc_email = :dsc_email,
            dat_nascimento = :dat_nascimento,
            dsc_telefone1 = :dsc_telefone1,
            dsc_telefone2 = :dsc_telefone2,
            frg_cor= :frg_cor,
            frg_endestado = :frg_endestado,
            frg_endcidade = :frg_endcidade,
            dsc_endbairro = :dsc_endbairro,
            dsc_endcep = :dsc_endcep,
            dsc_endnum = :dsc_endnum,
            dsc_endrua = :dsc_endrua,
            dsc_nomemae = :dsc_nomemae,
            dsc_nomepai = :dsc_nomepai,
            frg_estado_civil = :frg_estado_civil,
            frg_sexo = :frg_sexo,
            frg_nasestado = :frg_nasestado,
            frg_nascidade = :frg_nascidade,
            frg_tipo_sanguineo = :frg_tipo_sanguineo
            WHERE id=:id";

    $sqlFono = "UPDATE tb_fonoaudiologo 
            SET 
            num_crf = :num_crf,
            frg_grau_formacao = :frg_grau_formacao,
            arr_areas = :arr_areas,
            arr_cursos = :arr_cursos
            WHERE id=:id";    

        $db = getConnection();
    try {
        $db->beginTransaction();
        
        $stmt = $db->prepare($sqlPessoa);
        
        $stmt->bindParam("dsc_cpf", $fonoaudiologo->dsc_cpf);
        $stmt->bindParam("dsc_nome", $fonoaudiologo->dsc_nome);
        $stmt->bindParam("img_perfil", $fonoaudiologo->img_perfil);
        $stmt->bindParam("dsc_email", $fonoaudiologo->dsc_email);
        $stmt->bindParam("dat_nascimento", $fonoaudiologo->dat_nascimento);
        $stmt->bindParam("dsc_telefone1", $fonoaudiologo->dsc_telefone1);
        $stmt->bindParam("dsc_telefone2", $fonoaudiologo->dsc_telefone2);
        $stmt->bindParam("frg_cor", $fonoaudiologo->frg_cor);
        $stmt->bindParam("frg_endestado", $fonoaudiologo->frg_endestado);
        $stmt->bindParam("frg_endcidade", $fonoaudiologo->frg_endcidade);
        $stmt->bindParam("dsc_endbairro", $fonoaudiologo->dsc_endbairro);
        $stmt->bindParam("dsc_endcep", $fonoaudiologo->dsc_endcep);
        $stmt->bindParam("dsc_endnum", $fonoaudiologo->dsc_endnum);
        $stmt->bindParam("dsc_endrua", $fonoaudiologo->dsc_endrua);
        $stmt->bindParam("dsc_nomemae", $fonoaudiologo->dsc_nomemae);
        $stmt->bindParam("dsc_nomepai", $fonoaudiologo->dsc_nomepai);
        $stmt->bindParam("frg_estado_civil", $fonoaudiologo->frg_estado_civil);
        $stmt->bindParam("frg_sexo", $fonoaudiologo->frg_sexo);
        $stmt->bindParam("frg_nasestado", $fonoaudiologo->frg_nasestado);
        $stmt->bindParam("frg_nascidade", $fonoaudiologo->frg_nascidade);
        $stmt->bindParam("frg_tipo_sanguineo", $fonoaudiologo->frg_tipo_sanguineo);

        $stmt->bindParam("id", $fonoaudiologo->frg_pessoa);

        $stmt->execute();

        $stmt2 = $db->prepare($sqlFono);

        $stmt2->bindParam("num_crf", $fonoaudiologo->num_crf);
        $stmt2->bindParam("frg_grau_formacao", $fonoaudiologo->frg_grau_formacao);
        $stmt2->bindParam("arr_areas", $fonoaudiologo->arr_areas);
        $stmt2->bindParam("arr_cursos", $fonoaudiologo->arr_cursos);
        $stmt2->bindParam("id", $id);

        $stmt2->execute();

        $db->commit();
        $db = null;
        return $response->withJson($fonoaudiologo, 200)
        ->withHeader('Content-type', 'application/json');
    } catch(PDOException $e) {
        $db->rollBack();
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getFonoaudiologos(Request $request, Response $response) {
    $sql = "SELECT * FROM tb_pessoa p 
            INNER JOIN tb_fonoaudiologo f 
            ON p.id = f.frg_pessoa";

    try {
        $stmt = getConnection()->query($sql);
        $fonoaudiologos = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return  $response->withJson($fonoaudiologos, 200)
        ->withHeader('Content-type', 'application/json');

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

    
}

function getFonoaudiologo(Request $request, Response $response) {
    $id = $request->getAttribute('id');
    
    $sql = "SELECT * FROM tb_pessoa p 
    INNER JOIN tb_fonoaudiologo f 
    ON p.id = f.frg_pessoa WHERE f.id=:id";

    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        
        $stmt->bindParam(":id", $id);

        $stmt->execute();

        $fonoaudiologo = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        
        return  $response->withJson($fonoaudiologo, 200)
        ->withHeader('Content-type', 'application/json');

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function deleteFonoaudiologo(Request $request, Response $response) {
	$id = $request->getAttribute('id');
    $sqlFono = "DELETE FROM tb_fonoaudiologo WHERE id=:id";
    $sqlPessoa = "DELETE FROM tb_pessoa WHERE id=:id";
    $sqlSelectFono = "SELECT * FROM tb_fonoaudiologo WHERE id=:id";

    $db = getConnection();
    try {
        $db->beginTransaction();

        $stmt = $db->prepare($sqlSelectFono);
        $stmt->bindParam(":id", $id);
        $stmt->execute();

        $fonoaudiologo = $stmt->fetch(PDO::FETCH_OBJ);
        
        $stmt2 = $db->prepare($sqlFono);
        $stmt2->bindParam("id", $fonoaudiologo->id);
        $stmt2->execute();

        $stmt3 = $db->prepare($sqlPessoa);
        $stmt3->bindParam("id", $fonoaudiologo->frg_pessoa);
        $stmt3->execute();

        $db->commit();
        $db = null;
        
		return $response->withJson(['msg' => "Deletando o fonoaudiologo {$id}"], 204)
        ->withHeader('Content-type', 'application/json');

    } catch(PDOException $e) {
        $db->rollBack();
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}


/*______________________________________________________
|                                                       |
|                 RESTS's - Paciente                    |
|______________________________________________________*/


function getPacientes(Request $request, Response $response) {
    $sql = "SELECT pe.*, (
                SELECT flag_situacao FROM tb_fonoaudiologo_paciente WHERE flag_situacao = 1 AND PE.ID = FRG_PACIENTE
            ) AS situacao
            FROM tb_pessoa pe 
            INNER JOIN tb_paciente pa 
            ON pe.id = pa.id_pessoa";
        
    try {
        $stmt = getConnection()->query($sql);
        $pacientes = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return json_encode($pacientes, JSON_UNESCAPED_UNICODE);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}


// Catch-all route to serve a 404 Not Found page if none of the routes match
// NOTE: make sure this route is defined last
$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
    $handler = $this->notFoundHandler; // handle using the default Slim page not found handler
    return $handler($req, $res);
});


/*______________________________________________________
|                                                       |
|                  Conecção com BD                      |
|______________________________________________________*/

function getConnection() {
    //   $dbhost="127.0.0.1";
    //   $dbuser="root";
    //   $dbpass="";
    //   $dbname="db_maisfono";
    $dbhost="jrpires.com";
    $dbuser="jrpiresc_ifpe";
    $dbpass="maisfono_0001";
    $dbname="jrpiresc_maisfono_rest";
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
}
