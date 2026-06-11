<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $rules = [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:6'],
        ];
        $validator = Validator::make($request->all(),$rules);
        if ($validator->fails()) return response()->json(['type'=>'error','msg'=>$validator->errors()->first()]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = auth('api')->login($user);

        return response()->json([
            'type' => 'success',
            'msg' => 'Registration successful',
            'user' => $user,
            'token'=>$token
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email','password');

        if(!$token = auth('api')->attempt($credentials)){
            return response()->json(['type'=>'error','msg'=>'Invalid credentials']);
        }

        return response()->json([
            'type' => 'success',
            'msg' => 'Login successful',
            'token'=> $token,
            'user'=> auth()->user()
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