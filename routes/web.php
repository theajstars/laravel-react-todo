<?php
use App\Http\Controllers\Api\TodoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/todos', [TodoController::class, 'index']);
Route::post('/todos/add', [TodoController::class, 'store']);
Route::get('/todos/edit/{id}', [TodoController::class, 'edit']);
Route::put('/todos/update/{id}', [TodoController::class, 'update']);
Route::put('/todos/complete/{id}', [TodoController::class, 'complete']);
Route::delete('/todos/delete/{id}', [TodoController::class, 'destroy']);