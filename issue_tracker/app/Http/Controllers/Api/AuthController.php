<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\User;
use Laravel\Passport\Client;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(UserLoginRequest $request)
    {

        $passportGrantClient = Client::where('password_client', 1)->first();

        // $http = new \GuzzleHttp\Client();

        $data = [
                'grant_type' => 'password',
                'client_id' => $passportGrantClient->id,
                'client_secret' => $passportGrantClient->secret,
                'username' => $request->email,
                'password' => $request->password,
                'scope' => '*',

            ];

        $tokenRequest = Request::create('/oauth/token', 'post', $data);
        $tokeResponse = app()->handle($tokenRequest);

        $contentString = $tokeResponse->content();

        $tokenContent = json_decode($contentString,true);

        if(!empty($tokenContent['access_token'])){
            return $tokeResponse;
        }

        return response()->json(['message' => 'unathenticated']);
        // return app()->handle($tokenRequest);

    }

    public function register(UserRegisterRequest $request)
    {

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),

        ]);

        if (!$user) {
            return response()->json(['success' => false, "message" => "Registration failed"]);

        }

        return response()->json(['success' => true, "message" => "Registration success"]);
        // dd($request->all());
    }
}
