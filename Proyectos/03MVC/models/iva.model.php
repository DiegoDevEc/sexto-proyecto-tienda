<?php
// TODO: Clase de Iva Tienda
require_once('../config/config.php');

class Iva
{
    public function todos() //select * from iva
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `iva`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($idIva) //select * from iva where id = $id
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `iva` WHERE `idIva`=$idIva";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }
}
