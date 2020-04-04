<?php

require 'settings.php';
require 'methods.php';

$data = [];
$data['name'] = clean($_POST['name']);
$data['tel'] = clean($_POST['tel']);
$data['email'] = clean($_POST['email']);
$data['area'] = clean($_POST['area']);
$data['cleaningType'] = clean($_POST['cleaningType']);

$message = "$subjectOrder \r\nИмя: " . $data['name']
    . "\nE-mail: " . $data['email']
    . "\nТелефон: " . $data['tel']
    . "\nПлощадь: " . $data['area']
    . "\nТип уборки: " . $data['cleaningType'];

if (checkEmpty($data) && filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    sendMessageToTelegram($token, $chat_id_list, $message);
    sendMessageToMail($to, $subjectOrder, $message);
} else {
    // TODO вывести ошибку в аякс
    var_dump('empty');
    die;
}





//echo json_encode(array('yyy' => true,
//    'userInfo' => 1,
//    'name' => ($_POST['data'])));

