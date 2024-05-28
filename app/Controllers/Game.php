<?php
namespace App\Controllers;  
use App\Models\GameModel;

class Game extends BaseController{

    public function __construct(){
        $this->session = \Config\Services::session();
    }
    public function index(){
        return view('game');
    }

}