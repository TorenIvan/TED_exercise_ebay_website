<?php

require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);
#kalo einai edo na mou deineis kai to onoma ekeinou pou to esteile oste na min brisko mono an to mail uparxei sti basi, alla na brisko kai oti einai ontos to diko tou. Pros to paron yolo, 8a brisko mono an yparxei sti basi

if (isset($_POST) && !empty($_POST)) {

  #Protection for XSS
  $email = htmlspecialchars($email);


  #edo prepei na koitas an to email pou edose einai valid1 diladi an uparxei ston ali8ino kosmo(den ksero pos mellontike vaggelicious, vres to pana8ema se, vres to)

  #edo ftiaxneis to query
  $sqltemp = "SELECT name FROM user WHERE email=?";

  #gia sqli google it
  if ($stmttemp = mysqli_prepare($con,$sqltemp)) {
    mysqli_stmt_bind_param($stmttemp,"s",$param_email);
    $param_email=$email;

  } else {
    #json_encode("kserogoparekati");
    json_encode("1");
  }


} else {
  #No one Requested this! Why did you ask
  http_response_code('404');
}

#// TODO:
  #check if email is valid in db(num_of_rows>0 or num_of_rows==1){
  #  if not, return wrong email
  #}
  #check if email is for this user (symela must return you the username of the user that forgot his password(username must be unique)){
  #  if not, return wrong email for that username(or the same as the above, so as someone doesn't find out a mail in db)
  #}
  #check if email is realistic(this is for sign up, just keep it here to remember it the time after){
    #just do it on sign up, the are some commands, google it
  #}
  #if all above is ok{
  #  send a verification code(a hash please, that inside has a code for the user to copy paste to go to the newpassword.php)
  #}
  #The user copy-paste the code and we redirect him to the newpassword.php
  #send ok to symela, or not. Whatever she wants
  #
?>
