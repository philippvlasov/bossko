<?php
$area = $_POST['area'];
$type = $_POST['type'];
/*$headers = 'MIME-Version: 1.0' . "\r\n"; // заголовок соответствует формату плюс символ перевода строки
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n"; // указывает на тип посылаемого контента
mail('aksenov.andrew@gmail.com', 'test', '$message', $headers); //отправляет получателю на емайл значения переменных
*/
echo $area . '<br>' . $type;
?>