<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostController extends Controller
{
   public function index(){
    return Post::with([
        'user',
        'comments' => function ($query) {
            $query->latest();
        },
        'comments.user'
    ])
    ->latest()
    ->paginate(20);
   }

   public function store(Request $request)
    {
        return Post::create([
            'user_id'=> auth()->id(),
            'content'=> $request->content,
            'visibility'=> $request->visibility
        ]);
    }
}