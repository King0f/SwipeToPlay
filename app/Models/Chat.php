<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tarjeta extends Model
{
    use HasFactory;
    protected $table = 'chat';

    //Primary key

    protected $primaryKey = 'id';

    public $timestamps = false;

    //campos

    protected $fillable = [
        'id_match'];
}
