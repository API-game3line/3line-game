<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body>
    <!--navbar-->
    <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Bootstrap" width="30" height="24">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="<?= base_url('auth/register') ?>">Registrarse</a>
                    </li>
                    <li class="">
                        <a class="nav-link" aria-current="page" href="#">Iniciar sesion</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!--content-->
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Iniciar Juego 1vs1</h5>
                        <form id="startGameForm">
                            <div class="form-group">
                                <label for="player1Name">Nombre del Jugador 1</label>
                                <input type="text" class="form-control" id="player1Name" required>
                            </div>
                            <div class="form-group">
                                <label for="player2Name">Nombre del Jugador 2</label>
                                <input type="text" class="form-control" id="player2Name" required>
                            </div>
                            <div class="mt-2">
                                <button type="submit" class="btn btn-primary">Iniciar Juego</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>