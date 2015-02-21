// options set the magnitude of the "explosion" when click occurs
var save_options = function() {
  console.log('Saved options');
  localStorage["magnitude"] = $('#magnitude').get(0).value;
  console.log('Magnitude saved at ' + localStorage.magnitude);
}

$('#save').click(save_options);


