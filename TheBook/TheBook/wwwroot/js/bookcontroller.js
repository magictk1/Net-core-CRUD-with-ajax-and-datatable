

$(document).ready(function () {
     

    // Re-draw the table - you wouldn't want to do it here, but it's an example :-)
   

    $('#example').DataTable({
        "processing": true,
        "ajax": {
            "url": "/api/BooksAPI",
            dataSrc: ''
        },
        "columns": [{
            "data": "id"
        }, {
            "data": "name"
        }, {
            "data": "author"
        }, {
            "data": "price"
        },
        {
            data: null,
            className: "center",
            "render": function (data, type, JsonResultRow, meta) {
                return "<td><button type='button' id='btnEdit' class='btn btn-default' onclick='return getDetailBook(" + JsonResultRow.id + ")'>Edit</button> <button type='button' id='btnDelete' class='btn btn-danger' onclick='deleteBook(" + JsonResultRow.id + ")'>Delete</button></td>";
            }

        }
        ]

    });

   

    
});

 

        //khai báo biến kiểm tra xem nếu như là false thì sẽ gọi hàm Insert ngược lại bằng true thì gọi làm Update
var isUpdatable = false;
        getBooks();
        // hàm hiển thị danh sách những record
        function getBooks() {
            $.ajax({
                url: '/api/BooksAPI',
                type: 'GET',
                dataType: 'json',
                success: function (data) {

                    var rows = '';
                    if (data.length > 0)
                        $.each(data, function (i, item) {
                            rows += "<tr>"
                            rows += "<td>" + item.id + "</td>"
                            rows += "<td>" + item.name + "</td>"
                            rows += "<td>" + item.author + "</td>"
                            rows += "<td>" + item.price + "</td>"
                            rows += "<td><button type='button' id='btnEdit' class='btn btn-default' onclick='return getDetailBook(" + item.id + ")'>Edit</button> <button type='button' id='btnDelete' class='btn btn-danger' onclick='deleteBook(" + item.id + ")'>Delete</button></td>"
                            rows += "</tr>";
                            $("#listBooks tbody").html(rows);

                        });
                    else
                        $("#listBooks tbody").html('');
                },
                error: function (err) {
                    alert("Error: " + err.responseText);
                }
            });

            
        }

        // hàm Insert và Update một record
        
        $("#btnSave").click(function (e) {
            e.preventDefault();
            var id = $("#Id").val();

            if (!isUpdatable) {
                var data = {
                    //Id: $("#Id").val(),
                    Name: $("#Name").val(),
                    Author: $("#Author").val(),
                    Price: $("#Price").val()
                }

                $.ajax({
                    url: 'api/BooksAPI/Create',
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify(data),
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        getBooks();
                        $('#example').DataTable().ajax.reload().draw(false)
                        $("#bookModal").modal('hide');
                        clear();
                    },
                    error: function (err) {
                        alert("Error: " + err.responseText);
                    }
                })
            }

            else {
                var data = {
                    id: $("#Id").val(),
                    Name: $("#Name").val(),
                    Author: $("#Author").val(),
                    Price: $("#Price").val()
                }

                $.ajax({

                    url: 'api/BooksAPI/Edit?id=' + id,
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify(data),
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        getBooks();
                        $('#example').DataTable().ajax.reload().draw(false)
                        isUpdatable = false;
                        $("#bookModal").modal('hide');
                        clear();
                    },
                    error: function (err) {
                        alert("Error: " + err.responseText);
                    }
                })



            }



        });
     
    

        $("#btnCreateNew").click(function () {
            $("#title").text("Create New");
        })

        // hàm đóng modal
        $("#btnClose").click(function () {
            clear();
        });

        // hàm reset giá trị về rỗng sau khi thực hiện Insert hoặc Update
        function clear() {
            $("#Id").val("");
            $("#Name").val("");
            $("#Author").val("");
            $("#Price").val("");
        }
        function deleteBook(id) {
            var confirmDelete = confirm("Do you want to delete this book ?");
            var id = parseInt(id);
            if (confirmDelete) {
                $.ajax({
                    url: 'api/BooksAPI/Delete?id='+id,
                    type: "POST",
                    dataType: 'json',
                    data: JSON.stringify(id),
                    success: function (response) {
                        $('#example').DataTable().ajax.reload().draw(false)
                        getBooks();
                    },
                    error: function (err) {
                        alert("Error: " + err.responseText);
                    }
                });
            }
        };
        function getDetailBook(id) {
            $("#title").text("Details");
            $.ajax({
                url: 'api/BooksAPI/' + id,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    $("#Id").val(data.id);
                    $("#Name").val(data.name);
                    $("#Author").val(data.author);
                    $("#Price").val(data.price);
                    isUpdatable = true;
                    $("#bookModal").modal('show');
                },
                error: function (err) {
                    alert("Error: " + err.responseText);
                }
            });
        
        
        };

        

  