//TABLE REFERENCE
var empRef = firebase.database().ref('employee');
//$('#emp-table').find('tbody').html('');
var new_html = '';
window.onload = function () {
    initApp();
    displayEmpData();
};
//BUTTONS OR ACTIONS
function initApp() {
    document.getElementById('add_emp').addEventListener('click', addNewEmp, false);

}








// INSERT DATA
function addNewEmp() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var phone = document.getElementById('phone').value;
    var timeStamp = new Date().getTime();
    var empID = 'EMP_' + timeStamp;
    empRef.child(empID).set({
        name: name,
        email: email,
        address: address,
        phone: phone,
        emp_id: empID
    });
    $('#name').val('');
    $('#email').val('');
    $('#address').val('');
    $('#phone').val('');
}



//Display Employee Data 


function displayEmpData() {

    empRef.on('child_added', function (empData) {
        console.log(empData.val());

        new_html += '<tr id="'+empData.val().emp_id+'">';
        new_html += '<td id="name_'+empData.val().emp_id+'">' + empData.val().name + '</td>';
        new_html += '<td id="email_'+empData.val().emp_id+'">' + empData.val().email + '</td>';
        new_html += '<td id="address_'+empData.val().emp_id+'">' + empData.val().address + '</td>';
        new_html += '<td id="phone_'+empData.val().emp_id+'">' + empData.val().phone + '</td>';
        new_html += '<td><a  class="edit" data-toggle="modal"><i class="material-icons editEmp"';
        new_html += 'data-toggle="tooltip" data-emp-id="' + empData.val().emp_id + '" title="Edit">&#xE254;</i></a>';
        new_html += '<a class="" data-toggle="modal"><i class="material-icons delete"';
        new_html += 'data-toggle="tooltip"  data-emp-id="' + empData.val().emp_id + '" title="Delete">&#xE872;</i></a>';
        new_html += '</td>';
        new_html += '</tr>';

        $("#emp-table").html(new_html);
       
    });

    

    // $('#emp-table').find('tbody').append(new_html);

}

$(document).on('click', '.delete', function () {
    var emp_id = $(this).attr('data-emp-id');
    



    empRef.child(emp_id).once('value', function (emp) {
        var modal_header = '';

        modal_header += '<h4 class="modal-title">Delete ' + emp.val().name + '</h4>';
        modal_header += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';

        var modal_body = '';
        modal_body += '<p>Are you sure you want to delete these Records?</p>';
        modal_body += '<p class="text-warning"><small>This action cannot be undone.</small></p>';
        var modal_footer = '';
        modal_footer += '<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">';
        modal_footer += '<input type="submit" data-dismiss="modal" data-emp-id="'+emp_id+'" class="btn btn-danger deleteEmpData" value="Delete">';
        $("#deleteEmployeeModal").find('.modal-header').html(modal_header);
        $("#deleteEmployeeModal").find('.modal-body').html(modal_body);
        $("#deleteEmployeeModal").find('.modal-footer').html(modal_footer);
        $("#deleteEmployeeModal").modal();
    })
});

$(document).on('click', '.editEmp', function () {
    var emp_id = $(this).attr('data-emp-id');
    



    empRef.child(emp_id).once('value', function (emp) {
        var modal_header = '';

        modal_header += '<h4 class="modal-title">Add ' + emp.val().name + '</h4>';
        modal_header += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';

        var modal_body = '';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Name</label>';
        modal_body += '<input id="edit-name" type="text" value="'+emp.val().name+'" class="form-control" required>';
        modal_body += '</div>';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Email</label>';
        modal_body += '<input type="email" id="edit-email" value="'+emp.val().email+'" class="form-control" required>';
        modal_body += '</div>';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Address</label>';
        modal_body += '<textarea id="edit-address"  class="form-control" required>'+emp.val().address+'</textarea>';
        modal_body += '</div>';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Phone</label>';
        modal_body += '<input id="edit-phone" type="text" value="'+emp.val().phone+'" class="form-control" required>';
        modal_body += '</div>';
        

        var modal_footer = '';
        modal_footer += '<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">';
        modal_footer += '<input type="submit" data-dismiss="modal" data-emp-id="'+emp_id+'"  class="btn btn-danger updateEmpData" value="Save">';
        $("#editEmployeeModal").find('.modal-header').html(modal_header);
        $("#editEmployeeModal").find('.modal-body').html(modal_body);
        $("#editEmployeeModal").find('.modal-footer').html(modal_footer);
        $("#editEmployeeModal").modal();
    })
});


$(document).on('click', '.deleteEmpData', function () {
    var emp_id = $(this).attr('data-emp-id');
     
    empRef.child(emp_id).remove();
  
    $('#'+emp_id).remove();
    
    
});


$(document).on('click', '.updateEmpData', function () {
    var emp_id = $(this).attr('data-emp-id');
     
    var name = document.getElementById('edit-name').value;
    var email = document.getElementById('edit-email').value;
    var address = document.getElementById('edit-address').value;
    var phone = document.getElementById('edit-phone').value;
    
   
    empRef.child(emp_id).update({
        name: name,
        email: email,
        address: address,
        phone: phone
    });
    
    $('#name_'+emp_id).html(name);
    $('#email_'+emp_id).html(email);
    $('#address_'+emp_id).html(address);
    $('#phone_'+emp_id).html(phone);


    
});



$(document).on('click', '.dltAllData', function () {
    var emp_id = $(this).attr('data-emp-id');
     
    empRef.remove();
  
    $('#emp-table').remove();

    
});
