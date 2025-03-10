<?php


namespace App\Http\Controllers;
session_start();

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\User;

class AuthController extends Controller
{
    public function Register(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
        ]);
    
        $user = new User([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']), 
        ]);
        
        $user->save();
    
       
        $token = JWTAuth::fromUser ($user);
    
        return response()->json([
            'message' => 'User  successfully registered',
            'user' => $user,
            'token' => $token, 
        ], 201);
    }
    public function login(Request $request){
        $validated = $request->validate([
            'name' => ['required'],
            'password' => ['required']
        ]);
        try{
            if(!$token=JWTAuth::attempt($validated)){
                return response()->json(['message'=>'Invalid credentials'],status:404);
              }
              return response()->json([
                'message'=>'login successful',
                'token'=>$token,
              ],status:201);
        }catch(JWTException $e){
                return response()->json(['message'=> 'Unable to create token'],status:404);
        }
        
    
        
        
    }
}
