<?php

  print_r("lista prin : ");
  print_r($lista);
  print_r($param_username);
  //array_diff($lista, array($param_username));
  unset($lista[array_search($username, $lista)]);
  print_r("Removed from list\n");
  print_r("lista meta : ");
  print_r($lista);

 ?>
