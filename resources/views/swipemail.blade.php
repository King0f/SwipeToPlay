<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Match Realizado!</title>
    <style>
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color:#f87171;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #f55d5d;
        }
        .center {
            text-align: center;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            background-color:#f87171;
            color: white;
            border-top: 1px solid #ddd;
        }
        .footer a {
            color: white;
            text-decoration: none;
            font-weight: bold;
        }
    </style>
</head>
<body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
    <div style="max-width: 800px; margin: auto; background-color: #ffffff; padding: 20px; border: 1px solid #ddd; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <h2 style="color: #f87171; text-align: center;">Match Realizado!</h2>
        <p style="text-align: center;">Usted ha realizado Match con uno de los usuarios de nuestra página!</p>
        <h2 style="color: #f87171; text-align: center;">Datos del Match:</h2>
        <ul style="list-style-type: none; padding: 0;">
            <li style="margin-bottom: 10px; text-align: center;"><b>Usuario con el que realizó match:</b> {{ $usuario['username'] }}</li>
            <li style="margin-bottom: 10px; text-align: center;"><b>Fecha a la que se realizó: </b>{{ $informacionAdicional['fecha']}}</li>
            <li style="margin-bottom: 10px; text-align: center;"><b>Juego en el que se realizó: </b>{{ $informacionAdicional['juego']}}</li>
        </ul>
        <h2 style="color: #f87171; text-align: center;">Clicka aquí para ir a la página y empezar a chatear:</h2>
        <div class="center">
            <a href="https://proyecto5.medacarena.com.es/swipetoplay" class="button">Ir a la página</a>
        </div>
    </div>
    <div class="footer">
        <p>&copy; Swipe To Play 2024. Todos los derechos reservados.</p>
    </div>
</body>
</html>