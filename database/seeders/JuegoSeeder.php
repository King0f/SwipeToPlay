<?php

namespace Database\Seeders;

use App\Models\Juego;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JuegoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $juegos = [
            ['nombre' => 'League of Legends', 'rangos' =>  ["Hierro", "Bronce", "Plata", "Oro", "Platino","Esmeralda", "Diamante", "Master", "Grandmaster", "Challenger"]],
            ['nombre' => 'Valorant', 'rangos' =>  ["Hierro", "Bronce", "Plata", "Oro", "Platino","Esmeralda", "Diamante", "Inmortal", "Radiant"]]
        ];

        foreach ($juegos as $juego) {
            Juego::create([
                'nombre' => $juego['nombre'],
                'rangos' => $juego['rangos']
            ]);
        }
    }
}
