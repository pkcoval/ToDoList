// Twój kod

$(function () {

    const btnAll = $('.selected');
    //POBRANIE WSZYSTKICH ZADAN
    btnAll.on('click', function () {
        $.ajax({
            url: '/task',
            contentType: 'application/json',
            success: [function (response) {
                var tbodyEl = $('.todo-list');

                tbodyEl.html('');

                response.tasks.forEach(function (task) {
                    tbodyEl.append('\
                    <li>\
                        <div class="view">\
                            <input class="toggle" type="checkbox">\
                            <label data-id='+task.id+'>' + task.name + '</label>\
                           <button class="destroy"></button>\
                        </div>\
                        <input class="edit" value="Rule the web">\
                    </li>\
                    ');


                });
            }]
        });
    });

    // DODANIE NOWEGO ZADANIA
    $('.new-todo').on('keyup', function(event) {

        if(event.keyCode == 13) //JEZELI WCISNIEMY ENTER
        {
            event.preventDefault();
            var createInput = $('.new-todo');

            $.ajax({
                url: '/task',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ name: createInput.val() }),
                success: function(response) {
                    console.log(response);
                    createInput.val('');
                    btnAll.click();
                }
            });
        }
    });

    //DELETE
    $('.todo-list').on('click', '.destroy', function() {
        var rowEl = $(this).closest('li');
        var id = rowEl.find('label').attr('data-id');

        $.ajax({
            url: '/products/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                btnAll.click();
            }
        });
    });



});