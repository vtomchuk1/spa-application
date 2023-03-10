<?php

use App\Http\Controllers\Api\CaptchaServiceController;
use App\Http\Controllers\Api\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('/uploadfile',[\App\Http\Controllers\UploadFileController::class, 'showUploadFile']);

Route::get('/create-captcha', [CaptchaServiceController::class, 'index']);
Route::post('/captcha-validation', [CaptchaServiceController::class, 'captchaFormValidate']);


Route::get('posts/sort/{params}/{flag}', [PostController::class, 'sort'])->name('posts.sort');
Route::get('posts/{params}', [PostController::class, 'show'])->name('posts.show');
Route::get('posts/reply/{params}', [PostController::class, 'show_reply'])->name('posts.show_reply');


Route::apiResource('posts', PostController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
