<?php

require_once '../func.php';
require_once '../conn.php';

// JSJLDW.JSJLDW_DWDM 单位编号
// JSJLDW.JSJLDW_DWMC 单位名称
// JSJLDW.JSJLDW_XSWS 小数位数
// JSJLDW.JSJLDW_BZ （SG）
$conn = openConnection();
$sql = 'SELECT * FROM lc0529999.JSJLDW ';
// $sql .= ' WHERE JSJLDW_DWDM=\'00000001\'';
$sql .= ' ORDER BY JSJLDW_DWDM';
$result = sqlsrv_query($conn, $sql);
if ($result == false) {
    die(print_r(sqlsrv_errors()));
}
while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
    $data[] = array(
        'dwdm' => $row['JSJLDW_DWDM'],
        'dwmc' => $row['JSJLDW_DWMC'],
        'xsws' => $row['JSJLDW_XSWS'],
        'bz' => $row['JSJLDW_BZ'],
    );
}
sqlsrv_free_stmt($result);
sqlsrv_close($conn);
// echo '<pre>';
// print_r($data);
$data = json_encode(array_iconv($data));
echo $data;
