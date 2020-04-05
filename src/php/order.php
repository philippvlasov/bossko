<?php

require 'settings.php';
require 'methods.php';

$data = [];
$data['name'] = clean($_POST['name']);
$data['tel'] = clean($_POST['tel']);
$data['email'] = clean($_POST['email']);
$data['area'] = clean($_POST['area']);
$data['cleaningType'] = clean($_POST['cleaningType']);
$data['price'] = clean($_POST['price']);

$message = "$subjectOrder \r\nИмя: " . $data['name']
    . "\nE-mail: " . $data['email']
    . "\nТелефон: " . $data['tel']
    . "\nПлощадь: " . $data['area'] . ' кв. м.'
    . "\nТип уборки: " . $data['cleaningType']
    . "\nСтоимость: " . $data['price'] . ' руб';

if (checkEmpty($data) && filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    sendMessageToTelegram($token, $chat_id_list, $message);
    sendMessageToMail($to, $subjectOrder, $message);
    echo 'Ваша заявка принята. Мы перезвоним Вам в течение 9 минут!';
} else {
    // TODO вывести ошибку в аякс
    echo 'Что-то пошло не так. Проверьте правильнось введенных данных';

}





