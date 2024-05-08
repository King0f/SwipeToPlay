<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chat>
 */
class ChatFactory extends Factory
{
    public function definition()
    {
        return [
            'id_match' => $this->faker->numberBetween(1, 100)
        ];
    }
}
