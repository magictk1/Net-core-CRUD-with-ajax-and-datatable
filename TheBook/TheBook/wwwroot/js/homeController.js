
var homeController = {
    init: function () {

        homeController.registerEvent();
        homeController.loadData();

    },
    registerEvent: function () {

        $('#btnAddNew').off('click').on('click', function () {
            $('#modalAddUpdate').modal('show');
            homeController.resetForm();
        });
        $('#btnSave').off('click').on('click', function () {
            if ($('#frmSaveData').valid()) {
                homeController.saveData();
                homeController.loadData();
            }
        });
        $('.btn-edit').off('click').on('click', function () {
            $('#modalAddUpdate').modal('show');
            var id = $(this).data('id');
            homeController.loadDetail(id);
        });


    },

    saveData: function () {
        var firstname = $('#txtfirstname').val();
        var lastname = $('#txtlastname').val();
        var genders = $('#txtgender').val();
        var dob = $('#txtdate_of_birth').val();
        var datejoined = $('#txtdate_joined').val();
        var dateleft = $('#txtdate_left').val();
        var address = $('#txtemployee_address').val();
        var details = $('#txtemployee_details').val();
        var id = parseInt($('#hidID').val());

        var employee = {
            employee_firstname: firstname,
            employee_lastname: lastname,
            gender: genders,
            date_of_birth: new Date(dob),
            date_joined: new Date(datejoined),
            date_left: new Date(dateleft),
            employee_address: address,
            employee_details: details,
            Id: id
        }
        $.ajax({
            url: '/api/EmployeeAPI/Create',
            data: JSON.stringify(employee),
            type: 'POST',
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function (response) {
                bootbox.alert("Save Success", function () {
                    homeController.loadData();
                    $('#modalAddUpdate').modal('hide');

                });

                //if (response.status == true) {
                //    bootbox.alert("Save Success", function () {
                //        $('#modalAddUpdate').modal('hide');

                //    });
                //}
                //else {
                //    bootbox.alert(response.message);
                //}
            },
            error: function (err) {
                console.log(err);
            }
        });
    },
    loadData: function () {
        $.ajax({
            url: '/api/EmployeeAPI/GetEmployee/',
            type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                var html = '';
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += '<td>' + item.Id + '</td>';
                    html += '<td>' + item.employee_firstname + '</td>';
                    html += '<td>' + item.employee_lastname + '</td>';
                    html += '<td>' + item.gender + '</td>';
                    html += '<td>' + item.date_of_birth + '</td>';
                    html += '<td>' + item.date_joined + '</td>';
                    html += '<td>' + item.dateleft + '</td>';
                    html += '<td>' + item.employee_address + '</td>';
                    html += '<td>' + item.employee_details + '</td>';
                    html += '<td><a href="#" onclick="return getbyID(' + item.Id + ')">Edit</a> | <a href="#" onclick="Delele(' + item.Id + ')">Delete</a></td>';
                    html += '</tr>';
                });
                $('.tbody').html(html);
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    },
    resetForm: function () {
        $('#txtfirstname').val('');
        $('#txtlastname').val('');
        $('#txtgender').val('');;
        $('#txtdate_of_birth').val('');
        $('#txtdate_joined').val('')
        $('#txtdate_left').val('');
        $('#txtemployee_address').val('');
        $('#txtemployee_details').val('');
    },



}
homeController.init();