<?php
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

// Run app
$app->run();

$corsOptions = array(
    "origin" => "*",
    "exposeHeaders" => array("Content-Type", "X-Requested-With", "X-authentication", "X-client"),
    "allowMethods" => array('GET', 'POST', 'PUT', 'DELETE', 'OPTIONS')
);
$cors = new \CorsSlim\CorsSlim($corsOptions);

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

function getFonoaudiologos($response) {
    $sql = "SELECT * FROM tb_pessoa p 
            INNER JOIN tb_fonoaudiologo f 
            ON p.id = f.frg_pessoa";

    try {
        $stmt = getConnection()->query($sql);
        $fonoaudiologos = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
		
        return json_encode($fonoaudiologos, JSON_UNESCAPED_UNICODE);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

/*______________________________________________________
|                                                       |
|                 RESTS's - Paciente                    |
|______________________________________________________*/


function getPacientes($response) {
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


/*______________________________________________________
|                                                       |
|                  Conecção com BD                      |
|______________________________________________________*/

function getConnection() {
    //  $dbhost="127.0.0.1";
    //  $dbuser="root";
    //  $dbpass="";
    //  $dbname="db_maisfono";
    $dbhost="jrpires.com";
    $dbuser="jrpiresc_ifpe";
    $dbpass="maisfono_0001";
    $dbname="jrpiresc_maisfono_rest";
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
}