
$(document).ready(function () {

    var $action = $('#action');
    /*setTimeout(function () {
        $action.dialog({
            autoOpen: true,
            modal: true,
            width: 769,
            open: function () {
                $('.ui-widget-overlay').on('click', function () {
                    $action.dialog('close');
                });
            },
            close: function () {
                $action.dialog('destroy');
            }
        });
        return false;
    }, 20000);*/


    var catalog_cur_tab = 1;
    $('.catalog .tabs .item').on('click', function () {

        var this_tab = $(this).data('id');

        if (catalog_cur_tab != this_tab) {

            $('.catalog .tabs .item.cur').removeClass('cur');
            $(this).addClass('cur');

            $('.catalog .products ul[data-id="' + this_tab + '"]').show();
            $('.catalog .products ul[data-id="' + catalog_cur_tab + '"]').hide();

            catalog_cur_tab = this_tab;
        }

        return false;
    });
//Транслитерация 
    function cyr2lat(str) {

        var cyr2latChars = new Array(
                ['а', 'a'], ['б', 'b'], ['в', 'v'], ['г', 'g'],
                ['д', 'd'], ['е', 'e'], ['ё', 'yo'], ['ж', 'zh'], ['з', 'z'],
                ['и', 'i'], ['й', 'y'], ['к', 'k'], ['л', 'l'],
                ['м', 'm'], ['н', 'n'], ['о', 'o'], ['п', 'p'], ['р', 'r'],
                ['с', 's'], ['т', 't'], ['у', 'u'], ['ф', 'f'],
                ['х', 'h'], ['ц', 'c'], ['ч', 'ch'], ['ш', 'sh'], ['щ', 'shch'],
                ['ъ', ''], ['ы', 'y'], ['ь', ''], ['э', 'e'], ['ю', 'yu'], ['я', 'ya'],
                ['А', 'A'], ['Б', 'B'], ['В', 'V'], ['Г', 'G'],
                ['Д', 'D'], ['Е', 'E'], ['Ё', 'YO'], ['Ж', 'ZH'], ['З', 'Z'],
                ['И', 'I'], ['Й', 'Y'], ['К', 'K'], ['Л', 'L'],
                ['М', 'M'], ['Н', 'N'], ['О', 'O'], ['П', 'P'], ['Р', 'R'],
                ['С', 'S'], ['Т', 'T'], ['У', 'U'], ['Ф', 'F'],
                ['Х', 'H'], ['Ц', 'C'], ['Ч', 'CH'], ['Ш', 'SH'], ['Щ', 'SHCH'],
                ['Ъ', ''], ['Ы', 'Y'],
                ['Ь', ''],
                ['Э', 'E'],
                ['Ю', 'YU'],
                ['Я', 'YA'],
                ['a', 'a'], ['b', 'b'], ['c', 'c'], ['d', 'd'], ['e', 'e'],
                ['f', 'f'], ['g', 'g'], ['h', 'h'], ['i', 'i'], ['j', 'j'],
                ['k', 'k'], ['l', 'l'], ['m', 'm'], ['n', 'n'], ['o', 'o'],
                ['p', 'p'], ['q', 'q'], ['r', 'r'], ['s', 's'], ['t', 't'],
                ['u', 'u'], ['v', 'v'], ['w', 'w'], ['x', 'x'], ['y', 'y'],
                ['z', 'z'],
                ['A', 'A'], ['B', 'B'], ['C', 'C'], ['D', 'D'], ['E', 'E'],
                ['F', 'F'], ['G', 'G'], ['H', 'H'], ['I', 'I'], ['J', 'J'], ['K', 'K'],
                ['L', 'L'], ['M', 'M'], ['N', 'N'], ['O', 'O'], ['P', 'P'],
                ['Q', 'Q'], ['R', 'R'], ['S', 'S'], ['T', 'T'], ['U', 'U'], ['V', 'V'],
                ['W', 'W'], ['X', 'X'], ['Y', 'Y'], ['Z', 'Z'],
                [' ', '-'], ['0', '0'], ['1', '1'], ['2', '2'], ['3', '3'],
                ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8'], ['9', '9'],
                ['-', '-']

                );

        var newStr = new String();

        for (var i = 0; i < str.length; i++) {

            ch = str.charAt(i);
            var newCh = '';

            for (var j = 0; j < cyr2latChars.length; j++) {
                if (ch == cyr2latChars[j][0]) {
                    newCh = cyr2latChars[j][1];

                }
            }
            // Если найдено совпадение, то добавляется соответствие, если нет - пустая строка
            newStr += newCh;

        }
        // Удаляем повторяющие знаки - Именно на них заменяются пробелы.
        // Так же удаляем символы перевода строки, но это наверное уже лишнее
        return newStr.replace(/[-]{2,}/gim, '-').replace(/\n/gim, '');
    }

//генерация ссылок меню
    var menu = $('.menu li');
    $.each(menu, function (index, value) {

        $(value).find('a').attr('href', cyr2lat($(value).find('span').text()).toLowerCase());
        if (window.location.pathname == '/' + cyr2lat($(value).find('span').text()).toLowerCase()) {
            var hash = $(value).data('id');
            var product = $('[data-block=' + hash + ']');
            if (product.length) {

                var to_pos = Number(product.offset().top);

                window.scrollTo(0, to_pos);

                //$('.active').removeClass('active');
                //$(this).addClass('active');
            }
        }
    });
//
    $('.menu li').click(function () {
        var url = $(this).find('a').attr('href');
        if (url != window.location) {
            window.history.pushState(null, null, url);
        }

        var hash = $(this).data('id');
        var product = $('[data-block=' + hash + ']');

        if (product.length) {

            var to_pos = Number(product.offset().top);

            $('html, body').animate({scrollTop: to_pos}, 1000, function () {
            });

            //$('.active').removeClass('active');
            //$(this).addClass('active');

            return false;
        }
    });

    var $tobottom = $('a.down');
    $tobottom.click(function () {
        $('body,html').animate({scrollBottom: 0}, 500);
        return false;
    });

    var $totop = $('.up');
    $totop.click(function () {
        $('body,html').animate({scrollTop: 0}, 500);
        return false;
    });

    $('.menu').toShowHide({
        method: 'click',
        box: 'ul',
        button: '.open',
        effect: 'slide',
        anim_speed: 400
    });

    $('.menu li').toShowHide({
        method: 'hover',
        box: 'span',
        effect: 'slide',
        anim_speed: 300,
        delay: 100
    });

    var $thank = $('#thank');
    $thank.dialog({
        autoOpen: false,
        modal: true,
        width: 500,
        open: function () {
            $('.ui-widget-overlay').on('click', function () {
                $thank.dialog('close');
            });
        },
        close: function () {
            //$thank.dialog('destroy');
        }
    });

    $('.fancybox').fancybox();
    $('.counter').upTime();
    $(".mask").mask("+7 (999) 999 99 99");
    $('input[placeholder], textarea[placeholder]').placeholder();

    var $order = $('#order');
    $('.catalog .products li a.button').on('click', function () {

        var title = $(this).find('span').html();
        title = title.replace(new RegExp('"', 'g'), "");

        $order.dialog({
            autoOpen: true,
            modal: true,
            width: 471,
            open: function () {
                $('.ui-widget-overlay').on('click', function () {
                    $order.dialog('close');
                });
                $order.find('input[name="title"]').val(title);
                $order.find('.head span').html(title);
            },
            close: function () {
                $order.dialog('destroy');
            }
        });

        return false;
    });

    $('form.order').ajaxForm({
        beforeSubmit: function (arr, $form, options) {

            if ($form.find('input[name=phone]').fieldValue() == '') {
                alert('Вы должны заполнить поле - "Ваш телефон"!');
                return false;
            }

        },
        success: function (data) {
            if (data != 'ok') {
                alert(data);
            } else {
                ga('send', 'event', 'lead', 'add', 'order');
                yaCounter29177520.reachGoal("order");
                $thank.dialog('open').html('Спасибо, мы свяжемся с вами в течении 10 мин.');
                $('form.callback').find('input[type=text], textarea').val('');
                setTimeout(function () {
                    $callback.dialog('close');
                    $thank.dialog('close');
                }, 3000);
            }
        }
    });

    var $catalog = $('#catalog');
    $('.catalog .products .application a').on('click', function () {
        $catalog.dialog({
            autoOpen: true,
            modal: true,
            width: 471,
            open: function () {
                $('.ui-widget-overlay').on('click', function () {
                    $catalog.dialog('close');
                });
            },
            close: function () {
                $catalog.dialog('destroy');
            }
        });
        return false;
    });

    $('form.catalog-form').ajaxForm({
        beforeSubmit: function (arr, $form, options) {

            if ($form.find('input[name=phone]').fieldValue() == '') {
                alert('Вы должны заполнить поле - "Ваш телефон"!');
                return false;
            }

        },
        success: function (data) {
            if (data != 'ok') {
                alert(data);
            } else {
                ga('send', 'event', 'lead', 'add', 'callback');
                yaCounter29177520.reachGoal("callback");
                $thank.dialog('open').html('Спасибо, мы свяжемся с вами в течении 10 мин.');
                $('form.catalog-form').find('input[type=text], textarea').val('');
                setTimeout(function () {
                    $catalog.dialog('close');
                    $thank.dialog('close');
                }, 2000);
            }
        }
    });

    var $callback = $('#callback');
    $('.call-back').on('click', function () {
        $callback.dialog({
            autoOpen: true,
            modal: true,
            width: 471,
            open: function () {
                $('.ui-widget-overlay').on('click', function () {
                    $callback.dialog('close');
                });
            },
            close: function () {
                $callback.dialog('destroy');
            }
        });
        return false;
    });

    $('form.callback').ajaxForm({
        beforeSubmit: function (arr, $form, options) {

            if ($form.find('input[name=phone]').fieldValue() == '') {
                alert('Вы должны заполнить поле - "Ваш телефон"!');
                return false;
            }

        },
        success: function (data) {
            if (data != 'ok') {
                alert(data);
            } else {
                ga('send', 'event', 'lead', 'add', 'callback');
                yaCounter29177520.reachGoal("callback");
                $thank.dialog('open').html('Спасибо, мы свяжемся с вами в течении 10 мин.');
                $('form.callback').find('input[type=text], textarea').val('');
                setTimeout(function () {
                    $callback.dialog('close');
                    $thank.dialog('close');
                }, 2000);
            }
        }
    });

    $('form.share-form').ajaxForm({
        beforeSubmit: function (arr, $form, options) {

            if ($form.find('input[name=phone]').fieldValue() == '') {
                alert('Вы должны заполнить поле - "Ваш телефон"!');
                return false;
            }

        },
        success: function (data) {
            if (data != 'ok') {
                alert(data);
            } else {
                $thank.dialog('open').html('Спасибо, мы свяжемся с вами в течении 10 мин.');
                ga('send', 'event', 'lead', 'add', 'share');
                yaCounter29177520.reachGoal("share");
                $('form.share-form').find('input[type=text], textarea').val('');
                setTimeout(function () {
                    $thank.dialog('close');
                }, 3000);
            }
        }
    });

    $('form.consult-form').ajaxForm({
        beforeSubmit: function (arr, $form, options) {

            if ($form.find('input[name=phone]').fieldValue() == '') {
                alert('Вы должны заполнить поле - "Ваш телефон"!');
                return false;
            }

        },
        success: function (data) {
            if (data != 'ok') {
                alert(data);
            } else {
                ga('send', 'event', 'lead', 'add', 'consult');
                yaCounter29177520.reachGoal("consult");
                $thank.dialog('open').html('Спасибо, мы свяжемся с вами в течении 10 мин.');
                $('form.consult-form').find('input[type=text], textarea').val('');
                setTimeout(function () {
                    $thank.dialog('close');
                }, 3000);
            }
        }
    });

    $('form.measured-form').ajaxForm({
        beforeSubmit: function (arr, $form, options) {

            if ($form.find('input[name=phone]').fieldValue() == '') {
                alert('Вы должны заполнить поле - "Ваш телефон"!');
                return false;
            }

        },
        success: function (data) {
            if (data != 'ok') {
                alert(data);
            } else {
                ga('send', 'event', 'lead', 'add', 'msrment');
                yaCounter29177520.reachGoal("msrment");
                $thank.dialog('open').html('Спасибо, мы свяжемся с вами в течении 10 мин.');
                $('form.measured-form').find('input[type=text], textarea').val('');
                setTimeout(function () {
                    $thank.dialog('close');
                }, 3000);
            }
        }
    });

});

