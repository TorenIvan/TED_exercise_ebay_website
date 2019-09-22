<?php
for ($xxml=0; $xxml < 40; $xxml++) {
  $string_x = (string) ($xxml);
  $previous_string = "items-";
  $after_string = ".xml";
  $xml_name = $previous_string.$string_x.$after_string;
  echo $xml_name;
  echo "\n";
}
?>
