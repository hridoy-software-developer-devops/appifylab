<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:6'],
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = auth()->login($user);

        return response()->json([
            'success' => true,
            'message' => 'Registration successful',
            'user' => $user,
            'token'=>$token
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email','password');

        if(!$token = auth()->attempt($credentials)){
            return response()->json([
                'message'=>'Invalid credentials'
            ],401);
        }

        return response()->json([
            'token'=>$token,
            'user'=>auth()->user()
        ]);
    }

    public function me()
    {
        return auth()->user();
    }

    public function logout()
    {
        auth()->logout();

        return response()->json([
            'message'=>'Logout Success'
        ]);
    }
}