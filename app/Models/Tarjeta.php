<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarjeta extends Model
{
    use HasFactory;
    protected $table = 'tcredito';

    //Primary key

    protected $primaryKey = 'id';

    public $timestamps = false;

    //campos

    protected $fillable = [
        'titular',
        'n_tarjeta',
        'f_caducidad',
        'cvv',
        'id_cliente'];
}
