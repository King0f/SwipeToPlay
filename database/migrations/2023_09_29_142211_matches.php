<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->id()->primaryKey();
            $table->date('fecha');
            $table->unsignedBigInteger('id_user1');
            $table->foreign('id_user1')->references('id')->on('users');
            $table->unsignedBigInteger('id_user2');
            $table->foreign('id_user2')->references('id')->on('users');
            $table->unsignedBigInteger('id_juego');
            $table->foreign('id_juego')->references('id')->on('juego');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
