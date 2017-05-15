<?php
$db['oa_pdo'] = array(
	'dsn' => 'mysql:host=localhost;port=3336;dbname=td_oa;charset=utf8',
	'username' => 'root',
	'password' => 'HCHPrb3*^@GN9!J769',
	'dbdriver' => 'pdo',
	'pconnect' => FALSE,
	'db_debug' => (ENVIRONMENT !== 'production'),
	'cache_on' => FALSE,
	'cachedir' => '',
	'dbcollat' => 'gbk_chinese_ci',
	'swap_pre' => '',
	'encrypt' => FALSE,
	'compress' => FALSE,
	'stricton' => FALSE,
	'failover' => array(),
	'save_queries' => TRUE
);

$db['erp'] = array(
	'dsn'=> '',
	'localhost'=> '192.168.1.78'
);