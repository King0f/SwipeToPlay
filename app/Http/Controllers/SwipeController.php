<?php

namespace App\Http\Controllers;

use App\Mail\SwipeMail;
use App\Models\Chat;
use App\Models\Conexiones;
use App\Models\Matches;
use DateTime;
use Illuminate\Http\Request;
use App\Models\User;
use App\Service\WhatsAppService;
use Illuminate\Support\Facades\Mail;

class SwipeController extends Controller
{
    private $token = 'EAAGHazWOFisBO0Ecbn2vTTee4nLNCaweJ8DeDY1gGaJiM9OJBuXIlklju0ByYTKsFsqMJG1V5trwzUEn8tLLZAUIJzSJ7WJ98IOkofV50ZB7DPhPZCdxFZCEmaxARJeUtVZB4CUqghxdUDcXworNDaxV5b1T9YqO4b5BXwL6ZAvUPtPgjZAgOM5qi5oRnegH4ZABFXotboSMR0UomMslcFimkf9DAFZABdgtGviwZD';
    
    private $url = 'https://graph.facebook.com/v18.0/239082649298144/messages';

    private $token2 = '';

    private $url2 = 'https://api.brevo.com/v3/smtp/email';

    function obtenerUsuarioSwipe(Request $request){
        $userId = $request->user()->id;
        $usuariosSwipe = $request->input('usersSwipe', []);
    
        // Cuenta todos los usuarios, excluyendo el usuario actual
        $totalUsuarios = User::where('id', '!=', $userId)->count();
    
        if ($totalUsuarios == 0) {
            return response()->json(['error' => 'No hay usuarios disponibles'], 404);
        }
    
        if ($totalUsuarios <= 10) {
            // Si hay 10 o menos usuarios disponibles, devuelve todos excepto el usuario actual
            $usuarios = User::where('id', '!=', $userId)
                            ->whereNotIn('id', $usuariosSwipe)
                            ->get();
    
            return response()->json($usuarios);
        }
        $usuariosAleatorios = [];
        $intentos = 0;
        while (count($usuariosAleatorios) < 10 && $intentos < 100) {
            $randomIndex = rand(0, $totalUsuarios - 1); 
            $usuarioAleatorio = User::skip($randomIndex)
                                    ->where('id', '!=', $userId)
                                    ->whereNotIn('id', $usuariosSwipe)
                                    ->first();
    
            if ($usuarioAleatorio && !in_array($usuarioAleatorio->id, array_column($usuariosAleatorios, 'id'))) {
                $usuariosAleatorios[] = $usuarioAleatorio;
            }
            $intentos++;
        }
        if (count($usuariosAleatorios) < 10) {
            return response()->json(['error' => 'No se pudieron encontrar suficientes usuarios únicos'], 500);
        }
        return response()->json($usuariosAleatorios); 
    }

    function obtenerConexionLOL($id){
        $conexion = Conexiones::where('id_user',$id)->where('juego', 'League of Legends')->first();
        if ($conexion){
            return response()->json($conexion);
        }else{
            return response()->json(['mensaje' => 'No existe ninguna cuenta de League of Legends guardada en el sistema para este usuario']);
        }
    }

