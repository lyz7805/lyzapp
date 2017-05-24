<?php

$db['oa_pdo'] = array(
    'dsn' => 'mysql:host=localhost;port=3336;dbname=td_oa;charset=utf8',
    'username' => 'root',
    'password' => 'HCHPrb3*^@GN9!J769',
    'dbdriver' => 'pdo',
    'pconnect' => false,
    'db_debug' => (ENVIRONMENT !== 'production'),
    'cache_on' => false,
    'cachedir' => '',
    'dbcollat' => 'gbk_chinese_ci',
    'swap_pre' => '',
    'encrypt' => false,
    'compress' => false,
    'stricton' => false,
    'failover' => array(),
    'save_queries' => true,
);

$db['erp'] = array(
    'dsn' => '',
    'localhost' => '192.168.1.78',
);
