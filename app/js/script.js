// Instantiating the global app object
var app = {};
var number = 1;

$('.my_btn').on('click', function () {
    return number++;
});

$('.result').on('click', function () {
    console.log(number);
});
