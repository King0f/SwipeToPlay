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
        $mensaje->username = $request->username;
        $mensaje->save();
        return response("ok",200);
    }

    function obtenerChats(Request $request){
        $matches = Matches::where('id_user1', $request->user()->id)
                      ->orWhere('id_user2', $request->user()->id)
                      ->get();
        $chats = [];
        foreach($matches as $match){
            $chat = Chat::where("id_match", $match->id)->first();
            $chats [] = $chat;
        }
        return response()->json($chats);   
    }

}
