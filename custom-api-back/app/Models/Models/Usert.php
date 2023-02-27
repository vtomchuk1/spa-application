<?php

namespace App\Models\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usert extends Model
{
    public function posts(){
        return $this->hasMany(Post::class);
    }
}
