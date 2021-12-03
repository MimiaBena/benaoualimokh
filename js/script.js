 var ssContactForm = function() {

        /* local validation */
	    $('#contact-form').validate({

            /* submit via ajax */
            submitHandler: function(form) {

                //var sLoader = $('.submit-loader');

                $.ajax({

                    type: "POST",
                    url: 'php/contact.php',
                    //data: postdata,
                    dataType: 'json',
                    data: $(form).serialize(),
                    success: function(result){
              
              if(result.isSuccess){
                  $("#contact-form").append("<p class='thank-you'>Votre message a bien été envoyé.Merci de m'avoir contacté :)</p>");
                  $("#contact-form")[0].reset();
                  
              }
              else{
                  $("#firstname + .commentaire").html(result.firstnameError);
                  $("#name + .commentaire").html(result.nameError);
                  $("#email + .commentaire").html(result.emailError);
                  $("#phone + .commentaire").html(result.phoneError);
                  $("#message + .commentaire").html(result.messageError);
              }
          } ,
                   

                });
            }

        });
    };


ssContactForm();
