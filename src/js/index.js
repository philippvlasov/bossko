$(document).ready(function () {
    $('.slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    });
});

(function ($) {
    const Component = function (container) {
        this.$container = $(container);
        this.$area = this.$container.find('[name="area"]');
        this.$type = this.$container.find('[name="cleaningType"]');
        this.$displayPrice = this.$container.find('.calc-price');
    };

    $.extend(true, Component.prototype, {
        init() {
            this._bindInteractions();
            this.$container.addClass('initialized');
        },

        _calculate() {
            const areaValue = this.$area[0].value;
            const cleaningType = parseInt(this.$type[0].value);
            let price;

            switch (cleaningType) {
                case 1:
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
                case 2:
                    price = areaValue * 140;
                    break;
                case 3:
                    price = areaValue * 190;
                    break;
                case 4:
                    price = areaValue * 150;
                    break;
                case 5:
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
            this.$displayPrice.text(price);
        },

        _bindInteractions() {
            this.$area.on('input', this._calculate.bind(this))
            this.$type.on('input', this._calculate.bind(this))
        },
    });
    const $component = $('.mainForm:not(.initialized)');
    let instance;

    $component.each((i, item) => {
        instance = new Component(item);
        instance.init();
    });
}(jQuery));
