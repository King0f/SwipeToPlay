<?php

namespace App\Http\Controllers;

use App\Models\Matches;
use App\Models\Mensajes;
use Illuminate\Http\Request;
use App\Models\Chat;

class ChatController extends Controller
{
    function obtenerMensajes($idChat){
        $mensajes = Mensajes::where("id_chat", $idChat)->orderBy("created_at", "asc")->get();
        return response()->json($mensajes);
    }
    function guardarMensaje(Request $request){
        $mensaje = new Mensajes();
        $mensaje->id_chat = $request->id_chat;
        $mensaje->id_usuario = $request->id_usuario;
        $mensaje->mensaje = $request->mensaje;
        $mensaje->save();
        return response("ok",200);
    }

}
