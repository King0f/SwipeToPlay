<?php

namespace App\Http\Controllers;

use App\Models\Conexiones;
use Illuminate\Http\Request;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Matches;
use Illuminate\Support\Facades\DB;
use App\Models\Chat;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
    public function obtenerUsuario(Request $request)
    {
        $usuario = $request->user();

        return response()->json($usuario);
    }
    public function modificarUsuario(Request $request)
    {
        $usuario = $request->user();
        $usuario->username = $request->input('username');
        $usuario->email = $request->input('email');
        $usuario->phone = $request->input('phone');
        $usuario->descripcion = $request->input('descripcion');
        $usuario->save();
        return response()->json($usuario);
    }
    public function obtenerUsuarioByID($id)
    {
        $usuario = User::find($id);
        return response()->json($usuario);
    }
    public function crearConexionRiotUsuario(Request $request)
    {
        $usuario = $request->user();
        $conexion = new Conexiones();
        $conexion->id_user = $usuario->id;
        $conexion->riotID = $request->riotID;
        $conexion->juego = $request->juego;
        $conexion->rango = $request->rango;
        $conexion->posicion = $request->posicion;
        $conexion->save();
        return response("Riot User guardado con exito!", 200);
    }
    public function modificarConexionRiotUsuario(Request $request)
    {
        $conexion = Conexiones::find($request->id);
        $conexion->riotID = $request->riotID;
        $conexion->juego = $request->juego;
        $conexion->rango = $request->rango;
        $conexion->posicion = $request->posicion;
        $conexion->save();

        return response("Conexión modificada con exito!", 200);
    }
    public function timerReset()
    {
        $eventInfo = DB::select("SELECT LAST_EXECUTED FROM information_schema.EVENTS WHERE EVENT_SCHEMA = 'swipetoplay' AND EVENT_NAME = 'reset_desplazamientos'");
        return response()->json($eventInfo);
    }
    public function procesarCompra(Request $request)
    {
        $usuario = $request->user();
        if ($request->input('action') == 1) {
            $usuario->lvl_premium = 1;
            $usuario->desplazamientos = 25;
            $usuario->superlikes = 1;
            $usuario->n_mensajes = 100;
            $usuario->save();
            return response()->json($usuario);
        } elseif ($request->input('action') == 2) {
            $usuario->lvl_premium = 2;
            $usuario->desplazamientos = 0;
            $usuario->superlikes = 0;
            $usuario->n_mensajes = 0;
            $usuario->save();
            return response()->json($usuario);
        }
    }

    public function obtenerMatches(Request $request)
    {
        $idUser = $request->user()->id;

        // Construir la consulta
        $matches = Matches::where(function ($query) use ($idUser) {
            $query->where('id_user1', $idUser)
                ->whereNotNull('id_user2');
        })->orWhere('id_user2', $idUser)->get();

        return response()->json($matches);
    }
    public function eliminarMatch(Request $request)
    {
        $chat = Chat::where('id_match', $request->input('id'));
        $chat->delete();
        $match = Matches::where('id', $request->input('id'));
        $match->delete();
        return response()->json(["Mensaje" => "Match eliminado correctamente."]);
    }
}
