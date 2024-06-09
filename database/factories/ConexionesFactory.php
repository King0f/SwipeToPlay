<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Conexiones>
 */
class ConexionesFactory extends Factory
{
    protected static $userId = 1;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $juego = $this->faker->randomElement(['Valorant', 'League of Legends']);
        if ($juego == 'League of Legends') {
            $rango = $this->faker->randomElement(['Hierro', 'Bronce', 'Plata', 'Oro', 'Platino', 'Esmeralda', 'Diamante', 'Master', 'Grandmaster', 'Challenger']);
            $posicion = $this->faker->randomElement(['Top', 'Jungla', 'Medio', 'AD Carry', 'Soporte']);
        } elseif ($juego == 'Valorant') {
            $rango = $this->faker->randomElement(['Hierro', 'Bronce', 'Plata', 'Oro', 'Platino', 'Esmeralda', 'Diamante', 'Inmortal', 'Radiant']);
            $posicion = $this->faker->randomElement(['Duelista', 'Iniciador', 'Controlador', 'Centinela']);
        }
        
        $id_user = static::$userId;
        static::$userId = static::$userId < 100 ? static::$userId + 1 : 1;

        return [
            'riotID' => $this->faker->userName(),
            'juego' => $juego,
            'rango' => $rango,
            'posicion' => $posicion,
            'id_user' => $id_user,
        ];
    }
}
