$(function(){

  function buildHTML(message){
    if (message.image) {
      var html = 
                  `<div class="message">
                    <div class="message__label">
                      <div class="message__label__user-name">
                        ${message.user_name}
                      </div>
                      <div class="message__label__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message__content">
                      <p class="message__content__text">
                        ${message.text}
                      </p>
                    </div>
                    <img class="message__content__image" src=${message.image} alt="画像です"></img>
                  </div>`
      return html;
    } else {
      var html = 
                  `<div class="message">
                    <div class="message__label">
                      <div class="message__label__user-name">
                        ${message.user_name}
                      </div>
                      <div class="message__label__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message__content">
                      <p class="message__content__text">
                        ${message.text}
                      </p>
                    </div>
                  </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();

    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('form')[0].reset()
    })
  })
});