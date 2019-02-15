<?php

use Slim\Http\Request;
use Slim\Http\Response;

$app->group('/pusher',function() use ($app){
    $app->post('/',"changeStatus");
});
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
    $app->get('/idPaciente/{idPaciente}/idFono/{idFonoaudiologo}', 'getEvolucoes');
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
    $app->get('/notIdPaciente/{notIdPaciente}', 'getFonoaudiologosNotPaciente');
    $app->get('/', 'getFonoaudiologos');
    $app->get('/{id}', 'getFonoaudiologo');
    $app->get('/idUser/{idUser}', 'getFonoaudiologoByUser');
    
    $app->post('', 'addFonoaudiologo');
    $app->put('/{id}', 'updateFonoaudiologo');
    $app->delete('/{id}', 'deleteFonoaudiologo');
});

/*______________________________________________________
|                                                       |
|               Route's - FonoaudiologoPaciente         |
|______________________________________________________*/
$app->group('/fonoaudiologosPacientes', function () use ($app) {
    $app->get('/idFono/{idFono}', 'getPacientesByFonoaudiologo');
    $app->get('/idPaciente/{idPaciente}', 'getFonoaudiologosByPaciente');
    
    $app->post('', 'addFonoaudiologoPaciente');
    $app->put('/{id}', 'updateFonoaudiologoPaciente');
});


/*______________________________________________________
|                                                       |
|               Route's - PacienteFonoaudiologo         |
|______________________________________________________*/
$app->group('/pacientesFonoaudiologos', function () use ($app) {
    $app->get('/{id}', 'getPacienteByFonoaudiologo');
});


/*______________________________________________________
|                                                       |
|                 Route's - Paciente                    |
|______________________________________________________*/
$app->group('/pacientes', function () use ($app) {
    $app->get('/', 'getPacientes');
    $app->get('/{id}', 'getPaciente');
    $app->get('/idUser/{idUser}', 'getPacienteByUser');
    $app->post('', 'addPacientes');
    $app->put('/{id}', 'updatePaciente');
    $app->delete('/{id}', 'deletePaciente');
});


/*______________________________________________________
|                                                       |
|           Route's - Dashboard - Marcações             |
|______________________________________________________*/
$app->group('/fonoaudiologoDashMarcacoes', function () use ($app) {
    $app->get('/{id}', 'getSumDashMarcacoes');
});

/*______________________________________________________
|                                                       |
|     Route's - Dashboard - Marcações - Paciente        |
|______________________________________________________*/
$app->group('/fonoaudiologoDashMarcacoesPaciente', function () use ($app) {
    $app->get('/{id}/{idPaciente}', 'getSumDashMarcacoesPaciente');
});

/*______________________________________________________
|                                                       |
|           Route's - Dashboard - Marcações             |
|______________________________________________________*/
$app->group('/fonoaudiologoDashAgenda', function () use ($app) {
    $app->get('/{id}', 'getDashAgenda');
});


/*______________________________________________________
|                                                       |
|        Route's - Fonoaudiologo - Calendário           |
|______________________________________________________*/
$app->group('/fonoaudiologoCalendario', function () use ($app) {
    $app->get('/{id}', 'getCalendario');
    $app->get('/idFono/{idFono}', 'getCalendario');
    $app->get('/idPaciente/{idPaciente}', 'getCalendarioByPaciente');
});

/*______________________________________________________
|                                                       |
|         Route's - Fonoaudiologo - Agenda              |
|______________________________________________________*/
$app->group('/fonoaudiologoAgenda', function () use ($app) {
    $app->get('/idFono/{idFono}', 'getCalendarAgenda');
    $app->post('', 'addAgenda');
    $app->put('/{id}', 'updateAgenda');
    
});

/*______________________________________________________
|                                                       |
|  Route's - Fonoaudiologo - Agenda - Disponibilidade   |
|______________________________________________________*/
$app->group('/fonoaudiologoDisponibilidade', function () use ($app) {
    $app->get('/idFono/{idFono}', 'getCalendarDisponibilidade');
    $app->post('', 'addDisponibilidade');
});

});

$app->get('/[{name}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});

