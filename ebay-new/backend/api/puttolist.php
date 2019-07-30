<?php

//an den yparxei array, dimiourgise ena
if (!isset($lista)) {
    $lista = array();
}
//allios balto mesa sto array
array_push($lista, $param_usernam);
json_encode($lista);  //steile ti lista sto front_end



 ?>
