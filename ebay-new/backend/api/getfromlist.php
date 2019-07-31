<?php

  array_diff($lista, (is_array($param_username) ? $param_username : array($param_username)));
  print_r("Removed from list\n");
  print_r($lista);

 ?>
