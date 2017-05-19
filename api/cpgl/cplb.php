<?php
include_once '../func.php';
include_once '/inc/auth.inc.php';

header('Content-type: application/json');
$sql = 'SELECT * FROM lyzapp.cplb';
$curl = exequery(TD::conn(), $sql);
while ($row = mysql_fetch_assoc($curl)) {
	$data[] = $row;
}
$data = array_iconv($data);
echo json_encode($data);
