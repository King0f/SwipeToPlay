<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Conexiones;
use App\Models\Matches;
use Illuminate\Http\Request;
use App\Models\User;
use App\Service\WhatsAppService;

class SwipeController extends Controller
{
    private $token = 'EAAGHazWOFisBO3MhZBQZA8VMx8NSVHRtjXdEsZCtYs9KvQI9anSC7sL7BqVchtqRpaKktURX9aZClEymp9ILOuULwb8kzqcLkIqUnz1RAhHV5YVm8XCl0ia6LT2Cb9owfAvrCVJJgaEeB3KPoI3NUDM29SQErJ2rTugZCAoFoEep4XCSkftGq98KXtOo1Owr4HqwGUDEEP1SeBbrOD64uBIDoY5E1TZCok90YZD';
    
    private $url = 'https://graph.facebook.com/v18.0/239082649298144/messages';

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
            $this->mandarWhatssap($usuario, $userSwipe);
        }else{
            $match = Matches::where('id_user1', $userSwipe->id)->where('usuario_esperado', $usuario->id)->first();
            if ($match){
                $match->id_user2 = $usuario->id;
                $match->usuario_esperado = null;
                $match->save();
                $chat = new Chat();
                $chat->id_match = $match->id;
                $chat->save();
                $this->mandarWhatssap($usuario, $userSwipe);
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

    function mandarWhatssap($usuario, $usuario2){
        $whatsAppService = new WhatsAppService($this->token, $this->url);
        $datosDinamicos = [
            "name" => $usuario->username,
            "name2" => $usuario2->username
        ];
        $whatsAppService->enviarMensaje($usuario->phone, 'swipe', 'es', $datosDinamicos);
        $datosDinamicos2 = [
            "name2" => $usuario2->username,
            "name" => $usuario->username
        ];
        $whatsAppService->enviarMensaje($usuario2->phone, 'swipe', 'es', $datosDinamicos2);
    }
}
