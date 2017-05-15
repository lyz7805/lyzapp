<?php
require_once '../func.php';
require_once '../conn.php';

// $conn = OpenConnection();
// LSWLLB.LSWLLB_LBBH 类别编号
// LSWLLB.LSWLLB_LBMC 类别名称
// LSWLLB.LSWLLB_DYTMH 对应条码号
// LSWLLB.LSWLLB_JS 级数（一级1、二级2。。）
// LSWLLB.LSWLLB_MX 有无下级（0有、1无）

/*
*获取编码结构定义，返回数组
*$xm 要查询的项目，比如CW_JXCWLSTRU物料类别编码结构
*return 数据库中F_VAL以字符串存在，最后以数组形式返回
*/
function get_bmjgdy($xm) {
    $xm = strtoupper($xm);
    $conn = openConnection();
    $sql = 'SELECT * FROM lc0529999.LSCONF WHERE F_VKEY=\'' . $xm . '\'';
    $result = sqlsrv_query($conn, $sql);
    if ($result === FALSE)
        die(print_r(sqlsrv_errors()));
    $row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC);
    $data = str_split(rtrim($row['F_VAL']));
    return $data;
}
// print_r(get_bmjgdy('CW_JXCWLSTRU'));
function get_wlfl($js = 1, $par = '') {
    $wlbmjg = get_bmjgdy('CW_JXCWLSTRU');
    $par_ws = 0;
    for ($i=1; $i < $js; $i++) {
        $par_ws += $wlbmjg[$i-1];
    }
    // echo '<pre>'.$js.'-'.$par_ws.'-';
	$conn = openConnection();
	$sql = 'SELECT * FROM lc0529999.LSWLLB ';
	$sql .= ' WHERE LSWLLB_JS=' . $js . ' AND LEFT(LSWLLB_LBBH, ' . $par_ws . ')=\'' . $par .'\' ';
	$sql .= ' ORDER BY LSWLLB_LBBH';
    // echo $sql;
	$result = sqlsrv_query($conn, $sql);
	if ($result == FALSE)
        die(print_r(sqlsrv_errors()));
	while($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC))
	{
        $sub_lbbh = substr($row['LSWLLB_LBBH'], $par_ws);
        if ($row['LSWLLB_MX'] === 0) {
            $data[] = array(
                'lbbh' => $row['LSWLLB_LBBH'],
                'lbmc' => $row['LSWLLB_LBMC'],
                'dytmh' => $row['LSWLLB_DYTMH'],
                'label' => $sub_lbbh . ' ' . $row['LSWLLB_LBMC'],
                'children' => get_wlfl($js+1, $row['LSWLLB_LBBH'])
            );
        } else {
            $data[] = array(
                'lbbh' => $row['LSWLLB_LBBH'],
                'lbmc' => $row['LSWLLB_LBMC'],
                'dytmh' => $row['LSWLLB_DYTMH'],
                'label' => $sub_lbbh . ' ' . $row['LSWLLB_LBMC']
            );
        }
	}
    sqlsrv_free_stmt($result);
    sqlsrv_close($conn);
	return $data;
}
// echo '<pre>';
$data = get_wlfl();
// print_r($data);
$data = json_encode(array_iconv($data));
echo $data;