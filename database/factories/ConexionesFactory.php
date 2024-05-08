<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Conexiones>
 */
class ConexionesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // Determinar el juego primero
        $juego = $this->faker->randomElement(['Valorant', 'League of Legends']);

        // Asignar rangos y posiciones dependiendo del juego
        if ($juego == 'League of Legends') {
            $rango = $this->faker->randomElement(['Hierro', 'Bronce', 'Plata', 'Oro', 'Platino','Esmeralda', 'Diamante', 'Master', 'Grandmaster', 'Challenger']);
            $posicion = $this->faker->randomElement(['Top', 'Jungla', 'Medio', 'AD Carry', 'Soporte']);
        } elseif ($juego == 'Valorant') {
            $rango = $this->faker->randomElement(['Hierro', 'Bronce', 'Plata', 'Oro', 'Platino','Esmeralda', 'Diamante', 'Inmortal', 'Radiant']);
            $posicion = $this->faker->randomElement(['Duelista', 'Iniciador', 'Controlador', 'Centinela']);
        }

        return [
            'riotID' => $this->faker->userName(),
            'juego' => $juego,
            'rango' => $rango,
            'posicion' => $posicion,
            'id_user' => $this->faker->numberBetween(1, 100), // Supongamos que ya tienes 100 usuarios en la base de datos
        ];
    }

}
