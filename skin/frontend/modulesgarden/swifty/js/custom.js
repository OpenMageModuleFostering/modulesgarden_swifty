
'use strict';

;(function($, window, document, undefined) {
    
    $(window)
        .resize(function() {
            $('.menu_mobile').hide();
            $('#nav', '#mainNav').find('ul').hide();
            
            topNav();
        })
        .load(function() {
            $('#select-language, .toolbar select, .sorter select').selectric();
        
            //left value for category description - absolute
            var 
                $categoryTitle = $(".category-title"),
                leftValue = $categoryTitle.outerWidth(),
                cartTableHeight = $(".totals").outerHeight();
                
            $categoryTitle.next(".category-description").css("left", leftValue + 10 + 'px');
            // height for cart table
            $(".cart").find("#shopping-cart-table").css("min-height", cartTableHeight + "px");
        });
        
    $(document).ready(function() {
        $('.fancybox-img').fancybox();
    
        $("#layerslider").layerSlider({
            responsive: false,
            responsiveUnder: 1280,
            layersContainer: 1280,
            skin: 'noskin',
            hoverPrevNext: false,
            skinsPath: '../skin/frontend/modulesgarden/swifty/js/layerslider/skins/'
        });
        
        $('.products-grid')
            .on('mouseenter', '.item', function() {
                var $this = $(this);
            
                $this.children('.gird_prod_desc').children('.price-box').hide();
                $this.find('.hover').show();
            })
            .on('mouseleave', '.item', function() {
                var $this = $(this);
            
                $this.children('.gird_prod_desc').children('.price-box').show();
                $this.find('.hover').hide();
            });
            
        var $toolbar = $('.toolbar');
        
        $toolbar.first().children('.pager').hide();
        $toolbar.last().children('.sorter').hide();
        
        $(".links").find('a').wrapInner("<span></span>");
        $("a.icon-user").prepend("<i class='fa fa-user fa-lg'></i>");
        $("a.icon-wishlist").prepend("<i class='fa fa-heart fa-lg'></i>");
        $("a.top-link-cart").prepend("<i class='fa fa-shopping-cart fa-lg'></i>");
        $("a.top-link-checkout").prepend("<i class='fa fa-edit fa-lg'></i>");
        $("a.icon-login").prepend("<i class='fa fa-sign-in fa-lg'></i>");
        $("a.icon-logout").prepend("<i class='fa fa-sign-in fa-lg'></i>");
        $('.header ul.links li').find('a[title=Blog]').prepend("<i class='fa fa-book fa-lg'></i>");
        $('body.review-product-list').find('.tabNav').remove();
        
        var $owlFeatures = $('.owl-carousel-features');
        
        $owlFeatures.owlCarousel({
            rtl:true,
            loop:false,
            margin:28,
            nav:false,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                800:{
                    items:3
                },
                1000:{
                    items:4
                },
                1200:{
                    items:3
                }
            }
        });
        
        $('.prev1').click(function() {
            $owlFeatures.trigger('prev.owl.carousel');
        });

        $('.next1').click(function() {
            $owlFeatures.trigger('next.owl.carousel');
        });
        
        var $owlBestsellers = $('.owl-carousel-bestsellers');
        
        $owlBestsellers.owlCarousel({
            loop:false,
            nav:false,
            responsive:{
                1200:{
                    items:1
                }
            }       
        });

        // Go to the next item
        $('.prev2').click(function() {
            $owlBestsellers.trigger('prev.owl.carousel');
        });

        $('.next2').click(function() {
            $owlBestsellers.trigger('next.owl.carousel');
        });
        
        var $owlBrands = $('.owl-carousel-brands');
        
        $owlBrands.owlCarousel({
            rtl:true,
            loop:true,
            margin:12,
            nav:false,
            autoplay:true,
            responsive:{
                0:{
                    items:1
                },
                330:{
                    items:2
                },
                600:{
                    items:3
                },
                900:{
                    items:4
                },
                1200:{
                    items:5
                }
            }
        });
        
        $('.prev-brands').click(function() {
            $owlBrands.trigger('prev.owl.carousel');
        });

        $('.next-brands').click(function() {
            $owlBrands.trigger('next.owl.carousel');
        });
        
        var $owlMedia = $('.owl-carousel-media');
        
        $owlMedia.owlCarousel({
            loop:false,
            margin:10,
            nav:false,
            autoplay:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1200:{
                    items:3
                }
            }
        });

        // Go to the next item
        $('.media-prev').click(function() {
            $owlMedia.trigger('prev.owl.carousel');
        });

        $('.media-next').click(function() {
            $owlMedia.trigger('next.owl.carousel');
        });
        
        var $menuMobile = $('.menu_mobile');
        
        // Menu toggle - RWD
        $("#menu_mobile_click").css('cursor', 'pointer').click(function() {
            $menuMobile.slideToggle("slow");
        });
        
        $menuMobile.find('#nav li.parent').on('click', '.level-top', function(e) {
            $(this).siblings('ul').slideToggle('slow');
            e.preventDefault();
        });
        
        // Img in catalog from CMS
        $('.page-title')
            .next('a')
            .css({
                'display': 'block',
                'padding-top': '17px',
                'padding-bottom': '17px',
                'text-align': 'center'
            })
            .addClass('clear');
        
        var
            $boxCollateral = $('.box-collateral'),
            $boxUpSell = $('.box-up-sell'),
            $tabNav = $('ul.tabNav');

        // Product view tabs - add class
        $tabNav.find('li:first-child').addClass('tab_active');

        $tabNav.on('click', 'li', function(){
            var 
                $this = $(this),
                currentTab = $this.data('tab');
            
            $tabNav.find('li').removeClass('tab_active');
            $this.addClass('tab_active');
            
            $boxCollateral.each(function() {
                var $item = $(this);
                
                if( $item.data('tab') === currentTab ) {
                    $boxCollateral.hide();
                    $item.show();
                    $boxUpSell.show();
                }
            });
        });
        
        topNav();
    });
    
    // Menu functions
    function topNav(){
        var
            $nav = topNavCalculations(),
            $children = $nav.children('li.parent');

        $children.find('ul').hide();

        $nav
            .on('mouseenter', 'li.parent', function(){ 
                var $this = $(this);

                $this.siblings('li.parent').find('ul').hide();
                $this.children('ul').toggle();
            })
            .on('mouseleave', 'li.parent', function() {
                $(this).children('ul').hide();
            })
            .on('mouseenter mouseleave', ' > li > ul li', function() {
                $(this).children('ul').toggle(); 
            });
    }

    function topNavCalculations(){
        var
            $nav = $('#nav', '#mainNav'),
            topNavWidth = $nav.width(),
            topNavHeight = $nav.outerHeight() - 4;

        $nav.find('li').find('ul')
            .width(topNavWidth)
            .css({
                'top': topNavHeight + 'px',
                'box-sizing': 'border-box',
                'left': 0
            });

        return $nav;
    }
    
})(jQuery, window, document);