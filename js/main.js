var fadeTopEffect = {
    setInit: function() {
        $(window).scroll(function() {
            $(".fadeTop").each(function() {
                var elemPos = $(this).offset().top;
                var scroll = $(window).scrollTop();
                var windowHeight = $(window).height();
                if (scroll > elemPos - windowHeight + 100) {
                    $(this).addClass('ef-slide');
                }
            });
        }).trigger("scroll");
    },
}


$(document).ready(function() {
    // Check version IE
    if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
        $('body').append("<link rel='stylesheet' type='text/css' href='css/ieOnly.css' />");
    }

    // fade list title Slider
    setTimeout(function() {
        $('.sectionSlider .titleSection:first').addClass('fadeUp');
    }, 500);
    setTimeout(function() {
        $('.sectionSlider .titleSection').eq(1).addClass('fadeUp');
    }, 1000);
    setTimeout(function() {
        $('.sectionSlider .titleSection:first').fadeOut('');
        $('.sectionSlider .titleSection').eq(1).fadeOut('');
        $('.sectionSlider .titleSection').eq(2).addClass('fadeUp');
    }, 2000);

    // Show three news first : Mobile
    var widthBr = $(window).width();
    var heightBr = $(window).height();
    if (widthBr <= 768) {
        // Option slider 02
        var flagActive = true;
        var slidesToScroll_number = 1;
        var slidesToScroll_show = 1;
        var widthCenter = '20px';

        $('.contentSection .itemTopic:gt(2)').hide();
        $(window).scroll(function(event) {
            if ($(this).scrollTop() > indexListMenu - 62) {
                $('.sectionThumbnail').addClass('fixed').next().css({
                    'padding-top': hThumb + pdtNext,
                    'transition-duration': "0ms"
                });
            } else {
                $('.sectionThumbnail').removeClass('fixed').next().css('padding-top', pdtNext);
            }
        });
        var headMb_height = $('.wrapheaderMb').outerHeight(true);
        var heightSlider = parseInt(heightBr - headMb_height - 65);
        $('.sectionSlider').css('height', heightSlider);
        $('.m-slider').css('height', heightSlider);
        $('.m-slider .image').css('height', heightSlider);
        $('.slick-list.draggable').css('height', heightSlider);
    } else {
        var flagActive = false;
        var slidesToScroll_number = 2;
        var slidesToScroll_show = 2;
        var widthCenter = '0px';
    }

    // slider 02 TopPage
    $('.sliderList-2').slick({
        centerPadding: widthCenter,
        dots: true,
        infinite: true,
        centerMode: flagActive,
        slidesToShow: slidesToScroll_show,
        slidesToScroll: slidesToScroll_number
    });

setTimeout(function () {
    var aaa = $('.slick-track').css('left');
    console.log(aaa);
}, 3000);
    // Slider-in menu left
    $('.gnav').css("left", "0");

    // Fade title slider
    $('.sectionSlider .titleSection').css({
        "opacity": "1",
        "top": "253px"
    });

    fadeTopEffect.setInit();
    // Show five news first : PC
    $('.contentSection .itemTopic:gt(4)').hide();

    // Toggle nav mobile
    $('.wrapheaderMb .toggle').click(function(event) {
        $('.navHeader').fadeToggle('fast');
        // Toggle img
        var urlI = $(this).find('img');
        let openNav = "images/toggle.png";
        let closeNav = "images/toggle_close.png";
        if (urlI.attr('src') === openNav) {
            $('.toggle img').attr('src', closeNav);
        } else {
            $('.toggle img').attr('src', openNav);
        }
    });

    // Hover images

    // Fixed menu list
    try {
        var indexListMenu = $('.sectionThumbnail').offset().top;
        var hThumb = $('.sectionThumbnail').outerHeight(true);
        var pdtNext = parseInt($('.sectionThumbnail').next().css('padding-top').split("px"));
        $(window).scroll(function(event) {
            if ($(this).scrollTop() > indexListMenu) {
                $('.sectionThumbnail').addClass('fixed').next().css({
                    'padding-top': hThumb + pdtNext,
                    'transition-duration': "0ms"
                });
            } else {
                $('.sectionThumbnail').removeClass('fixed').next().css('padding-top', pdtNext);
            }
        });
    } catch (err) {}

    // Hover listProduct
    $('.listNews .item').hover(function() {
        var url = $(this).find('.btnNewsM');
        $(this).find('.btnNewsM').attr('src', $(this).find('.btnNewsM').attr('src').replace('-ovoff', '-ovon'));
    }, function() {
        $(this).find('.btnNewsM').attr('src', $(this).find('.btnNewsM').attr('src').replace('-ovon', '-ovoff'));
    });

    // Set height for menu listTop mobile
    equalheight = function(container) {
        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;
        $(container).each(function() {

            $el = $(this);
            $($el).height('auto')
            topPostion = $el.position().top;

            if (currentRowStart != topPostion) {
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0; // empty the array
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            } else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    }
    $(window).load(function() {
        equalheight('.sectionThumbnail .items');
        equalheight('.row2 .name');
        equalheight('.row3 .note');
        equalheight('.row4 .note');
    });
    $(window).resize(function() {
        equalheight('.sectionThumbnail .items');
        equalheight('.row2 .name');
        equalheight('.row3 .note');
        equalheight('.row4 .note');
    });
});
