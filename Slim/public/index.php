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
    
    $sqlUsuario = "INSERT INTO tb_user(id,email,photoUrl,displayName,roles,tipo,ultimo_acesso) 
                VALUES (:id,:email,:photoUrl,:displayName,:roles,:tipo,:ultimo_acesso)";

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
        $stmt->bindParam("ultimo_acesso", $usuario->ultimo_acesso);
       
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
            tipo = :tipo,
            ultimo_acesso = :ultimo_acesso
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
        $stmt->bindParam("ultimo_acesso", $usuario->ultimo_acesso);
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

function changeStatusUsuario($id,$status) {
    
    $sqlUser = "UPDATE tb_user 
            SET 
            status=:status
            WHERE id=:id";

    

        $db = getConnection();
    try {
        $db->beginTransaction();
        
        $stmt = $db->prepare($sqlUser);
        $stmt->bindParam("status", $status);
        $stmt->bindParam("id", $id);
        

        $stmt->execute();

        $db->commit();
        $db = null;
        return "User ".$id." changed status for ".$status;
    } catch(PDOException $e) {
        $db->rollBack();
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

/*______________________________________________________
|                                                       |
|                RESTS's - Evolução                     |
|______________________________________________________*/

function getEvolucoes(Request $request, Response $response) {
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
		
        return  $response->withJson($evolucoes, 200)
        ->withHeader('Content-type', 'application/json');
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}



function addEvolucao(Request $request, Response $response) {
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

function getFonoaudiologoByUser(Request $request, Response $response) {
    $idUser = $request->getAttribute('idUser');
    
    $sql = "SELECT * FROM tb_pessoa p 
    INNER JOIN tb_fonoaudiologo f 
    ON p.id = f.frg_pessoa WHERE f.frg_user=:idUser";

    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        
        $stmt->bindParam(":idUser", $idUser);

        $stmt->execute();

        $fonoaudiologo = $stmt->fetchAll(PDO::FETCH_OBJ);
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
         
    $sql = "SELECT pac.*, p.dsc_nome,p.dsc_cpf, p.dsc_email,p.dat_nascimento,
    p.dsc_telefone1,p.dsc_telefone2,p.frg_cor,p.frg_endestado,
    p.frg_endcidade,p.dsc_endbairro,p.dsc_endcep,p.dsc_endnum,
    p.dsc_endrua,p.dsc_nomemae,p.dsc_nomepai,p.frg_estado_civil,
    p.frg_sexo,p.frg_nasestado,p.frg_nascidade, (
                SELECT flag_situacao FROM tb_fonoaudiologo_paciente WHERE flag_situacao = 1 and p.id = frg_paciente
                GROUP BY frg_paciente
            ) AS situacao 
            FROM tb_pessoa p 
            INNER JOIN tb_paciente pac 
            ON p.id = pac.id_pessoa";
    try {
        $stmt = getConnection()->query($sql);
        $pacientes = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return json_encode($pacientes, JSON_UNESCAPED_UNICODE);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getPacienteByUser(Request $request, Response $response) {
    $idUser = $request->getAttribute('idUser');
    
    $sql = "SELECT * FROM tb_pessoa p 
    INNER JOIN tb_paciente pac 
    ON p.id = pac.id_pessoa WHERE pac.frg_user=:idUser";

    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        
        $stmt->bindParam(":idUser", $idUser);

        $stmt->execute();

        $paciente = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return  $response->withJson($paciente, 200)
        ->withHeader('Content-type', 'application/json');

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}


function getPaciente(Request $request, Response $response) {
    $id = $request->getAttribute('id');
    
    $sql = "SELECT * FROM tb_pessoa p
    INNER JOIN tb_paciente pac
    ON p.id = pac.id_pessoa WHERE pac.id=:id";

    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        
        $stmt->bindParam(":id", $id);

        $stmt->execute();

        $paciente = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        
        return  $response->withJson($paciente, 200)
        ->withHeader('Content-type', 'application/json');

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function addPacientes(Request $request, Response $response){
    $paciente = json_decode($request->getBody());
	
    $sqlPessoa = "INSERT INTO tb_pessoa(dsc_cpf,dsc_nome,dsc_email,dat_nascimento,
                                    dsc_telefone1,dsc_telefone2,frg_cor,frg_endestado,
                                    frg_endcidade,dsc_endbairro,dsc_endcep,dsc_endnum,
                                    dsc_endrua,dsc_nomemae,dsc_nomepai,frg_estado_civil,
                                    frg_sexo,frg_nasestado,frg_nascidade
                                    )
     VALUES (:dsc_cpf,:dsc_nome,:dsc_email,:dat_nascimento,
            :dsc_telefone1,:dsc_telefone2,:frg_cor,:frg_endestado,
            :frg_endcidade,:dsc_endbairro,:dsc_endcep,:dsc_endnum,
            :dsc_endrua,:dsc_nomemae,:dsc_nomepai,:frg_estado_civil,
            :frg_sexo,:frg_nasestado,:frg_nascidade)";

    $sqlPaciente = "INSERT INTO tb_paciente(id_pessoa,arr_deficiencia,arr_fonema) 
                VALUES (:id_pessoa,:arr_deficiencia,:arr_fonema)";
    
    $db = getConnection();
    try {
        
        $db->beginTransaction();
        $stmt = $db->prepare($sqlPessoa);        
        $stmt->bindParam("dsc_nome", $paciente->dsc_nome);
        $stmt->bindParam("dsc_cpf", $paciente->dsc_cpf);
        $stmt->bindParam("dat_nascimento", $paciente->dat_nascimento);
        $stmt->bindParam("dsc_email", $paciente->dsc_email);
        $stmt->bindParam("dsc_telefone1", $paciente->dsc_telefone1);
        $stmt->bindParam("dsc_telefone2", $paciente->dsc_telefone2);
        $stmt->bindParam("frg_cor", $paciente->frg_cor);
        $stmt->bindParam("frg_endestado", $paciente->frg_endestado);
        $stmt->bindParam("frg_endcidade", $paciente->frg_endcidade);
        $stmt->bindParam("dsc_endbairro", $paciente->dsc_endbairro);
        $stmt->bindParam("dsc_endcep", $paciente->dsc_endcep);
        $stmt->bindParam("dsc_endnum", $paciente->dsc_endnum);
        $stmt->bindParam("dsc_endrua", $paciente->dsc_endrua);
        $stmt->bindParam("dsc_nomemae", $paciente->dsc_nomemae);
        $stmt->bindParam("dsc_nomepai", $paciente->dsc_nomepai);
        $stmt->bindParam("frg_estado_civil", $paciente->frg_estado_civil);
        $stmt->bindParam("frg_sexo", $paciente->frg_sexo);
        $stmt->bindParam("frg_nasestado", $paciente->frg_nasestado);
        $stmt->bindParam("frg_nascidade", $paciente->frg_nascidade);

        
       
        $stmt->execute();

        $idPessoa = $db->lastInsertId();

        $paciente->id_pessoa = $idPessoa;

        $stmt2 = $db->prepare($sqlPaciente);

        $stmt2->bindParam("id_pessoa", $paciente->id_pessoa);
        $stmt2->bindParam("arr_deficiencia", $paciente->arr_deficiencia);
        $stmt2->bindParam("arr_fonema", $paciente->arr_fonema);

        $stmt2->execute();

        $paciente->id = $db->lastInsertId();

        $db->commit();
        $db = null;

        return $response->withJson($paciente, 201)
        ->withHeader('Content-type', 'application/json');

    } catch(PDOException $e) {
        $db->rollBack();
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function updatePaciente(Request $request, Response $response) {
    $paciente = json_decode($request->getBody());

    $id = $request->getAttribute('id');
    
    $sqlPessoa = "UPDATE tb_pessoa 
            SET 
            dsc_cpf = :dsc_cpf,
            dsc_nome = :dsc_nome,
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
            frg_nascidade = :frg_nascidade
            WHERE id=:id";

    $sqlPaciente = "UPDATE tb_paciente 
            SET 
            arr_deficiencia = :arr_deficiencia,
            arr_fonema = :arr_fonema
            WHERE id=:id";    


        $db = getConnection();
    try {
        $db->beginTransaction();
        
        $stmt = $db->prepare($sqlPessoa);
        $stmt->bindParam("dsc_nome", $paciente->dsc_nome);
        $stmt->bindParam("dsc_cpf", $paciente->dsc_cpf);
        $stmt->bindParam("dat_nascimento", $paciente->dat_nascimento);
        $stmt->bindParam("dsc_email", $paciente->dsc_email);
        $stmt->bindParam("dsc_telefone1", $paciente->dsc_telefone1);
        $stmt->bindParam("dsc_telefone2", $paciente->dsc_telefone2);
        $stmt->bindParam("frg_cor", $paciente->frg_cor);
        $stmt->bindParam("frg_endestado", $paciente->frg_endestado);
        $stmt->bindParam("frg_endcidade", $paciente->frg_endcidade);
        $stmt->bindParam("dsc_endbairro", $paciente->dsc_endbairro);
        $stmt->bindParam("dsc_endcep", $paciente->dsc_endcep);
        $stmt->bindParam("dsc_endnum", $paciente->dsc_endnum);
        $stmt->bindParam("dsc_endrua", $paciente->dsc_endrua);
        $stmt->bindParam("dsc_nomemae", $paciente->dsc_nomemae);
        $stmt->bindParam("dsc_nomepai", $paciente->dsc_nomepai);
        $stmt->bindParam("frg_estado_civil", $paciente->frg_estado_civil);
        $stmt->bindParam("frg_sexo", $paciente->frg_sexo);
        $stmt->bindParam("frg_nasestado", $paciente->frg_nasestado);
        $stmt->bindParam("frg_nascidade", $paciente->frg_nascidade);

        $stmt->bindParam("id", $paciente->id_pessoa);

        $stmt->execute();

        $stmt2 = $db->prepare($sqlPaciente);

        $stmt2->bindParam("arr_deficiencia", $paciente->arr_deficiencia);
        $stmt2->bindParam("arr_fonema", $paciente->arr_fonema);
        $stmt2->bindParam("id", $id);

        $stmt2->execute();

        $db->commit();
        $db = null;
        return $response->withJson($paciente, 200)
        ->withHeader('Content-type', 'application/json');
    } catch(PDOException $e) {
        $db->rollBack();
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}


function getPacienteByFonoaudiologo(Request $request, Response $response) {
    $id = $request->getAttribute('id');
    
    $sql = "SELECT pa.* 
    FROM tb_pessoa pa 
    INNER JOIN tb_fonoaudiologo_paciente fp
    ON (pa.id = fp.frg_paciente )
    where fp.frg_fonoaudiologo =:id";

    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        
        $stmt->bindParam(":id", $id);

        $stmt->execute();

        $pacientes = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return  $response->withJson($pacientes, 200)
        ->withHeader('Content-type', 'application/json');

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}



/*______________________________________________________
|                                                       |
|        RESTS's - Fonoaudiologo - Calendário           |
|______________________________________________________*/


function addAgenda(Request $request, Response $response) {
    $agenda = json_decode($request->getBody());
	
    $sql = "INSERT INTO tb_agenda(fk_agenda_disponibilidade,fk_paciente,
    fk_fonoaudiologo,fk_status) VALUES (:fk_agenda_disponibilidade,:fk_paciente,
    :fk_fonoaudiologo,:fk_status)";

    $sqlDisponibilidade = "UPDATE tb_agenda_disponibilidade as agen_d 
    SET agen_d.status=:status WHERE agen_d.id=:id";

    $db = getConnection();
    try {
       
        $db->beginTransaction();

        $stmt = $db->prepare($sql);
        $stmt->bindParam("fk_agenda_disponibilidade", $agenda->fk_agenda_disponibilidade);
        $stmt->bindParam("fk_paciente", $agenda->fk_paciente);
        $stmt->bindParam("fk_fonoaudiologo", $agenda->fk_fonoaudiologo);
        $stmt->bindParam("fk_status", $agenda->fk_status);
        $stmt->execute();

        $status = 0;
        $stmt2 = $db->prepare($sqlDisponibilidade);
        $stmt2->bindParam("status", $status);

        $stmt2->bindParam("id",$agenda->fk_agenda_disponibilidade);

        $stmt2->execute();

        //updateDisponibilidadeStatus($agenda->fk_agenda_disponibilidade,0);

        $db->commit();
        $db = null;
        echo json_encode($agenda);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function updateAgenda(Request $request, Response $response) {
    $agenda = json_decode($request->getBody());

    $id = $request->getAttribute('id');
    
    $sql = "UPDATE tb_agenda
            SET 
            fk_agenda_disponibilidade = :fk_agenda_disponibilidade,
            fk_paciente = :fk_paciente,
            fk_fonoaudiologo = :fk_fonoaudiologo,
            fk_status = :fk_status
            WHERE id=:id";


        $db = getConnection();
    try {
        $db->beginTransaction();
        
        $stmt = $db->prepare($sql);
        
        $stmt->bindParam("fk_agenda_disponibilidade", $agenda->fk_agenda_disponibilidade);
        $stmt->bindParam("fk_paciente", $agenda->fk_paciente);
        $stmt->bindParam("fk_fonoaudiologo", $agenda->fk_fonoaudiologo);
        $stmt->bindParam("fk_status", $agenda->fk_status);

        $stmt->bindParam("id", $id);

        $stmt->execute();

        $db->commit();
        $db = null;
        return $response->withJson($agenda, 200)
        ->withHeader('Content-type', 'application/json');
    } catch(PDOException $e) {
        $db->rollBack();
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}




function getCalendario(Request $request, Response $response) {
    $id= $request->getAttribute('idFono');

    $sql = "SELECT pes.dsc_nome as title, 
           CONCAT(agen_d.dat_atendimento, ' ', agen_d.hor_inicio) as start, 
           CONCAT(agen_d.dat_atendimento, ' ', agen_d.hor_fim) as end, 
           CASE
                WHEN s.id = 1 THEN 'yellow'
                WHEN s.id = 2 THEN 'liteblue'
                WHEN s.id = 3 THEN 'grey'
                WHEN s.id = 4 THEN 'red'
                WHEN s.id = 5 THEN 'green'
           END as color
                FROM  `tb_agenda` agen INNER JOIN tb_paciente pac 
                ON agen.fk_paciente=pac.id 
                INNER JOIN tb_pessoa pes 
                ON pac.id_pessoa=pes.id 
                INNER JOIN tb_agenda_disponibilidade agen_d 
                ON agen.`fk_agenda_disponibilidade`=agen_d.id 
                INNER JOIN aux_status s
                ON agen.fk_status = s.id
                WHERE agen_d.fk_fonoaudiologo=:id";

    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        
        $stmt->bindParam("id", $id);

        $stmt->execute();

        $events = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return  $response->withJson($events, 200)
        ->withHeader('Content-type', 'application/json');
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getCalendarioByPaciente(Request $request, Response $response) {
    $id= $request->getAttribute('idPaciente');

    $sql = "SELECT pes.dsc_nome as title, 
           CONCAT(agen_d.dat_atendimento, ' ', agen_d.hor_inicio) as start, 
           CONCAT(agen_d.dat_atendimento, ' ', agen_d.hor_fim) as end, 
           CASE
                WHEN s.id = 1 THEN 'yellow'
                WHEN s.id = 2 THEN 'liteblue'
                WHEN s.id = 3 THEN 'grey'
                WHEN s.id = 4 THEN 'red'
                WHEN s.id = 5 THEN 'green'
           END as color
                FROM  `tb_agenda` agen INNER JOIN tb_paciente pac 
                ON agen.fk_paciente=pac.id 
                INNER JOIN tb_pessoa pes 
                ON pac.id_pessoa=pes.id 
                INNER JOIN tb_agenda_disponibilidade agen_d 
                ON agen.`fk_agenda_disponibilidade`=agen_d.id 
                INNER JOIN aux_status s
                ON agen.fk_status = s.id
                WHERE agen.fk_paciente=:id";

    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        
        $stmt->bindParam("id", $id);

        $stmt->execute();

        $events = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return  $response->withJson($events, 200)
        ->withHeader('Content-type', 'application/json');
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getCalendarAgenda(Request $request, Response $response) {
    $id= $request->getAttribute('idFono');

    $sql = "SELECT agen.id as id, pes.dsc_nome as paciente, 
                   agen_d.dat_atendimento as data,
                   agen_d.hor_inicio as hora_inicio, 
                   agen_d.hor_fim as hora_fim, 
                   s.id as fk_status,
                   s.dsc_nome as nome_status
                FROM `tb_agenda` agen INNER JOIN tb_paciente pac 
                ON agen.fk_paciente=pac.id 
                INNER JOIN tb_pessoa pes 
                ON pac.id_pessoa=pes.id 
                INNER JOIN tb_agenda_disponibilidade agen_d 
                ON agen.`fk_agenda_disponibilidade`=agen_d.id 
                INNER JOIN aux_status s
                ON agen.fk_status = s.id
                WHERE agen_d.fk_fonoaudiologo=:id and agen.fk_status=2";

    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        
        $stmt->bindParam("id", $id);

        $stmt->execute();

        $eventsAgenda = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
    return json_encode($eventsAgenda, JSON_UNESCAPED_UNICODE);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getCalendarDisponibilidade(Request $request, Response $response) {
    $id= $request->getAttribute('idFono');

    $sql = "SELECT d.id as id, 
                   d.dat_atendimento as data, 
                   d.hor_inicio as hora_inicio,
                   d.hor_fim as hora_fim
            FROM  tb_agenda_disponibilidade d
            WHERE d.fk_fonoaudiologo=:id and d.status=1";

    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        
        $stmt->bindParam("id", $id);

        $stmt->execute();

        $fonoaudiologoDisponibilidade = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return json_encode($fonoaudiologoDisponibilidade, JSON_UNESCAPED_UNICODE);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function addDisponibilidade(Request $request, Response $response){
    $disponibilidade = json_decode($request->getBody());
	


    $sql = "INSERT INTO tb_agenda_disponibilidade(fk_fonoaudiologo,dat_atendimento,hor_inicio,hor_fim) 
                VALUES (:fk_fonoaudiologo,:dat_atendimento,:hor_inicio,:hor_fim)";
    
    
    $db = getConnection();
    try {
        
        $db->beginTransaction();

        $stmt = $db->prepare($sql);

        $stmt->bindParam("fk_fonoaudiologo", $disponibilidade->fk_fonoaudiologo);
        $stmt->bindParam("dat_atendimento", $disponibilidade->dat_atendimento);
        $stmt->bindParam("hor_inicio", $disponibilidade->hor_inicio);
        $stmt->bindParam("hor_fim", $disponibilidade->hor_fim);
    
       
        $stmt->execute();

       

        $db->commit();
        $db = null;

        return $response->withJson($disponibilidade, 201)
        ->withHeader('Content-type', 'application/json');

    } catch(PDOException $e) {
        $db->rollBack();
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}






/*______________________________________________________
|                                                       |
|                  RESTS's - Dashboard                  |
|______________________________________________________*/
/*
        * | Status
        1 | Pendente
        2 | Confirmado
        3 | Em Atendimento
        4 | Faltou
        5 | Atendido 
*/
function getDashAgenda($request) {
    $idFonoaudiologo = $request->getAttribute('id');
    $dataAtual = date("Y-m-d"); 
    $sql = "SELECT p.dsc_nome as paciente, 
                d.dat_atendimento as data,
                d.hor_inicio as hora_inicio, 
                d.hor_fim as hora_fim, 
                s.id as fk_status,
                s.dsc_nome as nome_status,
                a.fk_paciente as frg_paciente
            FROM  tb_agenda a
            INNER JOIN tb_pessoa p
            ON a.fk_paciente = p.id
            INNER JOIN tb_agenda_disponibilidade d
            ON a.fk_agenda_disponibilidade =  d.id 
            INNER JOIN aux_status s
            ON a.fk_status = s.id 
            WHERE d.fk_fonoaudiologo = ". $idFonoaudiologo ."
            and d.dat_atendimento = '". $dataAtual ."'";

    try {
        $stmt = getConnection()->query($sql);
        $agenda = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return json_encode($agenda, JSON_UNESCAPED_UNICODE);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getSumDashMarcacoes($request) {
    $idFonoaudiologo = $request->getAttribute('id');
    $dataAtual = date("Y-m-d"); 
    
    $sql = "SELECT count(*) as total_atendido,
                (
                    SELECT count(*) as total
                    FROM  tb_agenda a
                    INNER JOIN tb_pessoa p
                    ON a.fk_paciente = p.id
                    INNER JOIN tb_agenda_disponibilidade d
                    ON a.fk_agenda_disponibilidade =  d.id 
                    INNER JOIN aux_status s
                    ON a.fk_status = s.id 
                    WHERE d.fk_fonoaudiologo = ". $idFonoaudiologo ."
                    and d.dat_atendimento = '". $dataAtual ."'
                    and a.fk_status = 4
                ) as total_faltou,
                (
                    SELECT count(*) 
                    FROM  tb_agenda a
                    INNER JOIN tb_pessoa p
                    ON a.fk_paciente = p.id
                    INNER JOIN tb_agenda_disponibilidade d
                    ON a.fk_agenda_disponibilidade =  d.id 
                    INNER JOIN aux_status s
                    ON a.fk_status = s.id 
                    WHERE d.fk_fonoaudiologo = ". $idFonoaudiologo ."
                    and d.dat_atendimento = '". $dataAtual ."'
                    and a.fk_status = 1 or a.fk_status = 2
                ) as total_aguardando,
                (
                    SELECT count(*) as total 
                    FROM  tb_agenda a
                    INNER JOIN tb_pessoa p
                    ON a.fk_paciente = p.id
                    INNER JOIN tb_agenda_disponibilidade d
                    ON a.fk_agenda_disponibilidade =  d.id 
                    INNER JOIN aux_status s
                    ON a.fk_status = s.id 
                    WHERE d.fk_fonoaudiologo = ". $idFonoaudiologo ."
                    and d.dat_atendimento = '". $dataAtual ."'
                ) as total_marcado
            FROM  tb_agenda a
            INNER JOIN tb_pessoa p
            ON a.fk_paciente = p.id
            INNER JOIN tb_agenda_disponibilidade d
            ON a.fk_agenda_disponibilidade =  d.id 
            INNER JOIN aux_status s
            ON a.fk_status = s.id 
            WHERE d.fk_fonoaudiologo = ". $idFonoaudiologo ."
            and d.dat_atendimento = '". $dataAtual ."'
            and a.fk_status = 5";
   
    
    try {
        
        $stmt = getConnection()->query($sql);
        $dashMarcacoes= $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return json_encode($dashMarcacoes, JSON_UNESCAPED_UNICODE);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

/*______________________________________________________
|                                                       |
|                RESTS's - FonoaudiologoPaciente        |
|______________________________________________________*/


function getFonoaudiologosNotPaciente(Request $request, Response $response) {
    $idPaciente = $request->getAttribute('notIdPaciente');
    
    $sql = "SELECT fon.id as id,fon.frg_pessoa,
    fon.num_crf,
    fon.arr_areas,
    fon.frg_grau_formacao,
    fon.arr_cursos,
    fon.frg_user,
    pes.dsc_nome,
    pes.dat_nascimento,
    pes.dsc_cpf,
    pes.dsc_email,
    pes.dsc_endbairro,
    pes.dsc_endcep,
    pes.dsc_endnum,
    pes.dsc_endrua,
    pes.dsc_nomemae,
    pes.dsc_nomepai,
    pes.dsc_telefone1,
    pes.dsc_telefone2,
    pes.frg_cor,
    pes.frg_endestado,
    pes.frg_endcidade,
    pes.frg_estado_civil,
    pes.frg_nasestado,
    pes.frg_nascidade,
    pes.frg_sexo,
    pes.frg_tipo_sanguineo
    FROM `tb_fonoaudiologo` fon INNER JOIN tb_pessoa AS pes ON fon.frg_pessoa=pes.id
    where fon.id NOT IN
     (SELECT fon_pac.frg_fonoaudiologo FROM tb_fonoaudiologo_paciente AS fon_pac 
     WHERE fon_pac.frg_paciente=:idPaciente AND fon_pac.flag_situacao=1) ";

    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        
        $stmt->bindParam(":idPaciente", $idPaciente);

        $stmt->execute();

        $fonoaudiologos = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return  $response->withJson($fonoaudiologos, 200)
        ->withHeader('Content-type', 'application/json');

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getFonoaudiologosByPaciente(Request $request, Response $response) {
    $idPaciente = $request->getAttribute('idPaciente');
    
    $sql = "SELECT fon_pac.frg_paciente,pes.dsc_nome as _fonoaudiologo_nome,usr.id as _user_id FROM tb_fonoaudiologo_paciente as fon_pac INNER JOIN tb_fonoaudiologo as fon
    ON  fon_pac.frg_fonoaudiologo=fon.id
    INNER JOIN tb_pessoa as pes ON fon.frg_pessoa=pes.id
    INNER JOIN tb_user usr ON fon.frg_user=usr.id
    WHERE fon_pac.frg_paciente=:idPaciente and fon_pac.flag_situacao=1";

    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        
        $stmt->bindParam(":idPaciente", $idPaciente);

        $stmt->execute();

        $fonoaudiologos = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return  $response->withJson($fonoaudiologos, 200)
        ->withHeader('Content-type', 'application/json');

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}


function getPacientesByFonoaudiologo(Request $request, Response $response) {
    $idFono = $request->getAttribute('idFono');
    
    $sql = "SELECT pac.id as id,pac.id_pessoa,
    pac.frg_user,
    pes.dsc_nome,
    pes.dat_nascimento,
    pes.dsc_cpf,
    pes.dsc_email,
    pes.dsc_endbairro,
    pes.dsc_endcep,
    pes.dsc_endnum,
    pes.dsc_endrua,
    pes.dsc_nomemae,
    pes.dsc_nomepai,
    pes.dsc_telefone1,
    pes.dsc_telefone2,
    pes.frg_cor,
    pes.frg_endestado,
    pes.frg_endcidade,
    pes.frg_estado_civil,
    pes.frg_nasestado,
    pes.frg_nascidade,
    pes.frg_sexo,
    pes.frg_tipo_sanguineo
    FROM tb_fonoaudiologo_paciente as fon_pac
    INNER JOIN tb_paciente as pac
    ON  fon_pac.frg_paciente=pac.id
    INNER JOIN tb_pessoa as pes ON pac.id_pessoa=pes.id
    INNER JOIN tb_user usr ON pac.frg_user=usr.id
    WHERE fon_pac.frg_fonoaudiologo=:idFono and fon_pac.flag_situacao=1";

    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        
        $stmt->bindParam("idFono", $idFono);

        $stmt->execute();

        $pacientes = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return  $response->withJson($pacientes, 200)
        ->withHeader('Content-type', 'application/json');

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}




function addFonoaudiologoPaciente(Request $request, Response $response){
    $fonoaudiologoPaciente = json_decode($request->getBody());
    
   
    $sql = "INSERT INTO tb_fonoaudiologo_paciente(frg_fonoaudiologo,frg_paciente,flag_situacao) 
                VALUES (:frg_fonoaudiologo,:frg_paciente,1)";
    
    

    $db = getConnection();
    try {
        
        $db->beginTransaction();

        $stmt = $db->prepare($sql);

        $stmt->bindParam("frg_fonoaudiologo", $fonoaudiologoPaciente->frg_fonoaudiologo);
        $stmt->bindParam("frg_paciente", $fonoaudiologoPaciente->frg_paciente);
       
        $stmt->execute();

        $db->commit();
        $db = null;

        return $response->withJson($fonoaudiologoPaciente, 201)
        ->withHeader('Content-type', 'application/json');

    } catch(PDOException $e) {
        $db->rollBack();
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function updateFonoaudiologoPaciente(Request $request, Response $response) {
    $fonoaudiologoPaciente = json_decode($request->getBody());

    $id = $request->getAttribute('id');
    
    $sql = "UPDATE tb_fonoaudiologo_paciente 
            SET 
            flag_situacao = :flag_situacao,

            WHERE id=:id";

    

        $db = getConnection();
    try {
        $db->beginTransaction();
        
        $stmt = $db->prepare($sql);
        
        $stmt->bindParam("flag_situacao", $fonoaudiologoPaciente->flag_situacao);
        $stmt->bindParam("id", $fonoaudiologoPaciente->id);
        

        $stmt->execute();

        $db->commit();
        $db = null;
        return $response->withJson($fonoaudiologoPaciente, 200)
        ->withHeader('Content-type', 'application/json');
    } catch(PDOException $e) {
        $db->rollBack();
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}   

// Catch-all route to serve a 404 Not Found page if none of the routes match
// NOTE: make sure this route is defined last
$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
    $handler = $this->notFoundHandler; // handle using the default Slim page not found handler
    return $handler($req, $res);
});


/*

        PUSHER

*/



  

function changeStatus(Request $request, Response $response){

    $options = array(
        'cluster' => 'us2',
        'useTLS' => true
      );
      $pusher = new Pusher\Pusher(
        '527a8eb84680c6505dbe',
        '6ec5dc6e5d200ce23fa7',
        '700073',
        $options
      );
      
    $status = json_decode($request->getBody());

    
    $data['status'] = $status->status;
    $pusher->trigger('status-channel', $status->userId, $data);

    changeStatusUsuario($status->userId,$status->status);

    return $response->withJson($status, 200)
        ->withHeader('Content-type', 'application/json');
}
/*______________________________________________________
|                                                       |
|                  Conecção com BD                      |
|______________________________________________________*/

function getConnection() {
    
    // $dbhost="127.0.0.1";
    // $dbuser="root";
    // $dbpass="";
    // $dbname="db_maisfono";

    $dbhost="jrpires.com";
    $dbuser="jrpiresc_ifpe";
    $dbpass="maisfono_0001";
    $dbname="jrpiresc_maisfono_rest";
    
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
}
