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
        Schema::create('mensajes', function (Blueprint $table) {
            $table->id()->primaryKey();
            $table->unsignedBigInteger('id_chat');
            $table->unsignedBigInteger('id_usuario');
            $table->string('mensaje');
            $table->timestamps(); 
            $table->foreign('id_chat')->references('id')->on('chat');
            $table->foreign('id_usuario')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
