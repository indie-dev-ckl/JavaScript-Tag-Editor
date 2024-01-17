var errorList = [];

//the function treat Capital and small letters as the same
$.expr.pseudos.contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

$(document).ready(function() {
    $('ul.tags').on('click', function() {
        $('#search-field').focus();
    });

    $('#search-field').on('keypress', function(event) {
        let $this = $(this);
        if (event.key == 'Enter') {
            let tagList = [];
            tagList = $this.val().trim().split(/[\s,-]+/);
            console.log(tagList);
            errorList = [];
            tagList.forEach(tag => {
                if (validate(tag)) {
                    let listItem = $('<li>', { class: 'addedTag p-1 m-1 d-flex justify-content-center align-items-center rounded-3' }).text(tag); 
                    let closeButton = createCloseButton();
                    let hiddenInput = $('<input>', { type: 'hidden', value: tag, name: 'tags[]' });
                    listItem.append(closeButton, hiddenInput).insertBefore('.tags .tagAdd');
                } else {
                    console.log("something wrong in this tag: " + tag + " , please check your input"); 
                    errorList.push(tag);        
                }
                $this.val('');
            });
            if (errorList.length > 0) {
                attachAlertMessage();
            }
        }
    });
});

function attachAlertMessage(){
    // Remove the last alert message
    $('#tagContainer .alert').remove();
    // Create the alert message
    let alertMessage = document.createElement("div");
    alertMessage.classList.add("alert", "alert-danger", "alert-dismissible", "fade", "show", "m-3");
    alertMessage.setAttribute("role", "alert");
    alertMessage.innerHTML = "The following tag are not allowed: "+ errorList+" please check the input rules!";
    $(alertMessage).append(createCloseButton());
    $('#tagContainer').append(alertMessage);
}

function createCloseButton(){
    return $('<button>', { class: 'btn-close' }).click(function() { $(this).parent().remove(); });
}