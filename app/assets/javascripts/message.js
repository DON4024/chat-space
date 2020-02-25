$(function(){ 
  function buildHTML(message){
   if ( message.image ) {

     var html =
      `<div class="message-group">
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
     return html;
   } else {
     var html =
      `<div class="message-group">
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
          <img src=${message.image.url} >
        </div>
      </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  console.log(url);
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
});
