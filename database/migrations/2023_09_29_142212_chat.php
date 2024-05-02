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
        Schema::create('chat', function (Blueprint $table) {
            $table->id()->primaryKey();
            $table->unsignedBigInteger('id_match');
            $table->unsignedBigInteger('id_user1');
            $table->unsignedBigInteger('id_user2');
            $table->timestamps();
            $table->foreign('id_match')->references('id')->on('matches');
            $table->foreign('id_user1')->references('id_user1')->on('matches');
            $table->foreign('id_user2')->references('id_user2')->on('matches');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat');
    }
};
