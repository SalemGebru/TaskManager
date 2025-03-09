<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register',[AuthController::class,'Register']);

Route::post('/login',[AuthController::class,'login']);

Route::middleware('auth:api')->get('/tasks', [TaskController::class, 'showTasks']);

Route::middleware('auth:api')->post('/tasks',[TaskController::class,'createTasks']);

Route::put('/tasks/{id}', [TaskController::class, 'updateTasks']);

Route::put('/test-put', function () {
    return response()->json(['message' => 'PUT method works!']);
});

Route::delete('/tasks/{id}',[TaskController::class,'deleteTasks']);

Route::fallback(function(){
    return response()->json(['message'=> 'Page not found']);
});
