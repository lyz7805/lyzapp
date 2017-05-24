<?php

include_once '../../func.php';
include_once 'inc/auth.inc.php';
include_once 'inc/utility_org.php';

header('Content-type: application/json');

$flow_id = $_GET['flow_id'] ? $_GET['flow_id'] : 0;
if ($flow_id > 0) {
    $query = 'SELECT fp.* FROM flow_type ft,flow_process fp WHERE ft.FLOW_ID = fp.FLOW_ID AND ft.FLOW_ID = '.$flow_id.' ORDER BY PRCS_ID';
    $curl = exequery(TD::conn(), $query);
    while ($row = mysql_fetch_assoc($curl)) {
        $prcs_user = GetUserNameById($row['PRCS_USER']);
        $prcs_dept = $row['PRCS_DEPT'] == 'ALL_DEPT' ? '全体部门' : GetDeptNameById($row['PRCS_DEPT']);
        $prcs_priv = GetPrivNameById($row['PRCS_PRIV']);
        $tableData[] = array(
            'id' => $row['ID'],
            'prcs_id' => $row['PRCS_ID'],
            'name' => $row['PRCS_NAME'],
            'prcs' => array(
                array('label' => '用户', 'prcs' => $prcs_user),
                array('label' => '部门', 'prcs' => $prcs_dept),
                array('label' => '角色', 'prcs' => $prcs_priv),
            ),
            'writable' => $row['PRCS_ITEM'],
            'hidden' => $row['HIDDEN_ITEM'],
            'required' => $row['REQUIRED_ITEM'],
        );
    }
    echo json_encode(array_iconv($tableData));
} else {
    echo '[]';
}
