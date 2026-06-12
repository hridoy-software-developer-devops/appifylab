<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\CommentController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function(){
    Route::get('/me',[AuthController::class,'me']);
    Route::post('/logout',[AuthController::class,'logout']);
    Route::get('/posts',[PostController::class,'index']);
    Route::post('/post/create',[PostController::class,'store']);
    Route::post('/post/create',[PostController::class,'store']);
    Route::post('/posts/{postId}/comment',[CommentController::class,'store']);
    Route::post('/posts/{postId}/comments/{commentId}/like',[CommentController::class,'like']);
});