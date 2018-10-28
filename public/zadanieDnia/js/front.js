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

                    if (task.isDon == true) {
                        tbodyEl.append('\
                    <li class="completed">\
                        <div class="view">\
                            <input class="toggle" type="checkbox" checked>\
                            <label data-id=' + task.id + '>' + task.name + '</label>\
                           <button class="destroy"></button>\
                        </div>\
                        <input class="edit" value="Rule the web">\
                    </li>\
                    ');
                    } else {
                        tbodyEl.append('\
                    <li>\
                        <div class="view">\
                            <input class="toggle" type="checkbox">\
                            <label data-id=' + task.id + '>' + task.name + '</label>\
                           <button class="destroy"></button>\
                        </div>\
                        <input class="edit" value="Rule the web">\
                    </li>\
                    ');
                    }

                });
            }]
        });
    });

    const btnCompleted = $('#completed');
    //POBRANIE ZADAN AKTYWNYCH
    btnCompleted.on('click', function () {

        $.ajax({
            url: '/task',
            contentType: 'application/json',
            success: [function (response) {
                var tbodyEl = $('.todo-list');

                tbodyEl.html('');
                response.tasks.forEach(function (task) {

                    if (task.isDon == true) {
                        tbodyEl.append('\
                    <li class="completed">\
                        <div class="view">\
                            <input class="toggle" type="checkbox" checked>\
                            <label data-id=' + task.id + '>' + task.name + '</label>\
                           <button class="destroy"></button>\
                        </div>\
                        <input class="edit" value="Rule the web">\
                    </li>\
                    ');
                    }

                });
            }]
        });
    });

    const btnActive = $('#active');
    //POBRANIE ZADAN AKTYWNYCH
    btnActive.on('click', function () {

        $.ajax({
            url: '/task',
            contentType: 'application/json',
            success: [function (response) {
                var tbodyEl = $('.todo-list');

                tbodyEl.html('');
                response.tasks.forEach(function (task) {

                    if (task.isDon == false) {
                        tbodyEl.append('\
                    <li>\
                        <div class="view">\
                            <input class="toggle" type="checkbox">\
                            <label data-id=' + task.id + '>' + task.name + '</label>\
                           <button class="destroy"></button>\
                        </div>\
                        <input class="edit" value="Rule the web">\
                    </li>\
                    ');
                    }

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
            url: '/task/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                btnAll.click();
            }
        });
    });

    //DELETE COMPLETED
    $('.clear-completed').on('click', function() {
        var rowEl = $(this).closest('li');
        var id = rowEl.find('label').attr('data-id');

        $.ajax({
            url: '/task/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                btnAll.click();
            }
        });
    });

    // UPDATE/PUT
    $('.todo-list').on('dblclick', 'label', function() {
        var rowEl = $(this).closest('li');
        var id = rowEl.find('label').attr('data-id');
        var showInput = rowEl.find('.edit').css( 'display','block');
        showInput.val(rowEl.find('label').text())


        showInput.on('keyup', function(event) {

            if(event.keyCode == 13) //JEZELI WCISNIEMY ENTER
            {
                event.preventDefault();
                var newName = showInput.val();

                $.ajax({
                    url: '/task/' + id,
                    method: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify({ newName: newName }),
                    success: function(response) {
                        console.log(response);
                        btnAll.click();
                    }
                });
            }
        });
    });

    // ZMIANA ZADANIA NA AKTYWNE
    $('.todo-list').on('change', '.toggle', function() {
        var rowEl = $(this).closest('li');
        var id = rowEl.find('label').attr('data-id');


        if(this.checked) {
            rowEl.attr('class', 'completed');
            $.ajax({
                url: '/taskChecked/' + id,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ newIsDon: true }),
                success: function(response) {
                    console.log(response);
                    btnAll.click();
                }
            });
        }else {
            rowEl.removeClass('completed');
            $.ajax({
                url: '/taskChecked/' + id,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ newIsDon: false }),
                success: function(response) {
                    console.log(response);
                    btnAll.click();
                }
            });
        }
    });

    // USUN WSZYSTKIE WYKONANE ZADANIA
    // wypisuje usuniete tak jak z  pojedynczego usuniecia ale nie usuwa nic!

    $('.footer').on('click', '.clear-completed', function() {
        console.log('clear completed')
        // $('.todo-list').children('li').each(function () {
        //     console.log($(this))
        // // if (this.)
        //
        // });
    });




});