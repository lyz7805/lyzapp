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
	// print_r($zd);
	$ggzd = implode(',', $zd);
	// echo json_encode($zd);
}
$sql = 'SELECT cpxx.id AS id, wlbm, cpmc, jsyq, bz,ggxh.id AS ggxhid, ggxh.ggxh AS ggxh, ggzd FROM (lyzapp.cpxx JOIN lyzapp.ggxh ON((cpxx.ggxh = ggxh.id))) WHERE cpxl=' . $xlid . ' AND ggzd LIKE \'' . $ggzd . '\' ORDER BY ggxh,id';
$curl = exequery(TD::conn(), $sql);
while ($row = mysql_fetch_assoc($curl)) {
	// $data[] = array(
	// 	'id' => $row['id'],
	// 	'cpxl' => $row['cpxl'],
	// 	'xlmc' => $row['xlmc'],
	// 	'bz' => ''
	// );
	$data[] = $row;
}
// print_r($data);
$data = array_iconv($data);
echo json_encode($data);

	exit;



// if ($xlid === 0) {
// 	return false;
// } else {
// 	$zdjc = get_zdjc($xlid);
// 	for ($i = 0; $i < count($zdjc); $i++) {
// 		$result = array();
// 		$sql = 'SELECT * FROM lyzapp.ggzd WHERE cpxl=' . $xlid . ' AND zdjc=' . $zdjc[$i]['zdjc'] . ' ORDER BY id';
// 		$curl = exequery(TD::conn(), $sql);
// 		while ($row = mysql_fetch_assoc($curl)) {
// 			$result[] = array(
// 				'id' => $row['id'],
// 				'zdid' => $row['zdid'],
// 				'zdsm' => $row['zdsm']
// 			);
// 		}
// 		$data[$i] = array(
// 			'zdjc' => $zdjc[$i]['zdjc'],
// 			'zdlb' => $result
// 		);
// 	}
// 	// print_r($data);
// 	$data = array_iconv($data);
// 	echo json_encode($data);
// }


function get_zdzjc($id = 0) {
	if ($id === 0) {
		return 0;
	} else {
		$sql = 'SELECT MAX(zdjc) AS zdjc FROM lyzapp.ggzd WHERE cpxl=' . $id;
		$curl = exequery(TD::conn(), $sql);
		if ($row = mysql_fetch_assoc($curl)) {
			$zdzjc = $row['zdjc'];
			return $zdzjc;
		} else {
			return 0;
		}
	}
}

function get_zdjc($id = 0) {
	if ($id === 0) {
		return false;
	} else {
		$sql = 'SELECT zdjc,COUNT(zdjc) AS count FROM lyzapp.ggzd WHERE cpxl=' . $id . ' GROUP BY zdjc ORDER BY zdjc';
		$curl = exequery(TD::conn(), $sql);
		while ($row = mysql_fetch_assoc($curl)) {
			$zdjc[] = $row;
		}
		return $zdjc;
	}
}

