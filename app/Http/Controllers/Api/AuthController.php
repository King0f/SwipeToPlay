<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Tarjeta;
use Illuminate\Support\Facades\Storage;


class AuthController extends Controller
{
    /**
     * Create User
     * @param Request $request
     * @return User
     */
    public function createUser(Request $request)
    {
        try {
            //Validated
            $validateUser = Validator::make(
                $request->all(),
                [
                    'username' => 'required|string|max:255',
                    'email' => 'required|string|email|max:255|unique:users',
                    'password' => 'required|string|min:8',
                ]
            );

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $user = User::create([
                'username' => $request->username,
                'lvl_premium' => 0,
                'desplazamientos' => 10,
                'n_mensajes' => 25,
                'likes' => 0,
                'superlikes' => 0,
                'phone' => $request->phone,
                'imagen' => null,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'descripcion' => 'Esto es una descripcion de ejemplo, modifícala desde tu perfil!',
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Usuario creado con exito!!',
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    public function modificarUser(Request $request)
    {
        $usuario = $request->user();
        $usuario->username = $request->username;
        $usuario->email = $request->email;
        $usuario->phone = $request->phone;
        $usuario->descripcion = $request->descripcion;
        $usuario->save();

        return response("Usuario modificado con exito!", 200);
    }
    public function subirImagen(Request $request)
    {
        try {
            $user = $request->user();
            $oldImagePath = str_replace('../storage/', 'public/', $user->imagen);
            $dateTime = (new \DateTime())->format('Ymd_His');
            $request->validate([
                'file' => 'required|image'
            ]);
            $path = $request->file('file')->storeAs(
                'public/imagenes',
                $user->id . "_" . $dateTime . '.' . $request->file('file')->getClientOriginalExtension()
            );
            $user->imagen = str_replace('public/', '../storage/', $path);
            $user->save();

            if ($oldImagePath && Storage::exists($oldImagePath)) {
                Storage::delete($oldImagePath);
            }

            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    /**
     * Login The User
     * @param Request $request
     * @return User
     */
    public function loginUser(Request $request)
    {
        try {
            $validateUser = Validator::make(
                $request->all(),
                [
                    'email' => 'required|email',
                    'password' => 'required'
                ]
            );

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password does not match with our record.',
                ], 401);
            }

            $user = User::where('email', $request->email)->first();

            return response()->json([
                'status' => true,
                'message' => 'Usuario logeado con exito!',
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    public function obtenerTarjetas(Request $request)
    {
        $usuario = $request->user();
        $tarjetas = $usuario->tarjeta;

        return response()->json($tarjetas);
    }
    public function agregarTarjeta(Request $request)
    {
        $usuario = $request->user();
        $tarjeta = Tarjeta::create([
            'titular' => $request->input("titular"),
            'n_tarjeta' => $request->input("n_tarjeta"),
            'f_caducidad' => $request->input("f_caducidad"),
            'cvv' => $request->input("cvv"),
            'id_cliente' => $usuario->id
        ]);
        $tarjeta->save();

        return response()->json($tarjeta);
    }
    public function eliminarTarjeta(Request $request)
    {
        $usuario = $request->user();
        $reserva = Tarjeta::where('id_cliente', $usuario->id)->where('id', $request->id)->first();

        // Verificar si la reserva existe
        if (!$reserva) {
            return response()->json(["Mensaje" => "La reserva no existe."], 404);
        }

        // Eliminar la reserva
        $reserva->delete();

        return response()->json(["Mensaje" => "Reserva eliminada correctamente."]);
    }
}
