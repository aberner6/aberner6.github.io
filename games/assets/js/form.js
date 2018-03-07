var $form = $('form#test-form'),
    url = 'https://script.google.com/macros/s/AKfycbyD7DC3YJ1wdzMWxJrG6PgVcQD32QhHgTT_5v8FjhoQSC_eIR0/exec'

$('#submit-form').on('click', function(e) {
  e.preventDefault();
  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serializeObject()
  }).success(
  );
})
$('#submit-form').on('click', function(e) {
  $('#test-form').hide();
  $('#submitted').show();  
})