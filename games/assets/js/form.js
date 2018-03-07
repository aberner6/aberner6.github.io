var $form = $('form#test-form'),
    url = 'https://script.google.com/macros/s/AKfycbzDAYmyvD2gEco8bLrfsGXZ-MLrQ_SnSGukGPsDIShcG1EXCgU/exec'

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