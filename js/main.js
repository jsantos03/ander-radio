jQuery(document).ready(function ($) {

    var cantidadImagenes = 9;
    cargarImagenesFondo();

    'use strict';


    $(".Modern-Slider").slick({
        autoplay: true,
        autoplaySpeed: 8000, // Duración en milisegundos (6 segundos) que cada imagen se muestra
        speed: 4000, // Duración de la transición en milisegundos (1 segundo)
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        dots: true,
        fade: true,
        pauseOnDotsHover: true,
        cssEase: 'linear',
        // fade:true,
        draggable: false,
        prevArrow: '<button class="PrevArrow"></button>',
        nextArrow: '<button class="NextArrow"></button>',
    });

    $('#nav-toggle').on('click', function (event) {
        event.preventDefault();
        $('#main-nav').toggleClass("open");
    });


    $('.tabgroup > div').hide();
    $('.tabgroup > div:first-of-type').show();
    $('.tabs a').click(function (e) {
        e.preventDefault();
        var $this = $(this),
            tabgroup = '#' + $this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();

    })

    $(".box-video").click(function () {
        $('iframe', this)[0].src += "&amp;autoplay=1";
        $(this).addClass('open');
    });

    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: true,
                loop: false
            }
        }
    })

    var contentSection = $('.content-section, .main-banner');
    var navigation = $('nav');

    //when a nav link is clicked, smooth scroll to the section
    navigation.on('click', 'a', function (event) {
        event.preventDefault(); //prevents previous event
        smoothScroll($(this.hash));
    });

    //update navigation on scroll...
    $(window).on('scroll', function () {
        updateNavigation();
    })
    //...and when the page starts
    updateNavigation();

    /////FUNCTIONS
    function updateNavigation() {
        contentSection.each(function () {
            var sectionName = $(this).attr('id');
            var navigationMatch = $('nav a[href="#' + sectionName + '"]');
            if (($(this).offset().top - $(window).height() / 2 < $(window).scrollTop()) &&
                ($(this).offset().top + $(this).height() - $(window).height() / 2 > $(window).scrollTop())) {
                navigationMatch.addClass('active-section');
            }
            else {
                navigationMatch.removeClass('active-section');
            }
        });
    }
    function smoothScroll(target) {
        $('body,html').animate({
            scrollTop: target.offset().top
        }, 800);
    }

    $('.button a[href*=#]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - 0 }, 500, 'linear');
    });

    function cargarImagenesFondo() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile)
            cantidadImagenes = 7;


        for (var i = 1; i <= cantidadImagenes; i++) {

            var item = document.createElement("div");
            item.id = i;
            item.className = "item item-" + i;

            var imagenFill = document.createElement("div");
            imagenFill.className = "img-fill";

            var imagen = document.createElement("div");
            imagen.className = "image";
            if (isMobile)
                imagen.style = "background-image: url(./img/fondos/mobile/" + i + ".jpg)";
            else
                imagen.style = "background-image: url(./img/fondos/" + i + ".jpg)";

            imagenFill.appendChild(imagen);
            item.appendChild(imagenFill);

            document.getElementById("top").appendChild(item)
        }
    }

    $("#btnContraerMenu").click(function () {
        $("#menuLateral").addClass("hidden");
        $("#btnContraerMenu").addClass("hidden");
        $("#btnDesplegarMenu").removeClass("hidden");
    });

    $("#btnDesplegarMenu").click(function () {
        $("#menuLateral").removeClass("hidden");
        $("#btnContraerMenu").removeClass("hidden");
        $("#btnDesplegarMenu").addClass("hidden");
    });

    $("#btnPlay").click(function () {
        document.getElementById("radioStream").play();
        $("#btnPlay").addClass("hidden");
        $("#btnPause").removeClass("hidden");
    });

    $("#btnPause").click(function () {
        document.getElementById("radioStream").pause();
        $("#btnPause").addClass("hidden");
        $("#btnPlay").removeClass("hidden");
    });

    $("#subirVolumen").click(function () {
        if (document.getElementById("radioStream").volume < 1)
            document.getElementById("radioStream").volume = document.getElementById("radioStream").volume + 0.10;
    });

    $("#bajarVolumen").click(function () {
        if (document.getElementById("radioStream").volume > 0.2)
            document.getElementById("radioStream").volume = document.getElementById("radioStream").volume - 0.10;
    });

});