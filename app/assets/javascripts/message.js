$(function(){

  function buildHTML(message){
    var message_template = 
                          `<div class="message__label">
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
                          </div>`

    if (message.image) {
      var html = 
                  `<div class="message" data-message-id=${message.id}>
                    ${message_template}
                    <img class="message__content__image" src=${message.image} alt="画像です"></img>
                  </div>`
      return html;
    } else {
      var html = 
                  `<div class="message" data-message-id=${message.id}>
                    ${message_template}
                  </div>`
      return html;
    }
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();

    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.form__send-btn').prop('disabled', false)
    })

    .fail(function() {
      alert("メッセージ送信に失敗しました")
    })
  })

  var relordMessages = function(){
    var last_message_id = $('.message:last').data('message-id');

    $.ajax({
      url: "api/messages",
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json'
    })

    .done(function(messages) {
      console.log('success');
    })
    .fail(function() {
      alert('error');
    });
  }


});