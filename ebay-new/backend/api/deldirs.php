<?php

$dirname = $idltlt;
if (is_dir($dirname)){
  $dir_handle = opendir($dirname);
}
if (!$dir_handle){

}else{
     while($file = readdir($dir_handle)) {
           if ($file != "." && $file != "..") {
                if (!is_dir($dirname."/".$file))
                     unlink($dirname."/".$file);
                else
                     delete_directory($dirname.'/'.$file);
           }
     }
     closedir($dir_handle);
     rmdir($dirname);
}
?>
