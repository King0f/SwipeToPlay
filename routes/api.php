<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\SwipeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register', [AuthController::class, 'createUser']);
Route::post('/modUser', [AuthController::class, 'modUser'])->middleware('auth:sanctum');
Route::post('/login', [AuthController::class, 'loginUser']);
Route::get('/user', [Controller::class, 'obtenerUsuario'])->middleware('auth:sanctum');
Route::get('/userSwipe', [SwipeController::class, 'obtenerUsuarioSwipe'])->middleware('auth:sanctum');
Route::get('/user/{id}', [Controller::class, 'obtenerUsuarioByID']);
Route::get('/tarjetas', [AuthController::class, 'obtenerTarjetas'])->middleware('auth:sanctum');
Route::post('/newTarjeta', [AuthController::class, 'agregarTarjeta'])->middleware('auth:sanctum');
Route::post('/delTarjeta', [AuthController::class, 'eliminarTarjeta'])->middleware('auth:sanctum');
Route::post('/subirImagen', [AuthController::class, 'subirImagen'])->middleware('auth:sanctum');
Route::post('/riotUser', [Controller::class, 'crearConexionRiotUsuario'])->middleware('auth:sanctum');
Route::post('/modConexion', [Controller::class, 'modificarConexionRiotUsuario'])->middleware('auth:sanctum');
Route::get('/obtenerMensajes/{idChat}', [ChatController::class, 'obtenerMensajes']);
Route::get('/obtenerMatchPorChat/{idChat}', [ChatController::class, 'obtenerMatchPorChat']);
Route::post('/guardarMensaje', [ChatController::class, 'guardarMensaje'])->middleware('auth:sanctum');
Route::get('/obtenerChats', [ChatController::class, 'obtenerChats'])->middleware('auth:sanctum');
Route::get('/obtenerConexionLOL/{id}', [SwipeController::class, 'obtenerConexionLOL']);
Route::get('/obtenerConexionValorant/{id}', [SwipeController::class, 'obtenerConexionValorant']);
Route::get('/handlePass', [SwipeController::class, 'handlePass'])->middleware('auth:sanctum');
Route::post('/handleLike', [SwipeController::class, 'handleLike'])->middleware('auth:sanctum');
Route::get('/timerReset', [Controller::class, 'timerReset']);
Route::post('/procesarCompra', [Controller::class, 'procesarCompra'])->middleware('auth:sanctum');
Route::get('/obtenerMatches', [Controller::class, 'obtenerMatches'])->middleware('auth:sanctum');
Route::post('/delMatch', [Controller::class, 'eliminarMatch']);
Route::post('/modificarUsuario', [Controller::class, 'modificarUsuario'])->middleware('auth:sanctum');