<?php

namespace App\Controllers;

use App\Models\UserModel;

class Auth extends BaseController
{
    public function __construct()
    {
        $this->session = \Config\Services::session();
    }
    public function showRegisterForm()
    {
        return view('register');
    }

    public function register()
    {
        $user = new UserModel();
        $username = $this->request->getPost('username');
        $email = $this->request->getPost('email');
        $password = $this->request->getPost('password');

        // Verificar si el nombre de usuario o el correo electrónico ya existen
        $existingUser = $user->where('username', $username)
                             ->orWhere('email', $email)
                             ->first();
        if ($existingUser) {
            // Usuario ya existe
            $this->session->setFlashdata('error', 'El nombre de usuario o el correo electrónico ya están registrados');
            return redirect()->to('/auth/register');
        }
        $userData = [
            'username' => $this->request->getPost('username'),
            'email' => $this->request->getPost('email'),
            'password' => password_hash($this->request->getPost('password'), PASSWORD_DEFAULT),
        ];

        if ($user->insert($userData)) {
            // Usuario registrado con éxito, redirigir al login
            $this->session->setFlashdata('success', 'Usuario registrado con éxito. Por favor, inicia sesión.');
            return redirect()->to('/auth/login');
        } else {
           // Manejo de error si la inserción falla
           $this->session->setFlashdata('error', 'Error al registrar el usuario');
           return redirect()->to('/auth/register');
        }
    }
    public function showLoginForm()
    {
        return view('login');
    }

    // Método para procesar el inicio de sesión
    public function login()
    {
        $user = new UserModel();
        $username = $this->request->getPost('username');
        $password = $this->request->getPost('password');

        // Verificar las credenciales del usuario
        $userRecord = $user->where('username', $username)
                           ->orWhere('email', $username)
                           ->first();

        if ($userRecord && password_verify($password, $userRecord['password'])) {
            // Credenciales válidas
            $this->session->set('user', $userRecord);
            return redirect()->to('/game'); // Redirigir al dashboard u otra página después del login
        } else {
            // Credenciales inválidas
            $this->session->setFlashdata('error', 'Nombre de usuario o contraseña incorrectos');
            return redirect()->to('/auth/login');
        }
    }

    // Método para cerrar sesión
    public function logout()
    {
        $this->session->destroy();
        return redirect()->to('/auth/login');
    }
}
