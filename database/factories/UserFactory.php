<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
     /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $lvl_premium = $this->faker->randomElement([0, 1, 2]);

        // Asignamos desplazamientos en base al nivel premium
        $desplazamientos = 0;
        $n_mensajes = 0;
        if ($lvl_premium == 0) {
            $desplazamientos = 10;
            $n_mensajes = 25;
        } elseif ($lvl_premium == 1) {
            $desplazamientos = 25;
            $n_mensajes = 100;
        } elseif ($lvl_premium == 2) {
            $desplazamientos = 0;
            $n_mensajes = 0;
        }

        // Lista de números de teléfono
        $phoneNumbers = ['+34606718811', '+34622903672', '+34636438666'];

        return [
            'email' => $this->faker->unique()->safeEmail(),
            'username' => $this->faker->userName(),
            'password' => Hash::make('12345678'),  // Asegurarse que las contraseñas están hasheadas
            'lvl_premium' => $lvl_premium,
            'desplazamientos' => $desplazamientos,
            'n_mensajes' => $n_mensajes,
            'imagen' => null,
            'likes' => $this->faker->numberBetween(1, 999),  // Dejar el campo de imagen vacío
            'phone' => $this->faker->randomElement($phoneNumbers),  // Teléfono aleatorio
            'descripcion' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lectus tellus, viverra non cursus sit amet, pretium quis elit. Sed et risus nibh. Fusce ligula lectus.'
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
