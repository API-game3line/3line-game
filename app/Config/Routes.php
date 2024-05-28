<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->resource('user');

$routes->group('auth', function ($routes) {
     // Rutas para mostrar formularios
     $routes->get('register', 'Auth::showRegisterForm');
     $routes->get('login', 'Auth::showLoginForm');

    // Rutas para procesar formularios
    $routes->post('register', 'Auth::register');
    $routes->post('login', 'Auth::login');
    $routes->get('logout', 'Auth::logout');
});

$routes->group('game', function ($routes) {
    //rutas para mostrar contenido
    $routes->get('/','Game::index');
});



