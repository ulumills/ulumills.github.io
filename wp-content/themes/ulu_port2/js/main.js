jQuery(document).ready(function ($) {
    // document.addEventListener('touchstart', handler, {passive: true});


    var viewportWidth = $(window).width();

    // if (viewportWidth > 768) {
    //     $.jInvertScroll(['.scroll'],        // an array containing the selector(s) for the elements you want to animate
    //         {
    //             height: 'auto',                   // optional: define the height the user can scroll, otherwise the overall length will be taken as scrollable height
    //             onScroll: function (percent) {   //optional: callback function that will be called when the user scrolls down, useful for animating other things on the page
    //                 // console.log(percent);
    //             }
    //         });
    // }
    //
    //
    // $(window).on("resize", function (e) {
    //     if (viewportWidth > 768) {
    //         $.jInvertScroll(['.scroll'],        // an array containing the selector(s) for the elements you want to animate
    //             {
    //                 height: 'auto',                   // optional: define the height the user can scroll, otherwise the overall length will be taken as scrollable height
    //                 onScroll: function (percent) {   //optional: callback function that will be called when the user scrolls down, useful for animating other things on the page
    //                     // console.log(percent);
    //                 }
    //             });
    //     }
    // });

    $(function () {
        $('body').removeClass('fade-out');
    });




    $('#menuContainer').hover(function () {
        document.getElementById("menuContainer").style.top = "0px";

    });


    if ($(window).width() >= 768) {


        //Set up "gone" classes appropriately first
        $('.split:first-of-type, :not(.split) + .split').each(function () {
            //        $(this).nextUntil(':not(.split)').each(function(){
            $(this).find('.boxl')
                .addClass("appear");
            //        });
        });

        //Now the scroll functions
        $(window).scroll(function () {
            $('.split:first-of-type, :not(.split) + .split').each(function () {


                //When 1st split reaches top, add fixed on all box l of split: FUNCTIONS PROPERLY
                var topOfBox = $(this).offset().top;
                if ($(window).scrollTop() >= topOfBox) {
                    $(this).prev().nextUntil(':not(.split)').each(function () {
                        $(this).find('.boxl')
                            .addClass("fixed");
                        $(this).find('.boxr')
                            .addClass("boxrFixed");




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


                if (objEndPos <= visibleArea) {
                    // $(this).nextUntil(':not(.split)').each(function(){
                    $('.boxl')
                        .removeClass("fixed");
                    $('.boxr')
                        .removeClass("boxrFixed");


                    // });
                }

                // }


            });


            //IT WORKS!!
            var windowHeight = $(window).height(),
                fadeTrigger = windowHeight * .5;
            //when next split reaches 50%, crossfade boxl to that of next split--do with opacity and nextUntil?
            $('.split').each(function () {
                var thisTop = $(this).offset().top - $(window).scrollTop(),
                    thisBottom = thisTop + $(this).height();


                if (fadeTrigger >= thisBottom) {
                    // console.log("trigger = " + fadeTrigger + ", bottom = " + thisBottom);
                    //                $(this).prev().nextUntil(':not(.split)').each(function(){
                    $(this).next().find('.boxl')
                        .addClass("appear");
                    //                    console.log(topOfBox + " bottom");

                    //                });

                } else {
                    $(this).next().find('.boxl')
                        .removeClass('appear');
                }
            });

        });

    } else {
        $(".boxl").addClass("appear");
    }


    if (($("#mode")).hasClass("dark")) {
        $(".boxr, figcaption").addClass("darkbg darktext");
        $(".box, .full-width, .boxes, .wp-block-spacer, .one-section, .entry-content").addClass("darkbg");
        $("h1,h2,h3,h4,h5,h6,.lead, :not(.menu-item)>a, strong").addClass("darkheader");
        $(":not(.full-width).imagebox").addClass("darkimg");
        $("footer *").removeClass("darkbg darktext darkheader");
    }


// This makes the cursor on zoom and opens all external links in a new tab
    $(".zoooom a").css("cursor", "zoom-in");
    $('a[href^="https://"]').not('a[href*=ulumills]').attr('target', '_blank');
    $('a[href^="http://"]').not('a[href*=ulumills]').attr('target', '_blank');

    if ($(window).width() >= 768) {
        //This does a footer reveal
        var footerHeight = $("#colophon").outerHeight();
        // var extrapadding = 32px;
        $('#page').css("margin-bottom", footerHeight);
    }

    // NEW MENU FUNCTIONS

    $(".hamburger").click(function(){
        $(this).toggleClass("is-active");
        $(".menu-bg").toggleClass("menu-bg-open");

    });




// Time change text
        var now = new Date();
        var hours = now.getHours();


        var msg;
        var msgEng;
        var msgJp;
        if (hours < 12) {
            msg = "Aloha kakahiaka!";
            msgEng = "Good morning!";
            msgJp = "おはよう!";
        }
        else if (hours < 18) {
            msg = "Aloha ‘auinalā!";
            msgEng = "Good afternoon!";
            msgJp = "こんにちは!";
        }

        else {
            msg = "Aloha ahiahi!";
            msgEng = "Good evening!";
            msgJp = "こんばんは!";
        }


    // List of sentences
    var _CONTENT = [ msgEng , msgJp , msg ];

// Current sentence being processed
    var _PART = 0;

// Character number of the current sentence being processed
    var _PART_INDEX = 0;

// Holds the handle returned from setInterval
    var _INTERVAL_VAL;

// Element that holds the text
    var _ELEMENT = document.querySelector("#greeting");

// Cursor element
//     var _CURSOR = document.querySelector("#cursor");

// Implements typing effect
    function Type() {
        // Get substring with 1 characater added
        var text =  _CONTENT[_PART].substring(0, _PART_INDEX + 1);
        _ELEMENT.innerHTML = text;
        _PART_INDEX++;

        // If full sentence has been displayed then start to delete the sentence after some time
        if(_PART < (_CONTENT.length - 1)) {
            if (text === _CONTENT[_PART]) {
                // Hide the cursor
                // _CURSOR.style.display = 'none';

                clearInterval(_INTERVAL_VAL);
                setTimeout(function () {
                    _INTERVAL_VAL = setInterval(Delete, 75);
                }, 2000);
            }
        }
    }
//ULU: This is me trying to get the deleting to stop on the last sentence.
    if(_PART < (_CONTENT.length - 1)) {
// Implements deleting effect
    function Delete() {
        // Get substring with 1 character deleted
        var text =  _CONTENT[_PART].substring(0, _PART_INDEX - 1);
        _ELEMENT.innerHTML = text;
        _PART_INDEX--;

        // If sentence has been deleted then start to display the next sentence
        if(text === '') {
            clearInterval(_INTERVAL_VAL);

            // If current sentence was last then display the first one, else move to the next
            // if(_PART == (_CONTENT.length - 1))
            //     _PART = 0;
            // else
                _PART++;

            _PART_INDEX = 0;

            // Start to display the next sentence after some time
            setTimeout(function() {
                // _CURSOR.style.display = 'inline-block';
                _INTERVAL_VAL = setInterval(Type, 100);
            }, 200);
        }
    }
    }

// Start the typing effect on load
    _INTERVAL_VAL = setInterval(Type, 100);














// END JQUERY

});



