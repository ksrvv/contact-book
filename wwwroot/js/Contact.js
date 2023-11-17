$(document).ready(function () {
    GetContacts();

});
function GetContacts() {
  






    $.ajax({
        url: '/contacts/GetAll',
        type:'get',
        datatype:'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                var object = '';
                object += '<tr>';
                object += '<td colspan="5">' + 'Contact list is empty' + '</td>';
                object += '</tr>';
                $('#tblBody').html(object);


            }

            else {
                var object = '';
                $.each(response, function (index, contact) {
                    object += '<tr>';
                   
                    object += '<td>' + contact.name + '</td>';
                    object += '<td>' + contact.mobilePhone + '</td>';
                    object += '<td>' + contact.jobTitle + '</td>';
                    object += '<td>' + contact.birthDate + '</td>';
                    object += '<td> <a href="#" class ="btn btn-primary btn-sm" onclick="Edit(' + contact.id + ')"> Edit</a> <a href="#" class ="btn btn-danger btn-sm" onclick="Delete(' + contact.id + ')"> Delete</a> </td > ';



                });
                $('#tblBody').html(object);
            }
        },
        error: function () {
            alert('Unable to read the data.');
        }
    });
}
$('#btnAdd').click(function () {
    $('#ContactModal').modal('show');
    $('#modalTitle').text('Enter data for new contact');

})
function Insert() {
    var result = Validate();
    if (result == false) { return false;}
        
    var formData = new Object();
    formData.id = $('#Id').val();
    formData.name = $('#Name').val();
    formData.mobilePhone = $('#MobilePhone').val();
    formData.jobTitle = $('#JobTitle').val();
    formData.birthDate = $('#BirthDate').val();
    $.ajax({
        url: '/contacts/Insert',
        data: formData,
        type: 'post',
        datatype: 'json',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
               
                alert('Unable to save the data.');


            }
            else {
                GetContacts();
                HideModal();
            }
        },
        error: function () {
            alert('Unable to save the data.');
        }

    });
}

function HideModal() {
    $('#ContactModal').modal('hide');
    ClearControls();

}
function ClearControls() {
   
    $('#Name').val('');
    $('#Name').css('border-color', 'lightgrey');
    $('#MobilePhone').val('');
    $('#MobilePhone').css('border-color', 'lightgrey');
    $('#JobTitle').val('');
    $('#JobTitle').css('border-color', 'lightgrey');
    $('#BirthDate').val('');
    $('#BirthDate').css('border-color', 'lightgrey');
}
function Validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "" || /[0-9]/.test($('#Name').val())) {//name shouldnt be empty or contain numerics
        $('#Name').css('border-color', 'Red');
        $('#nameInfoLabel').text('field is empty or contain numerics');

        //nameInfoLabel
        isValid = false;
    }
   
    else {
        $('#Name').css('border-color', 'lightgrey');
        $('#nameInfoLabel').text('');
    }
    if ($('#MobilePhone').val().trim() == "" || /^\+(375)\)?[]?(33|29|25)[]?([0-9]{7})$/.test($('#MobilePhone').val()) == false) {//phone shouldnt be empty, pattern: +37533/29/25XXXXXXX
        $('#MobilePhone').css('border-color', 'Red');
        $('#phoneInfoLabel').text('field is empty or doesn match the pattern');
        isValid = false;
    }
    else {
        $('#MobilePhone').css('border-color', 'lightgrey');
        $('#phoneInfoLabel').text('');
    }
    if ($('#JobTitle').val().trim() == "") {
        $('#JobTitle').css('border-color', 'Red');
        $('#jobInfoLabel').text('field is empty');

        isValid = false;
    }
    else {
        $('#JobTitle').css('border-color', 'lightgrey');
        $('#jobInfoLabel').text('');

    }
    if ($('#BirthDate').val().trim() == "") {
        $('#BirthDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#BirthDate').css('border-color', 'lightgrey');
    }

   
    return isValid;
}
$('#Name').change(function () {
    Validate();
})
$('#MobilePhone').change(function () {
    Validate();
})
$('#JobTitle').change(function () {
    Validate();
})
$('#BirthDate').change(function () {
    Validate();
})

function Edit(id) {
   
    $.ajax({
        url: '/contacts/Update?id='+id,
        contentType: 'application/json;charset=utf-8',

        type: 'get',
        datatype: 'json',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {

                alert('Unable to update the data.');


            }
            else {
                $('#ContactModal').modal('show');
                $('#modalTitle').text('Enter new data for existing contact');
                $('#Save').css('display', 'none');
                $('#Update').css('display', 'block');
                $('#Id').val(response.id);
                $('#Name').val(response.name);
                $('#MobilePhone').val(response.mobilePhone);
                $('#JobTitle').val(response.jobTitle);
                $('#BirthDate').val(response.birthDate);

            }
        },
        error: function () {
            alert('Unable to save the data.');
        }

    });
}
function Update() {
    var result = Validate();
    if (result == false) { return false; }

    var formData = new Object();
    formData.id = $('#Id').val();
    formData.name = $('#Name').val();
    formData.mobilePhone = $('#MobilePhone').val();
    formData.jobTitle = $('#JobTitle').val();
    formData.birthDate = $('#BirthDate').val();
    $.ajax({
        url: '/contacts/Update',
        data: formData,
        type: 'post',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {

                alert('Unable to save the data.');


            }
            else {
                GetContacts();
                HideModal();
            }
        },
        error: function () {
            alert('Unable to save the data.');
        }

    });
}

function Delete(id) {
    if (confirm('Are you sure to delete this contact?')) {
 $.ajax({
     url: '/contacts/Delete?id=' + id,
        type: 'post',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {

                alert('Unable to delete the data.');


            }
            else {
                GetContacts();
                HideModal();


            }
        },
        error: function () {
            alert('Unable to delete the data.');
        }

    });
    
    }
   
   
}