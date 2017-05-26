<?php

include_once '../func.php';
include_once '/inc/auth.inc.php';

header('Content-type: application/json');
$cplbid = $_GET['cplbid'] ? $_GET['cplbid'] : 0;
$cpxlid = $_GET['id'] ? $_GET['id'] : 0;

$data = array();
if ($cplbid !== 0) {
    $sql = 'SELECT * FROM lyzapp.cpxl WHERE cplb = \''.$cplbid.'\'  ORDER BY id';
    $curl = exequery(TD::conn(), $sql);
    while ($row = mysql_fetch_assoc($curl)) {
        $data[] = $row;
    }
} elseif ($cpxlid !== 0) {
    $sql = 'SELECT  cpxl.id AS id,cpxl,xlmc,cplb.id AS lbid,lbmc ROM lyzapp.cpxl JOIN lyzapp.cplb ON cpxl.cplb = cplb.id WHERE id=\''.$cpxlid.'\'';
    $curl = exequery(TD::conn(), $sql);
    if ($row = mysql_fetch_assoc($curl)) {
        $data = $row;
    }
} else {
    $sql = 'SELECT cpxl.id AS id,cpxl,xlmc,cplb.id AS lbid,lbmc FROM lyzapp.cpxl JOIN lyzapp.cplb ON cpxl.cplb = cplb.id ORDER BY cpxl.cplb,cpxl.id';
    $curl = exequery(TD::conn(), $sql);
    while ($row = mysql_fetch_assoc($curl)) {
        $data[] = $row;
    }
}
$data = array_iconv($data);
echo json_encode($data);
