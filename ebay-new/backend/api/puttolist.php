<?php

//an den yparxei array, dimiourgise ena
//EIPARXEI PROBLIMA, KSANADIMIOURGEITAI TO ARRAY-LISTA
if (!isset($lista)) {
    $lista = array();
    print_r("Create the list\n");
}
//allios balto mesa sto array
array_push($lista, $param_username);//bazo username cause username is pretty unique. 10Q\
print_r("Puted to list\n");
print_r($lista);
//epistrefo array alla skopos einai na epistrepso lista...IMWATCHINGYOU
json_encode($lista);  //steile ti lista sto front_end
print_r($lista);


 ?>
