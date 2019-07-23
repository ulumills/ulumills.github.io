
    jQuery(document).ready(function ($) {
// document.addEventListener('touchstart', handler, {passive: true});


        $(".project").addClass("show");
        $(".intro").hide();


        var projectTitle = ["spectacle", "aviviz", "compass", "ryecatcher-mobilez", "lurnz"];
        projectTitle.forEach(function(projectTitle){

            // $("#" + projectTitle + "-intro").hide();


//Hover state to change intro text and background
            $("#" + projectTitle).hover(function () {
//       $("h2").css("color", "white");
                    $('#home-text').fadeOut(0);
                    $('#btnContainer').fadeOut(0);
                    $('#' + projectTitle + '-intro').fadeIn(0);
                    $("#background").addClass(projectTitle).fadeIn(0);
                    console.log("hello");
//        $(this).css("background-image", "none");


                },
                //Reverts hover state
                function(){
//      $(".project").css("background-color", "white");
//        $("h2").css("color", "black");
                    $("#background").fadeOut(0).removeClass(projectTitle);
                    $('#home-text').fadeIn(0);
                    $('#btnContainer').fadeIn(0);
                    $("#" + projectTitle + "-intro").fadeOut(0);
                    $(this).css("background-image", "");

                });

        });




//Changes visible projects when using filter buttons
        var projectFilter = ["education", "futuring", "socialimpact", "people"];
        projectFilter.forEach(function(projectFilter){

            $("#" + projectFilter).click(function(){
                $(".btn").removeClass("active");
                $(this).addClass("active")


            });

        });



    });





    //Why does this have to be outside of jQuery?



    // Move intros to left column
    var l = document.getElementById("home-left");
    // console.log(l);
    var elements = document.getElementsByClassName("intro");
    console.log(elements);
    for (var i=0; i<elements.length; i++)
    {
        l.insertAdjacentElement("beforeend", elements[i])

    }



    // Move projects to right column
    var h = document.getElementById("home-right");
    var elements = document.getElementsByClassName('project');
    // console.log(elements);
    for (var i=0; i<elements.length; i++)
    {
        h.insertAdjacentElement("afterbegin", elements[i] )
    }






    //FILTER BUTTONS




    filterSelection("people")
    function filterSelection(c) {
        var x, i;
        x = document.getElementsByClassName("project");
        if (c == "people") c = "";
        for (i = 0; i < x.length; i++) {
            w3RemoveClass(x[i], "show");
            if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
        }
    }

    function w3AddClass(element, name) {
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
            if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
        }
    }

    function w3RemoveClass(element, name) {
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
            while (arr1.indexOf(arr2[i]) > -1) {
                arr1.splice(arr1.indexOf(arr2[i]), 1);
            }
        }
        element.className = arr1.join(" ");
    }


    // Add active class to the current button (highlight it)
    //var btnContainer = document.getElementById("btnContainer");
    var btns = document.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function(){
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    };






