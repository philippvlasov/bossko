$(document).ready(function () {
    $('.slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                    dots: true
                }
            },
        ]
    });
});

(function ($) {
    const Component = function (container) {
        this.$container = $(container);
        this.$area = this.$container.find('[name="area"]');
        this.$type = this.$container.find('[name="cleaningType"]');
        this.$displayPrice = this.$container.find('.calc-price');
        this.$finalForm = $('#finalForm');
        this.price = 0;
    };

    $.extend(true, Component.prototype, {
        init() {
            this._bindInteractions();
            this.$container.addClass('initialized');
        },

        _calculate() {
            const areaValue = this.$area[0].value;
            const cleaningType = this.$type[0].value;
            let price;

            switch (cleaningType) {
                case 'Регулярная уборка':
                    if (areaValue > 0 && areaValue <= 300) {
                        price = 5500;
                    } else if (areaValue > 300 && areaValue <= 600) {
                        price = 10000;
                    } else if (areaValue > 600 && areaValue <= 900) {
                        price = 16000;
                    } else if (areaValue > 900 && areaValue <= 1200) {
                        price = 22000;
                    } else if (areaValue > 1200 && areaValue <= 1500) {
                        price = 27000;
                    } else if (areaValue > 1500 && areaValue <= 1800) {
                        price = 32000;
                    } else if (areaValue >= 1800) {
                        price = 37000;
                    }
                    break;
                case 'Генеральная уборка':
                    price = areaValue * 140;
                    break;
                case 'Уборка после ремонта':
                    price = areaValue * 190;
                    break;
                case 'Мойка окон c одной стороны':
                    price = areaValue * 150;
                    break;
                case 'Мойка окон с двух сторон':
                    price = areaValue * 250;
                    break;
                default:
                    break;
            }
            if (!areaValue || areaValue == 0) {
                price = '...';
            }
            this._displayPrice(price);
        },

        _displayPrice(price) {
            this.price = price;
            this.$displayPrice.text(price);
        },

        _submitForm() {
            event.preventDefault();
            if (this.$container.is('#finalForm')) {
                const form = $(this.$container)[0];
                const data = new FormData(form);

                $.ajax({
                    type: "POST",
                    enctype: 'multipart/form-data',
                    url: "order.php",
                    data: data,
                    processData: false,
                    contentType: false,
                    cache: false,
                    timeout: 800000,
                    success: function (data) {
                        console.log("SUCCESS : ", data);
                        const $modal = $('#success');
                        const result = $($modal[0]).find('.result');
                        result.text('Your result text for success');
                        $modal.modal('show');
                    },
                    error: function (e) {
                        console.log("ERROR : ", e);
                        const $modal = $('#fail');
                        const result = $($modal[0]).find('.result');
                        result.text('Your result text for success');
                        $modal.modal('show');

                    }
                });
                return;
            }

            this.$finalForm.find('[name="area"]').val(this.$area[0].value);
            this.$finalForm.find('[name="cleaningType"]').val(this.$type[0].value);
            this.$finalForm.find('.calc-price').text(this.price);
            $('html, body').animate({
                scrollTop: $(this.$finalForm).offset().top
            }, 500);
        },

        _bindInteractions() {
            this.$area.on('input', this._calculate.bind(this));
            this.$type.on('input', this._calculate.bind(this));
            this.$container.on('submit', this._submitForm.bind(this));
        },
    });
    const $component = $('.mainForm:not(.initialized)');
    let instance;

    $component.each((i, item) => {
        instance = new Component(item);
        instance.init();
    });
}(jQuery));

(function ($) {
    const Component = function (container) {
        this.$container = $(container);
    };

    $.extend(true, Component.prototype, {
        init() {
            this._bindInteractions();
            this.$container.addClass('initialized');
        },

        _scrollTo() {
            event.preventDefault();
            event.stopPropagation();
            const targetSection = this.$container.attr('href');
            console.log(this.$container.attr('href'));
            $('html, body').animate({
                scrollTop: $(`.${targetSection}`).offset().top
            }, 500);
        },

        _bindInteractions() {
            this.$container.on('click', this._scrollTo.bind(this));
        },
    });
    const $component = $('.scroll-button:not(.initialized)');
    let instance;

    $component.each((i, item) => {
        instance = new Component(item);
        instance.init();
    });
}(jQuery));
