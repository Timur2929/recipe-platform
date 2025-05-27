<?php

use Illuminate\Support\Facades\Route;
// API-маршруты
Route::prefix('api')->group(function () {
    require __DIR__.'/api.php';
});

// Все остальные запросы перенаправляем на фронтенд
Route::get('/{any}', function () {
    return file_get_contents(public_path('index.html'));
})->where('any', '.*');
Route::get('/', function () {
    return redirect('http://localhost:5173'); // Просто редирект на фронт
});
