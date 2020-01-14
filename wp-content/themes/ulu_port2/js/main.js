jQuery(document).ready(function($) {
    // document.addEventListener('touchstart', handler, {passive: true});


    var viewportWidth = $(window).width();

    if (viewportWidth > 768) {
        $.jInvertScroll(['.scroll'],        // an array containing the selector(s) for the elements you want to animate
            {
                height: 'auto',                   // optional: define the height the user can scroll, otherwise the overall length will be taken as scrollable height
                onScroll: function(percent) {   //optional: callback function that will be called when the user scrolls down, useful for animating other things on the page
                    // console.log(percent);
                }
            });
    }


    $(window).on("resize",function(e){
        if (viewportWidth > 768) {
            $.jInvertScroll(['.scroll'],        // an array containing the selector(s) for the elements you want to animate
                {
                    height: 'auto',                   // optional: define the height the user can scroll, otherwise the overall length will be taken as scrollable height
                    onScroll: function(percent) {   //optional: callback function that will be called when the user scrolls down, useful for animating other things on the page
                        // console.log(percent);
                    }
                });
        }
    });

    $(function() {
        $('body').removeClass('fade-out');
    });








    setTimeout(function() {

    /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
    var prevScrollpos = window.pageYOffset;

    window.onscroll = function() {
        $(".arrow").css("background-image", "url('wp-content/themes/ulu_port2/theme_imgs/arrow.gif')");
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("menuContainer").style.top = "0px";
        } else {
            document.getElementById("menuContainer").style.top = "-70px";
        }
        prevScrollpos = currentScrollPos;


        //SHOW GIF

        var windowWidth = $(window).width(),
            gifTrigger = windowWidth * .5;
        //when next split reaches 50%, crossfade boxl to that of next split--do with opacity and nextUntil?
        $('.project-details').each(function(){
            var thisLeft = $(this).offset().left - $(window).scrollLeft(),
                thisRight = thisLeft + $(this).width();

            if (gifTrigger >= thisLeft) {
                $(this).find('.project-image-2')
                    .fadeIn(500);

            }

        });




    }

    }, 500);

    $('#menuContainer').hover(function(){
        document.getElementById("menuContainer").style.top = "0px";

    });




    if ($(window).width() >= 768) {


        //Set up "gone" classes appropriately first
        $('.split:first-of-type, :not(.split) + .split').each(function(){
            //        $(this).nextUntil(':not(.split)').each(function(){
            $(this).find('.boxl')
                .addClass("appear");
            //        });
        });

        //Now the scroll functions
        $( window ).scroll(function() {
            $('.split:first-of-type, :not(.split) + .split').each(function(){


                //When 1st split reaches top, add fixed on all box l of split: FUNCTIONS PROPERLY
                var topOfBox = $(this).offset().top;
                if($(window).scrollTop() >= topOfBox) {
                    $(this).prev().nextUntil(':not(.split)').each(function(){
                        $(this).find('.boxl')
                            .addClass("fixed");
                        $(this).find('.boxr')
                            .addClass("boxrModified");
                    });
                }



                //                fixed
                //                When last of group's bottom is in view, remove fixed class from all .boxls



                lastBoxr = $(this).prev().nextUntil(':not(.split)').last().find(".boxr");
                // lastBoxr.css("min-height", "100vh");
                //
                // if ($(window).scrollTop() >=
                //     ($(lastBoxr).offset().top +
                //     $(lastBoxr).outerHeight() -
                //     window.innerHeight)) {



                // var windowHeight = $(window).height();
                // var unfixTrigger = windowHeight;
                var lastTop = $(lastBoxr).offset().top - $(window).scrollTop();
                lastBottom = lastTop + $(this).outerHeight();



                //Window Object
                var win = $(window);
                //Object to Check
                obj = lastBoxr;
                //the top Scroll Position in the page
                var scrollPosition = win.scrollTop();
                //the end of the visible area in the page, starting from the scroll position
                var visibleArea = win.scrollTop() + win.height();
                //the end of the object to check
                var objEndPos = (obj.offset().top + obj.outerHeight());


                // if (visibleArea >= objEndPos && scrollPosition <= objEndPos) {




                if  (objEndPos <= visibleArea) {
                    // $(this).nextUntil(':not(.split)').each(function(){
                    $('.boxl')
                        .removeClass("fixed");
                    $('.boxr')
                        .removeClass("boxrModified");


                    // });
                }

                // }


            });



            //IT WORKS!!
            var windowHeight = $(window).height(),
                fadeTrigger = windowHeight * .5;
            //when next split reaches 50%, crossfade boxl to that of next split--do with opacity and nextUntil?
            $('.split').each(function(){
                var thisTop = $(this).offset().top - $(window).scrollTop(),
                    thisBottom = thisTop + $(this).height();



                if (fadeTrigger >= thisBottom) {
                    // console.log("trigger = " + fadeTrigger + ", bottom = " + thisBottom);
                    //                $(this).prev().nextUntil(':not(.split)').each(function(){
                    $(this).next().find('.boxl')
                        .addClass("appear");
                    //                    console.log(topOfBox + " bottom");

                    //                });

                }
                else {
                    $(this).next().find('.boxl')
                        .removeClass('appear');
                }
            });

        });

    } else {
        $(".boxl").addClass("appear");
    }







if (($("#mode")).hasClass("dark")) {
    $("body").addClass("darkbg darktext");
    $("h1,h2,h3,h4,h5,h6,.lead, :not(.menu-item)>a, strong").addClass("darkheader");
    $(":not(.full-width).imagebox").addClass("darkimg");
}


// This makes the cursor on zoom and opens all external links in a new tab
$(".zoooom a").css("cursor", "zoom-in");
    $('a[href^="https://"]').not('a[href*=ulumills]').attr('target','_blank');
    $('a[href^="http://"]').not('a[href*=ulumills]').attr('target','_blank');


});



