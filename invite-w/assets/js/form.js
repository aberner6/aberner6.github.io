var $form = $('form#test-form'),
    url = 'https://script.google.com/macros/s/AKfycbxyIqYvxiCzkFZ3q72t4PTHsxX80PCfCZcxPLrw1Mlr2vn9U_k/exec'

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