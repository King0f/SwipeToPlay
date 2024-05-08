<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conexiones extends Model
{
    use HasFactory;
    protected $table = 'conexiones';

    //Primary key

    protected $primaryKey = 'id';

    public $timestamps = false;

    //campos

    protected $fillable = [
        'riotID',
        'juego',
        'rango',
        'posicion',
        'id_user'];
}
