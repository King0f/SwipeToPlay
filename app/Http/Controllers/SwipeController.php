<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Conexiones;
use App\Models\Matches;
use Illuminate\Http\Request;
use App\Models\User;

class SwipeController extends Controller
{
    function obtenerUsuarioSwipe(Request $request){
        $userId = $request->user()->id;
        // Cuenta todos los usuarios
        $totalUsuarios = User::count();

        if ($totalUsuarios == 0) {
            return response()->json(['error' => 'No hay usuarios disponibles'], 404);
        }

        $randomIndex = rand(1, $totalUsuarios) - 1; 
        $usuarioAleatorio = User::skip($randomIndex)->whereNot("id",$userId)->first();

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
        $usuario = $request->user();
        $usuario->desplazamientos = $usuario->desplazamientos - 1;
        $usuario->save();
        $userSwipe = User::where('id', $request->idUser)->first();
        $userSwipe->likes = $userSwipe->likes + 1;
        $userSwipe->save();
        $match = Matches::where('id_user1', $usuario->id)->where('usuario_esperado', $userSwipe->id)->first();
        if ($match){
            $match->id_user2 = $userSwipe->id;
            $match->usuario_esperado = null;
            $match->save();
            $chat = new Chat();
            $chat->id_match = $match->id;
            $chat->save();
        }else{
            $match = Matches::where('id_user1', $userSwipe->id)->where('usuario_esperado', $usuario->id)->first();
            if ($match){
                $match->id_user2 = $usuario->id;
                $match->usuario_esperado = null;
                $match->save();
                $chat = new Chat();
                $chat->id_match = $match->id;
                $chat->save();
            }else{
                $match = new Matches();
                $match->id_user1 = $usuario->id;
                $match->usuario_esperado = $userSwipe->id;
                $match->id_juego = 1;
                $match->save();
            }
        }
        return response()->json($usuario);
    }

    function handlePass(Request $request){
        $usuario = $request->user();
        $usuario->desplazamientos = $usuario->desplazamientos - 1;
        $usuario->save();
        return response()->json($usuario);
    }
}
