<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ChatController;

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
Route::post('/login', [AuthController::class, 'loginUser']);
Route::get('/user', [Controller::class, 'obtenerUsuario'])->middleware('auth:sanctum');
Route::get('/user/{id}', [Controller::class, 'obtenerUsuarioByID']);
Route::post('/subirImagen', [AuthController::class, 'subirImagen']);
Route::post('/riotUser', [Controller::class, 'crearConexionRiotUsuario'])->middleware('auth:sanctum');
Route::get('/obtenerMensajes/{idChat}', [ChatController::class, 'obtenerMensajes']);
Route::post('/guardarMensaje', [ChatController::class, 'guardarMensaje']);
