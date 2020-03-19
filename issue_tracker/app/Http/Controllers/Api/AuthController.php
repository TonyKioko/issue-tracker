<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\User;
use Laravel\Passport\Client;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

use App\Actions\Auth\LoginAction;
use App\Actions\Auth\RegisterAction;
use LoginAction as GlobalLoginAction;
use RegisterAction as GlobalRegisterAction;

class AuthController extends Controller
{
    public function login(UserLoginRequest $request,LoginAction $loginAction)
    {

        $passportRequest = $loginAction->run($request->all());
        $tokenContent = $passportRequest['content'];
        $tokenResponse = $passportRequest['response'];


        if(!empty($tokenContent['access_token'])){
            return $passportRequest['response'];
        }

        return response()->json(['message' => 'unathenticated']);
        // return app()->handle($tokenRequest);

    }

    public function register(UserRegisterRequest $request,RegisterAction $registerAction)
    {

        $user = $registerAction->run($request->all());

        if (!$user) {
            return response()->json(['success' => false, "message" => "Registration failed"]);

        }

        return response()->json(['success' => true, "message" => "Registration success"]);
        // dd($request->all());
    }
}
