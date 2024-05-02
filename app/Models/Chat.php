<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;
    protected $table = 'chat';

    //Primary key

    protected $primaryKey = 'id';

    public $timestamps = true;

    //campos

    protected $fillable = [
        'id_user1',
        'id_user2',
        'id_match',];
}
