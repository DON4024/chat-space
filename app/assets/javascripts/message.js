$(function(){ 
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = 
      `<div class="message-group" data-message-id=${message.id}>
        <div class="message-group__text-items">
          <div class="message-group__text-items__name">
            ${message.user_name}
          </div>
          <div class="message-group__text-items__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message-group__text-box">
          <p class="lower-message__content">
            ${message.content}
          </p>
          <img src=${message.image} >
        </div>
      </div>`
    } else if (message.content) {
      var html =
      `<div class="message-group" data-message-id=${message.id}>
        <div class="message-group__text-items">
          <div class="message-group__text-items__name">
            ${message.user_name}
          </div>
          <div class="message-group__text-items__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message-group__text-box">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
    </div>`
    } else if (message.image) {
      var html = 
      `<div class="message-group" data-message-id=${message.id}>
        <div class="message-group__text-items">
          <div class="message-group__text-items__name">
            ${message.user_name}
          </div>
          <div class="message-group__text-items__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message-group__text-box">
        <img src=${message.image}>
        </div>
      </div>`
    };
    return html;
    
  };
  
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
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $(".submit-btn").removeAttr("disabled");
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
})

var reloadMessages = function() {
  var last_message_id = $('.message-group:last').data("message-id");
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages, group) {
    if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.chat-main__message-list').append(insertHTML);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    }
    
  })
  .fail(function() {
    alert('error');
  });
  
};
if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
}
});
