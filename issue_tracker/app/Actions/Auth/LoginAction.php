<?php

namespace App\Actions\Auth;
use App\User;
use Illuminate\Http\Request;
use Laravel\Passport\Client;

class LoginAction{

    public function run($request){
        $passportGrantClient = Client::where('password_client', 1)->first();

        // $http = new \GuzzleHttp\Client();

        $data = [
                'grant_type' => 'password',
                // 'client_id' => $passportGrantClient->id,
                // 'client_secret' => $passportGrantClient->secret,
                'username' => $request['email'],
                'password' => $request['password'],
                'scope' => '*',
            ];

        $tokenRequest = Request::create('/oauth/token', 'post', $data);
        $tokeResponse = app()->handle($tokenRequest);

        $contentString = $tokeResponse->content();

        return [
            "response"=>$tokeResponse,
            "content"=>json_decode($contentString,true)
        ];
    }
}