    function obtenerConexion($id){
        $conexion = Conexiones::where('id_user', $id)->inRandomOrder()->first();
        if ($conexion) {
            // Si hay una conexión, devuelve esa conexión en formato JSON
            return response()->json($conexion);
        } else {
            // Si no hay conexiones, devuelve un mensaje indicando el problema
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
            $fecha = new DateTime();
                $meses = [
                    1 => 'Enero', 2 => 'Febrero', 3 => 'Marzo', 4 => 'Abril',
                    5 => 'Mayo', 6 => 'Junio', 7 => 'Julio', 8 => 'Agosto',
                    9 => 'Septiembre', 10 => 'Octubre', 11 => 'Noviembre', 12 => 'Diciembre'
                ];
                $numeroMes = (int)$fecha->format('m');
                $nombreMes = $meses[$numeroMes];
                $formatoFecha = 'Día ' . $fecha->format('d') . ' de ' . $nombreMes . ' de ' . $fecha->format('Y');
            if($match->id_juego == 1){
                $juego = 'League of Legends';
            }else{
                $juego = 'Valorant';
            }
            $informacionAdicional = [
                'fecha' => $formatoFecha,
                'juego' => $juego,
            ];
            if ($usuario->lvl_premium == 2){
                $this->mandarWhatssap($usuario, $userSwipe);
                Mail::to($usuario->email)->send(new SwipeMail($userSwipe, $informacionAdicional));
                Mail::to($userSwipe->email)->send(new SwipeMail($usuario, $informacionAdicional));
            }
        }else{
            $match = Matches::where('id_user1', $userSwipe->id)->where('usuario_esperado', $usuario->id)->first();
            if ($match){
                $match->id_user2 = $usuario->id;
                $match->usuario_esperado = null;
                $match->save();
                $chat = new Chat();
                $chat->id_match = $match->id;
                $chat->save();
                $fecha = new DateTime();
                $meses = [
                    1 => 'Enero', 2 => 'Febrero', 3 => 'Marzo', 4 => 'Abril',
                    5 => 'Mayo', 6 => 'Junio', 7 => 'Julio', 8 => 'Agosto',
                    9 => 'Septiembre', 10 => 'Octubre', 11 => 'Noviembre', 12 => 'Diciembre'
                ];
                $numeroMes = (int)$fecha->format('m');
                $nombreMes = $meses[$numeroMes];
                $formatoFecha = 'Día ' . $fecha->format('d') . ' de ' . $nombreMes . ' de ' . $fecha->format('Y');
                if($match->id_juego == 1){
                    $juego = 'League of Legends';
                }else{
                    $juego = 'Valorant';
                }
                $informacionAdicional = [
                    'fecha' => $formatoFecha,
                    'juego' => $juego,
                ];

                if ($usuario->lvl_premium == 2){
                    $this->mandarWhatssap($usuario, $userSwipe);
                    Mail::to($usuario->email)->send(new SwipeMail($userSwipe, $informacionAdicional));
                    Mail::to($userSwipe->email)->send(new SwipeMail($usuario, $informacionAdicional));
                }

            }else{
                $match = new Matches();
                $match->id_user1 = $usuario->id;
                $match->usuario_esperado = $userSwipe->id;
                $match->id_juego = $request->juego;
                $match->save();
            }
        }
        return response()->json($usuario);
    }
    function handleSuperlike(Request $request){
        $usuario = $request->user();
        $usuario->superlikes = $usuario->superlikes - 1;
        $usuario->save();
        $userSwipe = User::where('id', $request->idUser)->first();
        $userSwipe->likes = $userSwipe->likes + 1;
        $userSwipe->save();
        $match = new Matches();
        $match->id_user1 = $usuario->id;
        $match->id_user2 = $userSwipe->id;
        $match->id_juego = $request->juego;
        $match->save();
        $fecha = new DateTime();
        $meses = [
        1 => 'Enero', 2 => 'Febrero', 3 => 'Marzo', 4 => 'Abril',
        5 => 'Mayo', 6 => 'Junio', 7 => 'Julio', 8 => 'Agosto',
        9 => 'Septiembre', 10 => 'Octubre', 11 => 'Noviembre', 12 => 'Diciembre'
        ];
                $numeroMes = (int)$fecha->format('m');
                $nombreMes = $meses[$numeroMes];
                $formatoFecha = 'Día ' . $fecha->format('d') . ' de ' . $nombreMes . ' de ' . $fecha->format('Y');
                if($match->id_juego == 1){
                    $juego = 'League of Legends';
                }else{
                    $juego = 'Valorant';
                }
                $informacionAdicional = [
                    'fecha' => $formatoFecha,
                    'juego' => $juego,
                ];
        $chat = new Chat();
        $chat->id_match = $match->id;
        $chat->save();
        if ($usuario->lvl_premium == 2){
            /* $this->mandarWhatssap($usuario, $userSwipe); */
            Mail::to($usuario->email)->send(new SwipeMail($userSwipe, $informacionAdicional));
            Mail::to($userSwipe->email)->send(new SwipeMail($usuario, $informacionAdicional));
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