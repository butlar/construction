<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class AuthenticationController extends Controller
{
    public function authenticate(Request $request){
        // echo "hello";
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|',
            'password' => 'required|min:8'
        ]);

        if($validator->fails()){
            return response()->json([
                "status"=> "fails",
                "errors"=>  $validator->errors()
            ]);
        }else{
            $credentials = [
                "email"=>$request->email,
                "password"=> $request->password
            ];
            if(Auth::attempt($credentials)){

                $user = User::findOrFail(Auth::user()->id);
                $token = $user->createToken('token')->plainTextToken;
                
                return response()->json([
                    "status" => "true",
                    "token" => $token,
                    "id"=>Auth::user()->id
                ]);
            }else{
                return response()->json([
                    "status" => "false",
                    "message" => "Either email or password is incorrect."
                ]);
            }
        }
        
    }

    public function logout(){
        $user = User::find(Auth::user()->id);
        $user->tokens()->delete();

        return response()->json([
            "status" => "true",
            "token" => "user logout successsfully."
            
        ]);
    }
}