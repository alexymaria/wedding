<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $name = $_POST['name'];
    $email = $_POST['email'];
    $attendance = $_POST['attendance'];
    $guests = $_POST['guests'];
    $guest_names = $_POST['guest_names'];
    $diet = $_POST['diet'];

    // Aquí puedes procesar los datos, por ejemplo:
    // 1. Almacenarlos en una base de datos
    // 2. Enviarlos por correo electrónico
    // 3. Guardarlos en un archivo de texto

    // Para enviar los datos por correo electrónico:
    $to = "tucorreo@dominio.com"; // Cambia esto por tu correo electrónico
    $subject = "Confirmación de asistencia";
    $message = "
    Nombre: $name
    Correo: $email
    Asistirá: $attendance
    Número de acompañantes: $guests
    Acompañantes: $guest_names
    Restricciones alimentarias: $diet
    ";
    $headers = "From: noreply@tudominio.com"; // Cambia esto por tu dominio

    // Enviar el correo
    mail($to, $subject, $message, $headers);

    // O simplemente almacenar en un archivo (en un archivo txt, por ejemplo):
    $file = fopen("confirmaciones.txt", "a");
    fwrite($file, "$name, $email, $attendance, $guests, $guest_names, $diet\n");
    fclose($file);

    echo "Gracias por tu confirmación. ¡Te esperamos!";
}
?>
