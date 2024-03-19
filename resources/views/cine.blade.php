<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>CINE</title>
        @viteReactRefresh
        @vite('resources/js/cine/main.jsx')
    </head>
    <body >
        <div id='root'></div>
    </body>
</html>
