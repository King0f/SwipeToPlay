<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mensajes extends Model
{
    use HasFactory;
    protected $table = 'mensajes';

    //Primary key

    protected $primaryKey = 'id';

    public $timestamps = true;

    //campos

    protected $fillable = [
        'id_chat',
        'id_usuario',
        'username',
        'mensaje'];
}
