var $form = $('form#test-form'),
    url = 'https://script.google.com/macros/s/AKfycbyD7DC3YJ1wdzMWxJrG6PgVcQD32QhHgTT_5v8FjhoQSC_eIR0/exec'

$('#test-form').on('click', '#submit-form', function(e) {
  e.preventDefault();
  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serializeObject()
  }).success(
  );
})

$('#test-form').on('click', '#submit-form', function(e) {
  $('#test-form').hide();
  terminalTextArray.push(
    "Thank you! You will be hearing from us soon.",
    "Feel free to share the puzzle with IOT developer+designer friends in the meantime - we are looking for participants!",
    "You can use this link",
    "<a href='#' onclick='savelink()'>Save link</a>",
    "Or you can try again",
    "<a href='#' onclick='replay()'>Play again!</a>");
  terminalText();
})