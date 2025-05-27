<?php

namespace App\Providers;

use App\Models\Recipe;
use App\Models\Category;
use App\Models\Ingredient;
use App\Models\Step;
use App\Models\Tag;
use App\Policies\RecipePolicy;
use App\Policies\CategoryPolicy;
use App\Policies\IngredientPolicy;
use App\Policies\StepPolicy;
use App\Policies\TagPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Recipe::class => RecipePolicy::class,
        Category::class => CategoryPolicy::class,
        Ingredient::class => IngredientPolicy::class,
        Step::class => StepPolicy::class,
        Tag::class => TagPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // Определение прав администратора
        Gate::before(function ($user, $ability) {
            if ($user->is_admin) {
                return true;
            }
        });

        // Дополнительные Gate-правила можно добавить здесь
        Gate::define('manage-recipes', function ($user) {
            return $user->is_admin || $user->is_content_manager;
        });

        Gate::define('manage-categories', function ($user) {
            return $user->is_admin;
        });
    }
}