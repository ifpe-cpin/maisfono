<?php

use Slim\Http\Request;
use Slim\Http\Response;


$app->group('/v1', function () use ($app) {
// Routes
// API group

/*______________________________________________________
|                                                       |
|                Route's - Usuário                      |
|______________________________________________________*/
$app->group('/usuarios', function () use ($app) {
    $app->get('/', 'getUsuarios');
    $app->get('/{id}', 'getUsuario');
    $app->post('', 'addUsuario');
    $app->put('/{id}', 'updateUsuario');
});


/*______________________________________________________
|                                                       |
|                Route's - Evolução                     |
|______________________________________________________*/
$app->group('/evolucoes', function () use ($app) {
    $app->get('/{idPaciente}/{idFonoaudiologo}', 'getEvolucoes');
    $app->get('/{id}', 'getEvolucao');
    $app->post('', 'addEvolucao');
    $app->put('/{id}', 'updateEvolucao');
    $app->delete('/{id}', 'deleteEvolucao');
});


/*______________________________________________________
|                                                       |
|               Route's - Fonoaudiologo                 |
|______________________________________________________*/
$app->group('/fonoaudiologos', function () use ($app) {
    $app->get('/', 'getFonoaudiologos');
    $app->get('/{id}', 'getFonoaudiologo');
    $app->post('', 'addFonoaudiologo');
    $app->put('/{id}', 'updateFonoaudiologo');
    $app->delete('/{id}', 'deleteFonoaudiologo');
});


/*______________________________________________________
|                                                       |
|                 Route's - Paciente                    |
|______________________________________________________*/
$app->group('/paciente', function () use ($app) {
    $app->get('/pacientes', 'getPacientes');
    $app->get('/paciente/{id}', 'getPaciente');
    $app->post('/create', 'addPaciente');
    $app->put('/update/{id}', 'updatePaciente');
    $app->delete('/delete/{id}', 'deletePaciente');
});

});


$app->get('/[{name}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});

