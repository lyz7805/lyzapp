<?php
include_once '../func.php';
include_once '/inc/auth.inc.php';

header('Content-type: application/json;charset=utf-8');
$id = $_GET['id'] ? $_GET['id'] : 0;
if ($id === 0) {
    $sql = 'SELECT * FROM lyzapp.cplb';
    $curl = exequery(TD::conn(), $sql);
    while ($row = mysql_fetch_assoc($curl)) {
        $data[] = $row;
    }
} else {
    $sql = 'SELECT * FROM lyzapp.cplb WHERE id=\'' . $id . '\'';
    $curl = exequery(TD::conn(), $sql);
    if ($row = mysql_fetch_assoc($curl)) {
        $data= $row;
    }
}

$data = array_iconv($data);
echo json_encode($data);
