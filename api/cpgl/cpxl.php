<?php

include_once '../func.php';
include_once '/inc/auth.inc.php';

header('Content-type: application/json');
$cplbid = $_GET['cplb'] ? $_GET['cplb'] : 0;

if ($cplbid === 0) {
    return false;
} else {
    $sql = 'SELECT * FROM lyzapp.cpxl WHERE cplb=\''.$cplbid.'\'';
    $curl = exequery(TD::conn(), $sql);
    while ($row = mysql_fetch_assoc($curl)) {
        $data[] = array(
            'id' => $row['id'],
            'cpxl' => $row['cpxl'],
            'xlmc' => $row['xlmc'],
            'bz' => '',
        );
    }
    $data = array_iconv($data);
    echo json_encode($data);
}
