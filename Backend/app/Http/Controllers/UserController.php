<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getUser(Request $request){
       $user=$request->user();
       
    
        
        return response()->json(['message' => 'User not authenticated'], 401);
    }
}
