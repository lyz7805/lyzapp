<?php

include_once '../func.php';
include_once '/inc/auth.inc.php';
header('Content-type: application/json');
$cplbid = $_GET['cplbid'] ? $_GET['cplbid'] : false;
$xlid = $_GET['xlid'] ? $_GET['xlid'] : false;
// $zd = $_GET['zd'] ? $_GET['zd'] : '%';
$zd = $_GET['zd'] ? $_GET['zd'] : ','; if ($cplbid === false) {
    return false;
} else {
    $zd = split(',', $_GET['zd']);
    foreach ($zd as $key => $val) {
        if ($val == '') {
            $zd[$key] = '%';
        }
    }
    $ggzd = implode(',', $zd);
}
$sql = 'SELECT cpxx.id AS id, wlbm, cpmc, jsyq, bz,ggxh.id AS ggxhid, ggxh.ggxh AS ggxh, ggzd FROM (lyzapp.cpxx JOIN lyzapp.ggxh ON((cpxx.ggxh = ggxh.id))) WHERE';
$sql .= ' cplb='.$cplbid.' AND ';
if ($xlid) {
    $sql .= ' cpxl='.$xlid.' AND ';
}
$sql .= ' ggzd LIKE \''.$ggzd.'\'';
$sql .= ' ORDER BY ggxh,id';
// echo $sql,'<br>';
$curl = exequery(TD::conn(), $sql);
while ($row = mysql_fetch_assoc($curl)) {
    $data[] = $row;
}
// print_r($data);
$data = array_iconv($data);
echo json_encode($data);
