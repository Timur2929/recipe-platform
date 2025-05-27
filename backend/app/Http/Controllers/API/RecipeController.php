<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::with(['category', 'tags', 'user'])->latest()->paginate(10);
        return response()->json($recipes);
    }

    public function show($id)
    {
        $recipe = Recipe::with(['category', 'tags', 'ingredients', 'steps', 'user'])->findOrFail($id);
        return response()->json($recipe);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'prep_time' => 'nullable|integer',
            'cook_time' => 'nullable|integer',
            'servings' => 'nullable|integer',
            'category_id' => 'nullable|exists:categories,id',
            'ingredients' => 'required|array',
            'steps' => 'required|array',
            'tags' => 'nullable|array',
        ]);

        $recipe = $request->user()->recipes()->create($validated);

        // Добавляем ингредиенты
        foreach ($request->ingredients as $ingredient) {
            $recipe->ingredients()->attach($ingredient['id'], [
                'amount' => $ingredient['pivot']['amount'],
                'unit' => $ingredient['pivot']['unit'],
                'note' => $ingredient['pivot']['note'],
            ]);
        }

        // Добавляем шаги
        foreach ($request->steps as $step) {
            $recipe->steps()->create([
                'step_number' => $step['step_number'],
                'instruction' => $step['instruction'],
            ]);
        }

        // Добавляем теги
        if ($request->tags) {
            $recipe->tags()->attach($request->tags);
        }

        return response()->json($recipe->load(['category', 'tags', 'ingredients', 'steps']), 201);
    }

    public function update(Request $request, $id)
    {
        $recipe = Recipe::findOrFail($id);

        $this->authorize('update', $recipe);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'prep_time' => 'nullable|integer',
            'cook_time' => 'nullable|integer',
            'servings' => 'nullable|integer',
            'category_id' => 'nullable|exists:categories,id',
            'ingredients' => 'sometimes|array',
            'steps' => 'sometimes|array',
            'tags' => 'nullable|array',
        ]);

        $recipe->update($validated);

        // Обновляем ингредиенты
        if ($request->has('ingredients')) {
            $recipe->ingredients()->detach();
            foreach ($request->ingredients as $ingredient) {
                $recipe->ingredients()->attach($ingredient['id'], [
                    'amount' => $ingredient['pivot']['amount'],
                    'unit' => $ingredient['pivot']['unit'],
                    'note' => $ingredient['pivot']['note'],
                ]);
            }
        }

        // Обновляем шаги
        if ($request->has('steps')) {
            $recipe->steps()->delete();
            foreach ($request->steps as $step) {
                $recipe->steps()->create([
                    'step_number' => $step['step_number'],
                    'instruction' => $step['instruction'],
                ]);
            }
        }

        // Обновляем теги
        if ($request->has('tags')) {
            $recipe->tags()->sync($request->tags);
        }

        return response()->json($recipe->load(['category', 'tags', 'ingredients', 'steps']));
    }

    public function destroy($id)
    {
        $recipe = Recipe::findOrFail($id);
        $this->authorize('delete', $recipe);
        $recipe->delete();
        return response()->json(null, 204);
    }
}