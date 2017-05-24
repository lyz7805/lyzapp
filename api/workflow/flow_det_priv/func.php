<?php

/**
 * 将含有GBK的中文数组转为UTF-8.
 *
 * @param array  $arr         数组
 * @param string $in_charset  原字符串编码
 * @param string $out_charset 输出的字符串编码
 *
 * @return array
 */
function array_iconv($arr, $in_charset = 'gbk', $out_charset = 'utf-8')
{
    $ret = eval('return '.iconv($in_charset, $out_charset, var_export($arr, true).';'));

    return $ret;
}
