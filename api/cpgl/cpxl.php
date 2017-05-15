<?php
include_once '../func.php';
include_once '/inc/auth.inc.php';

header('Content-type: application/json');
$sql = 'SELECT * FROM lyzapp.cpxl';
$curl = exequery(TD::conn(), $sql);
while ($row = mysql_fetch_assoc($curl)) {
	$data[] = array(
		'id' => $row['id'],
		'cpxl' => $row['cpxl'],
		'xlmc' => $row['xlmc'],
		'bz' => ''
	);
}
$data = array_iconv($data);
echo json_encode($data);
