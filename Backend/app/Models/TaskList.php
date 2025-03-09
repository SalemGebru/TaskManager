<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskList extends Model
{
    use HasFactory;

    protected $table="_task_list";
    protected $fillable = [
        'title',
        'description',
        'status',
        'due',
        'created_by',
    ];
}
