<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes
// API group
/*______________________________________________________
|                                                       |
|                Route's - Evolução                     |
|______________________________________________________*/
$app->group('/evolucao', function () use ($app) {
    $app->get('/evolucoes/{idPaciente}/{idFonoaudiologo}', 'getEvolucoes');
    $app->get('/evolucao/{id}', 'getEvolucao');
    $app->post('/create', 'addEvolucao');
    $app->put('/update/{id}', 'updateEvolucao');
    $app->delete('/delete/{id}', 'deleteEvolucao');
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


$app->get('/[{name}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
