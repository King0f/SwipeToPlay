<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Matches>
 */
class MatchesFactory extends Factory
{
    public function definition()
    {
        return [
            'id_user1' => $this->faker->numberBetween(1, 100),
            'id_user2' => $this->faker->numberBetween(1, 100),
            'id_juego' => $this->faker->numberBetween(1, 2)
        ];
    }
}
