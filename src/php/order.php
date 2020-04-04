<?php

require 'settings.php';

$data = [];
$data['name'] = clean($_POST['name']);
$data['tel'] = clean($_POST['tel']);
$data['email'] = clean($_POST['email']);
$data['area'] = clean($_POST['area']);
$data['cleaningType'] = clean($_POST['cleaningType']);

$message = "Новая заявка на сайте! \r\nИмя: " . $data['name']
    . "\nE-mail: " . $data['email']
    . "\nТелефон: " . $data['tel']
    . "\nПлощадь: " . $data['area']
    . "\nТип уборки: " . $data['cleaningType'];

if (checkEmpty($data) && filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    sendMessageToTelegram($token, $chat_id_list, $message);
    sendMessageToMail($to, $subject, $message);
} else {
    // TODO вывести ошибку в аякс
    var_dump('empty');
    die;
}

function checkEmpty(array $array)
{
    foreach ($array as $a) {
        if (empty($a)) {
            // TODO вывести ошибку в аякс
            var_dump('something went wrong');
            die();
        }
        return true;
    }
}
function clean($value = "")
{
    $value = trim($value);
    $value = stripslashes($value);
    $value = strip_tags($value);
    $value = htmlspecialchars($value);
    return $value;
}

function sendMessageToTelegram($token, $chat_id_list, $messageToTelegram)
{
    for ($i = 0; $i < count($chat_id_list); $i++) {
        file_get_contents('https://api.telegram.org/bot'
            . $token
            . '/sendMessage?chat_id='
            . $chat_id_list[$i]
            . '&text='
            . urlencode($messageToTelegram));
    }
}

function sendMessageToMail($to, $subject, $message)
{
    $headers = 'MIME-Version: 1.0' . "\r\n"; // заголовок соответствует формату плюс символ перевода строки
    $headers .= 'Content-type: text/plain; charset=utf-8' . "\r\n"; // указывает на тип посылаемого контента
    mail($to, $subject, $message, $headers); //отправляет получателю на емайл значения переменных

}



//echo json_encode(array('yyy' => true,
//    'userInfo' => 1,
//    'name' => ($_POST['data'])));

?>