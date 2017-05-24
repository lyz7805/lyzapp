<?php

include_once '../func.php';
include_once '/inc/auth.inc.php';

header('Content-type: application/json;charset=utf-8');
$cpid = $_GET['cpid'] ? $_GET['cpid'] : false;
if ($cpid === false) {
    return false;
} else {
    $sql = 'SELECT * FROM lyzapp.cpxx WHERE id = \''.$cpid.'\'';
    $curl = exequery(TD::conn(), $sql);
    if ($row = mysql_fetch_assoc($curl)) {
        $data = $row;
    }
    $sql = 'SELECT ggxh FROM lyzapp.ggxh WHERE id = \''.$data['ggxh'].'\'';
    $curl = exequery(TD::conn(), $sql);
    if ($row = mysql_fetch_assoc($curl)) {
        $data['ggxh'] = $row['ggxh'];
    }
    $data = array_iconv($data);
    // print_r($data);
    echo json_encode($data);
}
