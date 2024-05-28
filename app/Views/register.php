<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Usuario</title>
</head>

<body>
    <?php if (session()->getFlashdata('success')): ?>
        <div class="alert alert-success">
            <?= session()->getFlashdata('success') ?>
        </div>
    <?php endif; ?>

    <?php if (session()->getFlashdata('error')): ?>
        <div class="alert alert-danger">
            <?= session()->getFlashdata('error') ?>
        </div>
    <?php endif; ?>

    <h2>Registro de Usuario</h2>
    <!-- Formulario de registro -->
    <form action="<?= site_url('auth/register') ?>" method="post">
        <label for="username">Nombre de usuario:</label><br>
        <input type="text" id="username" name="username" value="<?= old('username') ?>"><br>

        <label for="email">Correo electrónico:</label><br>
        <input type="email" id="email" name="email" value="<?= old('email') ?>"><br>

        <label for="password">Contraseña:</label><br>
        <input type="password" id="password" name="password"><br>

        <input type="submit" value="Enviar">
    </form>
</body>

</html>