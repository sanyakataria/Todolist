
function printinglist(data) {
    for (let i = 0; i < data.length; i++) { //console.log(typeof(data))
        console.log(data)

        var task = $("<div class='task'></div>").text(data[i].task);
        var del = $("<i class='fas fa-trash-alt'></i>").click(function () {
            var p = $(this).parent();
            //    console.log(p[0].childNodes[0])
            var tobedeleted = p.text()
            //      console.log(tobedeleted)
            $.post('/tobedeleted', { task: tobedeleted }, function (data) {
                console.log(data)
            })
            p.fadeOut(function(){
            p.remove();
            });

        });

        var check = $("<i class='fas fa-check'></i>").click(function () {
            var p = $(this).parent();

            console.log(p.text())
            console.log(p[0].innerText)
            $.post('/striked', { task: p.text() }, function (data) {
                var s = data
                console.log(s)
            })
            p.fadeOut(function () {
                $(".comp2").append(p);
                p.fadeIn();
            });
            $(this).remove();
        });

        task.append(del, check);
        if (data[i].striked == true) {
            $('.comp2').append(task)
        }
        else {
            $(".notcomp2").append(task);
        }


    }
}

$(function () {

    // jQuery methods go here...
    //   })


    $.post('/todostask', {}, function (data) {
        console.log(data)
        $('.notcomp2').empty()
        $('.comp2').empty()
        printinglist(data)
    })
    $("#addbtn").click(function (e) {
        if ($(".txtb").val() != "") {
            $.post('/todostask', { task: $('.txtb').val() }, function (data) {
                console.log(data)
                $('.notcomp2').empty()
                $('.comp2').empty()
                printinglist(data)
            })

            //to clear the input
            $(".txtb").val("");
        }
    });

});