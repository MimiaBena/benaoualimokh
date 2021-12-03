$(function(){

    $(".navbar a, footer a").on("click", function(event){
    
        event.preventDefault();
        var hash = this.hash;
        
        $('body,html').animate({scrollTop: $(hash).offset().top} , 900 , function(){window.location.hash = hash;})
        
    });
    
    $('#contact-form').submit(function(e){
     e.preventDefault();
     $('.commentaire').empty();
     var postdata = $('#contact-form').serialize();
     
      $.ajax({
          type: 'POST',
          url: 'php/contact.php',
          dataType : "json",
          data: postdata,
          
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
          }
          
          
          
      });
     
     
 });
    

})
