<?php

namespace App\Actions\Auth;

use App\Role;
use App\User;
use Illuminate\Http\Request;
use Laravel\Passport\Client;

class RegisterAction{

    public function run($request){

        $developerRole = Role::where('slug','developer')->first();
        $user =   User::create([
                'name' => $request['name'],
                'email' => $request['email'],
                'password' => bcrypt($request['password']),
    
            ]);
        $user->roles()->attach($developerRole->id);
        return $user;
    }
}