<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('recipes')->get();
        return response()->json($categories);
    }

    public function show($id)
    {
        $category = Category::with(['recipes' => function($query) {
            $query->with(['user', 'tags'])->latest();
        }])->findOrFail($id);
        
        return response()->json($category);
    }
}