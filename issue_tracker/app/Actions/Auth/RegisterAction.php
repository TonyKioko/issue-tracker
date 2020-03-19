<?php

namespace App\Actions\Auth;
use App\User;
use Illuminate\Http\Request;
use Laravel\Passport\Client;

class RegisterAction{

    public function run($request){
        return [
            User::create([
                'name' => $request['name'],
                'email' => $request['email'],
                'password' => bcrypt($request['password']),
    
            ])
            ];
    }
}