<?php

include_once '../../func.php';
// header('Access-Control-Allow-Origin:*');
include_once 'inc/auth.inc.php';
// include_once 'inc/conn.php';

header('Content-type: application/json');
$query = 'SELECT FLOW_ID,FLOW_NAME FROM flow_type ft,flow_sort fs WHERE fs.SORT_ID = ft.FLOW_SORT ORDER BY fs.SORT_NO,ft.FLOW_NO';

$cur = exequery(TD::conn(), $query);

while ($row = mysql_fetch_assoc($cur)) {
    $flow_id_options[] = array('value' => $row['FLOW_ID'], 'label' => $row['FLOW_NAME']);
}

echo json_encode(array_iconv($flow_id_options));
