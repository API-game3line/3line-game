<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

class User extends BaseController
{
    use ResponseTrait;
    public function new()
    {
        return "hola mundo";


    }
    public function create()
    {
        $user = new UserModel();
        $user->insert(
            [
                'name' =
            ]
        )
    }
}