$(window).load(function () {

    $('.slider ul').carouFredSel({
        circular: true,
        infinite: true,
        auto: false,
        responsive: true,
        scroll: {
            duration: 800,
            items: 1
        },
        items: {
            height: 'variable',
            visible: 3
        },
        pagination: '.slider .nav',
    });

    $('.sl-box ul').carouFredSel({
        circular: true,
        infinite: true,
        auto: false,
        responsive: true,
        scroll: {
            duration: 800,
            items: 1
        },
        items: {
            height: 'variable',
            visible: 3
        },
        pagination: '.sl-box .nav',
    });

});

$.fn.upTime = function () {

    return this.each(function () {

        var $this = $(this);
        var end_time = new Date($this.attr('data-time'));

        refresh();

        window.setInterval(function () {
            refresh();
        }, 1000);

        function refresh() {

            var time = new Date();
            var totalRemains = (end_time.getTime() - time.getTime());

            if (totalRemains > 1) {

                var RemainsSec = (parseInt(totalRemains / 1000));
                var RemainsFullDays = (parseInt(RemainsSec / (24 * 60 * 60)));
                if (RemainsFullDays < 10) {
                    RemainsFullDays = '0' + RemainsFullDays;
                }
                var secInLastDay = RemainsSec - RemainsFullDays * 24 * 3600;
                var RemainsFullHours = (parseInt(secInLastDay / 3600));
                if (RemainsFullHours < 10) {
                    RemainsFullHours = '0' + RemainsFullHours;
                }
                var secInLastHour = secInLastDay - RemainsFullHours * 3600;
                var RemainsMinutes = (parseInt(secInLastHour / 60));
                if (RemainsMinutes < 10) {
                    RemainsMinutes = '0' + RemainsMinutes;
                }
                var lastSec = secInLastHour - RemainsMinutes * 60;
                if (lastSec < 10) {
                    lastSec = '0' + lastSec
                }
                ;

                if ($('.d', $this).length) {
                    $('.d', $this).html(RemainsFullDays);
                }
                $('.h', $this).html(RemainsFullHours);
                $('.m', $this).html(RemainsMinutes);
                $('.s', $this).html(lastSec);

            } else {
                if ($('.d', $this).length) {
                    $('.d', $this).html('00');
                }
                $('.h', $this).html('00');
                $('.m', $this).html('00');
                $('.s', $this).html('00');
            }
        }

    });
};

/*function Unloader(){
 
 var o = this;
 
 this.unload = function(evt)
 {
 var message = "Вы уверены, что хотите покинуть страницу оформления заказа?";
 if (typeof evt == "undefined") {
 evt = window.event;
 }
 if (evt) {
 evt.returnValue = message;
 }
 return message;
 }
 
 this.resetUnload = function()
 {
 $(window).off('beforeunload', o.unload);
 
 setTimeout(function(){
 $(window).on('beforeunload', o.unload);
 }, 1000);
 }
 
 this.init = function()
 {
 $(window).on('beforeunload', o.unload);
 
 $('a').on('click', o.resetUnload);
 $(document).on('submit', 'form', o.resetUnload);
 $(document).on('keydown', function(event){
 if((event.ctrlKey && event.keyCode == 116) || event.keyCode == 116){
 o.resetUnload();
 }
 });
 }
 this.init();
 }
 
 $(function(){
 if(typeof window.obUnloader != 'object')
 {
 window.obUnloader = new Unloader();
 }
 })*/