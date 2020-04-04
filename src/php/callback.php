<?php
require 'settings.php';
require 'methods.php';

$data = [];
$data['name'] = clean($_POST['name']);
$data['tel'] = clean($_POST['tel']);
$data['email'] = clean($_POST['email']);

$message = "$subjectCallback  \r\nИмя: " . $data['name']
    . "\nE-mail: " . $data['email']
    . "\nТелефон: " . $data['tel'];

if (checkEmpty($data) && filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    sendMessageToTelegram($token, $chat_id_list, $message);
    sendMessageToMail($to, $subjectCallback, $message);
} else {
    // TODO вывести ошибку в аякс
    var_dump('empty');
    die;
}