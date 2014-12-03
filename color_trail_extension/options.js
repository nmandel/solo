var save_options = function() {
  console.log('saved options');
  // console.log(document.getElementById('magnitude').value);
  localStorage["magnitude"] = document.getElementById('magnitude').value;
  console.log('locst ' + localStorage.magnitude);

  // chrome.runtime.sendMessage({
  // 	magnitude: document.getElementById('magnitude')
  // }, function(response) { 
  // 	console.log(response);
  // });

  // chrome.storage.sync.set({
  // 	magnitude: document.getElementById('magnitude')
  // }, function() {console.log('saved magnitude')})
}

document.getElementById('save').addEventListener('click',
    save_options);


