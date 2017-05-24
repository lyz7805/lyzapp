<?php

// require_once './config.php';

function openConnection()
{
    $serverName = "tcp:192.168.1.78\SQL2008";
    $connectionOptions = array(
            'Database' => 'cwbase52',
            'UID' => 'sa',
            'PWD' => 'Relations123',
    );
    $conn = sqlsrv_connect($serverName, $connectionOptions);
    if ($conn == false) {
        die(print_r(sqlsrv_errors()));
    }

    return $conn;
}
