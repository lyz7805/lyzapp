<?php

include_once 'func.php';

header('Content-type:application/json');
$is_login = is_login();
// echo $is_login;
echo json_encode($is_login);
