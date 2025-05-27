<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'prep_time',
        'cook_time',
        'servings',
        'user_id',
        'category_id',
        'image'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class)->withPivot('amount', 'unit', 'note');
    }

    public function steps()
    {
        return $this->hasMany(Step::class)->orderBy('step_number');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}