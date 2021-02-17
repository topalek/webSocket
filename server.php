<?php

use Workerman\Worker;

require_once __DIR__ . '/vendor/autoload.php';

$ws = new Worker('websocket://0.0.0.0:1080');
$ws->count = 4;

$ws->onConnect = function ($connection) {
    echo "connection established\n";
};

$ws->onMessage = function ($connection, $data) use ($ws) {
    foreach ($ws->connections as $clientConnection) {
        $clientConnection->send($data);
    }
};

$ws->onClose = function ($connection) {
    echo "connection closed\n";
};
Worker::runAll();
