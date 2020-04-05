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
    echo 'Ваша заявка принята. Мы перезвоним Вам в течение 9 минут!';
} else {
    echo 'Что-то пошло не так. Проверьте правильнось введенных данных';
}