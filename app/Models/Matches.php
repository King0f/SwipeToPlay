<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tarjeta extends Model
{
    use HasFactory;
    protected $table = 'matches';

    //Primary key

    protected $primaryKey = 'id';

    public $timestamps = false;

    //campos

    protected $fillable = [
        'fecha',
        'id_user1',
        'id_user2',
        'id_juego'];
}
