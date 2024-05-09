<?php

namespace App\Http\Controllers;

use App\Models\Conexiones;
use Illuminate\Http\Request;
use App\Models\User;

class SwipeController extends Controller
{
    function obtenerUsuarioSwipe(Request $request){
        // Cuenta todos los usuarios
        $totalUsuarios = User::count();

        if ($totalUsuarios == 0) {
            return response()->json(['error' => 'No hay usuarios disponibles'], 404);
        }

        $randomIndex = rand(1, $totalUsuarios) - 1; 
        $usuarioAleatorio = User::skip($randomIndex)->first();

        // Devuelve el usuario aleatorio
        return response()->json($usuarioAleatorio); 
    }

    function obtenerConexionLOL($id){
        $conexion = Conexiones::where('id_user',$id)->where('juego', 'League of Legends')->first();
        if ($conexion){
            return response()->json($conexion);
        }else{
            return response()->json(['mensaje' => 'No existe ninguna cuenta de League of Legends guardada en el sistema para este usuario']);
        }
    }

    function obtenerConexionValorant($id){
        $conexion = Conexiones::where('id_user',$id)->where('juego', 'Valorant')->first();
        if ($conexion){
            return response()->json($conexion);
        }else{
            return response()->json(['mensaje' => 'No existe ninguna cuenta de Valorant guardada en el sistema para este usuario']);
        }
    }

    function handleLike(Request $request){
    }

    function handlePass(Request $request){
        $usuario = $request->user();
        $usuario->desplazamientos = $usuario->desplazamientos - 1;
        $usuario->save();
        return response()->json($usuario);
    }
}
