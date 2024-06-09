<?php

namespace App\Http\Controllers;

use App\Models\Matches;
use App\Models\Mensajes;
use Illuminate\Http\Request;
use App\Models\Chat;


class ChatController extends Controller
{
    function obtenerMensajes($idChat)
    {
        $mensajes = Mensajes::where("id_chat", $idChat)->orderBy("created_at", "desc")->get();
        return response()->json($mensajes);
    }
    function guardarMensaje(Request $request)
    {
        $mensaje = new Mensajes();
        $mensaje->id_chat = $request->id_chat;
        $mensaje->id_usuario = $request->id_usuario;
        $mensaje->mensaje = $request->mensaje;
        $mensaje->username = $request->username;
        $mensaje->save();
        $usuario = $request->user();
        $usuario->n_mensajes = $usuario->n_mensajes - 1;
        $usuario->save();
        return response("ok", 200);
    }

    function obtenerChats(Request $request)
    {
        $userId = $request->user()->id;
        $matches = Matches::where(function ($query) use ($userId) {
            $query->where('id_user1', $userId)
                ->whereNotNull('id_user2');
        })->orWhere(function ($query) use ($userId) {
            $query->where('id_user2', $userId)
                ->whereNotNull('id_user1');
        })->get();
        $chats = [];
        foreach ($matches as $match) {
            $chat = Chat::where("id_match", $match->id)->first();
            if ($chat) {
                $chats[] = $chat;
            }
        }
        return response()->json($chats);
    }
    function obtenerMatchPorChat($idChat)
    {
        $chat = Chat::where("id", $idChat)->first();
        $match = Matches::where("id", $chat->id_match)->first();
        return response()->json($match);
    }

}
