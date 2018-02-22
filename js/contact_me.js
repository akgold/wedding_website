$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val().toString();
            var email = $("input#email").val().toString();
            var n_total = $("select#n_people").val();
            var shuttle = $("select#shuttle").val();
            var coming = $("textarea#whos_coming").val().toString();
            var food = $("textarea#food").val().toString();
            var message = $("textarea#message").val().toString();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            var ajaxC = function(){
              return $.ajax({
                url: "https://4rfwi08t6c.execute-api.us-east-1.amazonaws.com/prod/rsvp",
                type: "POST",
                'Content-Type': 'application/json',
                crossDomain: true,
                cors: true,
                data: {
                    Name: "'".concat(name),
                    Email: email, 
                    N: n_total,
                    Shuttle: shuttle,
                    Message: "'".concat(message),
                    Coming: "'".concat(coming), 
                    Food: "'".concat(food),
                    key: "1cLu_f2PuSCCfMLhbMcFQJLfV2A1tZEV9QCJm0Ax2yWM",
                    sheet : "RSVP", 
                    Time: new Date(Date.now())
                },
                cache: false,
                dataFiler: function(data){
                  console.log("hi");
                },
                success: function(data) {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Thanks so much for your RSVP! </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#rsvpForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", Alex goofed on setting something up...please email shoshandalexwedding@gmail.com.");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#rsvpForm').trigger("reset");
                },
            }
              );//end ajax call
          }
          ajaxC().fail(function(){ console.log("failure")});
          $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Thanks so much for your RSVP! </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#rsvpForm').trigger("reset");
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
