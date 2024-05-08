<?php

namespace App\Http\Controllers;
use App\Models\Conexiones;
use Illuminate\Http\Request;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
    public function obtenerUsuario(Request $request) {
        $usuario = $request->user();

        return response()->json($usuario);
    }
    public function obtenerUsuarioByID($id) {
    $usuario = User::find($id);
    return response()->json($usuario);
    }
    public function crearConexionRiotUsuario(Request $request){
        $usuario = $request->user();
        $conexion = new Conexiones();
        $conexion->id_user = $usuario->id;
        $conexion->riotID = $request->riotID;
        $conexion->juego = $request->juego;
        $conexion->rango = $request->rango;
        $conexion->posicion = $request->posicion;
        $conexion->save();
        return response("Riot User guardado con exito!",200);
    }
}
