<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}
//TODO: controlador de iva

require_once('../models/iva.model.php');
error_reporting(0);
$iva = new Iva;
switch ($_GET["op"]) {
    case 'todos': // Procedimiento para cargar todos los ivas
        $datos = array();
        $datos = $iva->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': // Procedimiento para obtener un iva por ID
        if (!isset($_POST["idIva"])) {
            echo json_encode(["error" => "Producto ID not specified."]);
            exit();
        }
        $idIva = intval($_POST["idIva"]);
        $datos = array();
        $datos = $iva->uno($idIva);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;
}
