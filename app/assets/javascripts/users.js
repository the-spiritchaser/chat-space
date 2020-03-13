$(function(){
  var search_list = $("#user-search-result");

  function appendUser(user){
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`

    search_list.append(html);
  }

  function appendErrMsgToHTML(msg){
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${msg}</p>
              </div>`

    search_list.append(html);
  }

  function  addUserToGroup(user_name, user_id){
    var html = `
              <div class='chat-group-user'>
                <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                <p class='chat-group-user__name'>${user_name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`

    $('.js-add-user').append(html)
  }

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val()

    $.ajax({
      url: '/users',
      type: 'GET',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users){
      search_list.empty();

      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        })
      }
      else if (input.length == 0){
        return false;
      }
      else{
        appendErrMsgToHTML("一致するユーザーが見つかりません")
      }
    })

    .fail(function(){
      alert("通信に失敗しました")
    })
  })

  $("#user-search-result").on("click", '.chat-group-user__btn--add', function(){
    $(this).parent().remove();

    var user_name = $(this).data('user-name')
    var user_id = $(this).data('user-id')

    addUserToGroup(user_name, user_id);
  })

  $("#chat-group-users").on("click", '.js-remove-btn', function(){
    $(this).parent().remove();
  })
})
