<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tarjeta extends Model
{
    use HasFactory;
    protected $table = 'juego';

    //Primary key

    protected $primaryKey = 'id';

    public $timestamps = false;

    //campos

    protected $fillable = [
        'nombre',
        'rangos'];
}
