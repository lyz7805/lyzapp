<?php

/**
 * 将含有GBK的中文数组转为UTF-8
 *
 * @param array $arr   数组
 * @param string $in_charset 原字符串编码
 * @param string $out_charset 输出的字符串编码
 * @return array
 */

function array_iconv($arr, $in_charset = "gbk", $out_charset = "utf-8")
{

    $ret = eval('return '.iconv($in_charset, $out_charset, var_export($arr, true).';'));

    return $ret;
}

function is_login($exit = null)
{
    session_start();
    if (!$_SESSION['LOGIN_USER_ID'] || ($_SESSION['LOGIN_USER_ID'] == '') || !$_SESSION['LOGIN_UID'] || ($_SESSION['LOGIN_UID'] == '')) {
        if (empty($exit)) {
            return false;
        } else {
            return false;
            exit;
        }
    } else {
        return true;
    }
}

is_login(1);
