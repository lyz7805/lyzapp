<?php
include_once '../func.php';
include_once '/inc/auth.inc.php';

header('Content-type: application/json');
$xlid = $_GET['xlid'] ? $_GET['xlid'] : false;
$zd = $_GET['zd'] ? split(',', $_GET['zd']) : false;

if ($xlid === false || $zd === false) {
	return false;
} else {
	foreach($zd as $key => $val) {
		if ($val == '') {
			$zd[$key] = '%';
		}
	}
	$ggzd = implode(',', $zd);
}
$sql = 'SELECT cpxx.id AS id, wlbm, cpmc, jsyq, bz,ggxh.id AS ggxhid, ggxh.ggxh AS ggxh, ggzd FROM (lyzapp.cpxx JOIN lyzapp.ggxh ON((cpxx.ggxh = ggxh.id))) WHERE cpxl=' . $xlid . ' AND ggzd LIKE \'' . $ggzd . '\' ORDER BY ggxh,id';
$curl = exequery(TD::conn(), $sql);
while ($row = mysql_fetch_assoc($curl)) {
	$data[] = $row;
}
// print_r($data);
$data = array_iconv($data);
echo json_encode($data);
