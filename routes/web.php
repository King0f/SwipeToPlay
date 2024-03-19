<?php

use App\Mail\ReservaMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/restaurante', function () {
    return view('restaurante');
})->name('restaurante');

Route::get('/cine', function () {
    return view('cine');
})->name('cine');

Route::get('/enviarCorreo', function () {
    $destinatario = 'javier.ruiz@doc.medac.es';
    Mail::to($destinatario)->send(new ReservaMail());
});

Route::get('/redis', function () {
  
    $redis = Redis::connection();

    $redis->hset('user:1', 'id', '1');
    $redis->hset('user:1', 'name', 'Ugarte');

    // Get all values of the hash
    $values = $redis->hgetall('user:1');

    print_r($values);
    
});