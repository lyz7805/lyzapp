<?php
include_once '/inc/auth.inc.php';
include_once '../func.php';

header('Content-type: application/json');
$cplbid = $_GET['cplb'] ? $_GET['cplb'] : 0;
$xlid = $_GET['xl'] ? $_GET['xl'] : 0;

if ($cplbid === 0) {
	return false;
} else {
	$zdjc = get_zdjc($cplbid);
	for ($i = 0; $i < count($zdjc); $i++) {
		$result = array();
		$sql = 'SELECT * FROM lyzapp.ggzd WHERE cplb=' . $cplbid . ' AND zdjc=' . $zdjc[$i]['zdjc'] . ' ORDER BY id';
		$curl = exequery(TD::conn(), $sql);
		while ($row = mysql_fetch_assoc($curl)) {
			$result[] = array(
				'id' => $row['id'],
				'zdid' => $row['zdid'],
				'zdsm' => $row['zdsm']
			);
		}
		$data[$i] = array(
			'zdjc' => $zdjc[$i]['zdjc'],
			'zdlb' => $result
		);
	}
	// print_r($data);
	$data = array_iconv($data);
	echo json_encode($data);
}


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
		$sql = 'SELECT zdjc,COUNT(zdjc) AS count FROM lyzapp.ggzd WHERE cplb=' . $id . ' GROUP BY zdjc ORDER BY zdjc';
		$curl = exequery(TD::conn(), $sql);
		while ($row = mysql_fetch_assoc($curl)) {
			$zdjc[] = $row;
		}
		return $zdjc;
	}
}

