
function updateSize() {
  var image = document.getElementById("image-canvas");
  var widthInput = document.getElementById("imageaspwidth");
  var heightInput = document.getElementById("imageaspheight");
  
  if (image.complete) {
    widthInput.value = image.naturalWidth;
    heightInput.value = image.naturalHeight;
  } else {
    image.addEventListener("load", function() {
      widthInput.value = image.naturalWidth;
      heightInput.value = image.naturalHeight;
    });
  }
}


function shareImageOnTwitter() {
  var imageSrc = document.getElementById('image-canvas').src;
  console.log(imageSrc);
  const imageUrl = imageSrc ; // replace with the URL of the image you want to share
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(imageUrl)}`);
  console.log(imageUrl);
}
function shareImageOnFacebook() {
    var imageSrc = document.getElementById('image-canvas').src;
    console.log(imageSrc);
    const imageUrl = imageSrc ;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`);
}
function shareImageOnInstagram() {
    var imageSrc = document.getElementById('image-canvas').src;
    console.log(imageSrc);
    const imageUrl = imageSrc ;
    window.open(`https://www.instagram.com/create/story/image/?url=${encodeURIComponent(imageUrl)}`);
}
function shareImageOnLinkedIn() {
  var imageSrc = document.getElementById('image-canvas').src;
  console.log(imageSrc);
  const imageUrl = imageSrc ;
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(imageUrl)}`);
}
function shareImageOnPinterest() {
  var imageSrc = document.getElementById('image-canvas').src;
  console.log(imageSrc);
  const imageUrl = imageSrc ;
  window.open(`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(imageUrl)}`);
}

const img = document.getElementById('image-canvas');
// Check first if there is an image and it has an src then do the function if not just skip it
if (!img || !img.src) {
  console.error('Image source not found');
} else {
  const imageSrc = img.src;
  console.log(imageSrc)
  document.getElementById("imageurl").innerHTML = imageSrc;

  const canvas = document.getElementById('histogram-canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const histogram = Array(256).fill(0);
    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const luma = Math.round(r * 0.2126 + g * 0.7152 + b * 0.0722);
      histogram[luma]++;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / histogram.length;
    const barHeight = canvas.height / Math.max(...histogram);

    for (let i = 0; i < histogram.length; i++) {
      const x = i * barWidth;
      const y = canvas.height - histogram[i] * barHeight;
      const width = barWidth;
      const height = histogram[i] * barHeight;
      ctx.fillStyle = '#000';
      ctx.fillRect(x, y, width, height);
    }
  };

  img.src = imageSrc;
}


function getContrast() {
  var imageSrc = document.getElementById('image-canvas').src;
  console.log(imageSrc);
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById('image-canvas');
  var img1 = document.getElementById('image-canvas1'); 
  var img2 = document.getElementById('image-canvas2');
  var img3 = document.getElementById('image-canvas3');
  var img4 = document.getElementById('image-canvas4');
  var img5 = document.getElementById('image-canvas5');
  var contrastValue = document.getElementById('CONT').value;
  console.log(contrastValue);
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  console.log(imageName);
  var imageExt = imageName.split('.').pop();
  console.log(imageExt);
  var timestamp = new Date().getTime().toString().slice(-4);  // Get the current timestamp
  var newImageName = imageName.split('.')[0] + '-' + timestamp + '.' + imageExt; // Add timestamp to the image name
  console.log(newImageName);
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', '/adjust_contrast', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response['image'];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: 'image/png' });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      console.log(imageName);
      var newURL = '/static/uploads/' + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL;
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL;// new canvas
      img5.src = newURL;
      console.log(newURL);
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
      console.log(imgName)
      // set the value of the hidden input field to the filename
      document.getElementById('image_name').value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(JSON.stringify({ imageName: imageName, newImageName: newImageName, contrastValue: contrastValue }));
}


function getHighlight() {
  var imageSrc = document.getElementById('image-canvas').src;
  console.log(imageSrc);
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById('image-canvas');
  var img1 = document.getElementById('image-canvas1');
  var img2 = document.getElementById('image-canvas2');
  var img3 = document.getElementById('image-canvas3');
  var img4 = document.getElementById('image-canvas4');
  var img5 = document.getElementById('image-canvas5');
  var highlightValue = document.getElementById('HIGH').value;
  console.log(highlightValue);
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  console.log(imageName);
  var imageExt = imageName.split('.').pop();
  console.log(imageExt);
  var timestamp = new Date().getTime().toString().slice(-4);  // Get the current timestamp
  var newImageName = imageName.split('.')[0] + '-' + timestamp + '.' + imageExt; // Add timestamp to the image name
  console.log(newImageName);
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', '/adjust_highlight', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response['image'];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: 'image/png' });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      console.log(imageName);
      var newURL = '/static/uploads/' + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL;// new canvas
      img5.src = newURL;
      console.log(newURL);
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
      console.log(imgName)
      // set the value of the hidden input field to the filename
      document.getElementById('image_name').value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(JSON.stringify({ imageName: imageName, newImageName: newImageName, highlightValue: highlightValue }));
}

function getShadow() {
  var imageSrc = document.getElementById('image-canvas').src;
  console.log(imageSrc);
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById('image-canvas');
  var img1 = document.getElementById('image-canvas1');
  var img2 = document.getElementById('image-canvas2');
  var img3 = document.getElementById('image-canvas3');
  var img4 = document.getElementById('image-canvas4');  
  var img5 = document.getElementById('image-canvas5');
  var shadowValue = document.getElementById('SHAD').value;
  console.log(shadowValue);
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  console.log(imageName);
  var imageExt = imageName.split('.').pop();
  console.log(imageExt);
  var timestamp = new Date().getTime().toString().slice(-4);  // Get the current timestamp
  var newImageName = imageName.split('.')[0] + '-' + timestamp + '.' + imageExt; // Add timestamp to the image name
  console.log(newImageName);
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', '/adjust_shadow', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response['image'];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: 'image/png' });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      console.log(imageName);
      var newURL = '/static/uploads/' + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL;// new canvas
      img5.src = newURL;
      console.log(newURL);
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
      console.log(imgName)
      // set the value of the hidden input field to the filename
      document.getElementById('image_name').value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(JSON.stringify({ imageName: imageName, newImageName: newImageName, shadowValue: shadowValue }));
}

function getWhite() {
  var imageSrc = document.getElementById('image-canvas').src;
  console.log(imageSrc);
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById('image-canvas');
  var img1 = document.getElementById('image-canvas1');
  var img2 = document.getElementById('image-canvas2');
  var img3 = document.getElementById('image-canvas3');
  var img4 = document.getElementById('image-canvas4');
  var img5 = document.getElementById('image-canvas5');
  var whiteValue = document.getElementById('WHITE').value;
  console.log(whiteValue);
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  console.log(imageName);
  var imageExt = imageName.split('.').pop();
  console.log(imageExt);
  var timestamp = new Date().getTime().toString().slice(-4);  // Get the current timestamp
  var newImageName = imageName.split('.')[0] + '-' + timestamp + '.' + imageExt; // Add timestamp to the image name
  console.log(newImageName);
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', '/adjust_white', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response['image'];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: 'image/png' });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      console.log(imageName);
      var newURL = '/static/uploads/' + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL;// new canvas
      img5.src = newURL;
      console.log(newURL);
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
      console.log(imgName)
      // set the value of the hidden input field to the filename
      document.getElementById('image_name').value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(JSON.stringify({ imageName: imageName, newImageName: newImageName, whiteValue: whiteValue }));
}



function getBlack() {
  var imageSrc = document.getElementById('image-canvas').src;
  console.log(imageSrc);
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById('image-canvas');
  var img1 = document.getElementById('image-canvas1');
  var img2 = document.getElementById('image-canvas2');
  var img3 = document.getElementById('image-canvas3');
  var img4 = document.getElementById('image-canvas4');  
  var img5 = document.getElementById('image-canvas5');
  var blackValue = document.getElementById('BLACK').value;
  console.log(blackValue);
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  console.log(imageName);
  var imageExt = imageName.split('.').pop();
  console.log(imageExt);
  var timestamp = new Date().getTime().toString().slice(-4);  // Get the current timestamp
  var newImageName = imageName.split('.')[0] + '-' + timestamp + '.' + imageExt; // Add timestamp to the image name
  console.log(newImageName);
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', '/adjust_black', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response['image'];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: 'image/png' });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      console.log(imageName);
      var newURL = '/static/uploads/' + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL;// new canvas   
      img5.src = newURL;   
      console.log(newURL);
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
      console.log(imgName)
      // set the value of the hidden input field to the filename
      document.getElementById('image_name').value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(JSON.stringify({ imageName: imageName, newImageName: newImageName, blackValue: blackValue }));
}


function getExposure() {
  var imageSrc = document.getElementById('image-canvas').src;
  console.log(imageSrc);
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById('image-canvas');
  var img1 = document.getElementById('image-canvas1');
  var img2 = document.getElementById('image-canvas2');
  var img3 = document.getElementById('image-canvas3');
  var img4 = document.getElementById('image-canvas4'); 
  var img5 = document.getElementById('image-canvas5'); 
  var exposureValue = document.getElementById('EXPO').value;
  console.log(exposureValue);
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  console.log(imageName);
  var imageExt = imageName.split('.').pop();
  console.log(imageExt);
  var timestamp = new Date().getTime().toString().slice(-4);  // Get the current timestamp
  var newImageName = imageName.split('.')[0] + '-' + timestamp + '.' + imageExt; // Add timestamp to the image name
  console.log(newImageName);
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', '/adjust_exposure', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response['image'];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: 'image/png' });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      console.log(imageName);
      var newURL = '/static/uploads/' + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL;// new canvas 
      img5.src = newURL;     
      console.log(newURL);
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
      console.log(imgName)
      // set the value of the hidden input field to the filename
      document.getElementById('image_name').value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(JSON.stringify({ imageName: imageName, newImageName: newImageName, exposureValue: exposureValue }));
}


function getTemp() {
  var imageSrc = document.getElementById('image-canvas').src;
  console.log(imageSrc);
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById('image-canvas');
  var img1 = document.getElementById('image-canvas1');
  var img2 = document.getElementById('image-canvas2');
  var img3 = document.getElementById('image-canvas3');
  var img4 = document.getElementById('image-canvas4');
  var img5 = document.getElementById('image-canvas5');
  var tempValue = document.getElementById('TEMP').value;
  console.log(tempValue);
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  console.log(imageName);
  var imageExt = imageName.split('.').pop();
  console.log(imageExt);
  var timestamp = new Date().getTime().toString().slice(-4);  // Get the current timestamp
  var newImageName = imageName.split('.')[0] + '-' + timestamp + '.' + imageExt; // Add timestamp to the image name
  console.log(newImageName);
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', '/adjust_temp', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response['image'];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: 'image/png' });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      console.log(imageName);
      var newURL = '/static/uploads/' + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL;       // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL;// new canvas   
      img5.src = newURL;   
      console.log(newURL);
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
      console.log(imgName)
      // set the value of the hidden input field to the filename
      document.getElementById('image_name').value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(JSON.stringify({ imageName: imageName, newImageName: newImageName, tempValue: tempValue }));
}

function getTint() {
  var imageSrc = document.getElementById('image-canvas').src;
  console.log(imageSrc);
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById('image-canvas');
  var img1 = document.getElementById('image-canvas1');
  var img2 = document.getElementById('image-canvas2');
  var img3 = document.getElementById('image-canvas3');
  var img4 = document.getElementById('image-canvas4');  
  var img5 = document.getElementById('image-canvas5');
  var tintValue = document.getElementById('TINT').value;
  console.log(tintValue);
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  console.log(imageName);
  var imageExt = imageName.split('.').pop();
  console.log(imageExt);
  var timestamp = new Date().getTime().toString().slice(-4);  // Get the current timestamp
  var newImageName = imageName.split('.')[0] + '-' + timestamp + '.' + imageExt; // Add timestamp to the image name
  console.log(newImageName);
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', '/adjust_tint', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response['image'];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: 'image/png' });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      console.log(imageName);
      var newURL = '/static/uploads/' + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL;// new canvas  
      img5.src = newURL;    
      console.log(newURL);
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
      console.log(imgName)
      // set the value of the hidden input field to the filename
      document.getElementById('image_name').value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(JSON.stringify({ imageName: imageName, newImageName: newImageName, tintValue: tintValue }));
}


function getText() {
  var imageSrc = document.getElementById('image-canvas').src;
  console.log(imageSrc);
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById('image-canvas');
  var img1 = document.getElementById('image-canvas1');
  var img2 = document.getElementById('image-canvas2');
  var img3 = document.getElementById('image-canvas3');
  var img4 = document.getElementById('image-canvas4');
  var img5 = document.getElementById('image-canvas5');
  var textValue = document.getElementById('TEXT').value;
  console.log(textValue);
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  console.log(imageName);
  var imageExt = imageName.split('.').pop();
  console.log(imageExt);
  var timestamp = new Date().getTime().toString().slice(-4);  // Get the current timestamp
  var newImageName = imageName.split('.')[0] + '-' + timestamp + '.' + imageExt; // Add timestamp to the image name
  console.log(newImageName);
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', '/adjust_text', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response['image'];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: 'image/png' });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      console.log(imageName);
      var newURL = '/static/uploads/' + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL;// new canvas
      img5.src = newURL;
      console.log(newURL);
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
      console.log(imgName)
      // set the value of the hidden input field to the filename
      document.getElementById('image_name').value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(JSON.stringify({ imageName: imageName, newImageName: newImageName, textValue: textValue }));
}


function getClar() {
  var imageSrc = document.getElementById('image-canvas').src;
  console.log(imageSrc);
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById('image-canvas');
  var img1 = document.getElementById('image-canvas1');
  var img2 = document.getElementById('image-canvas2');
  var img3 = document.getElementById('image-canvas3');
  var img4 = document.getElementById('image-canvas4');
  var img5 = document.getElementById('image-canvas5');
  var clarValue = document.getElementById('CLAR').value;
  console.log(clarValue);
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  console.log(imageName);
  var imageExt = imageName.split('.').pop();
  console.log(imageExt);
  var timestamp = new Date().getTime().toString().slice(-4);  // Get the current timestamp
  var newImageName = imageName.split('.')[0] + '-' + timestamp + '.' + imageExt; // Add timestamp to the image name
  console.log(newImageName);
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', '/adjust_clar', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response['image'];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: 'image/png' });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      console.log(imageName);
      var newURL = '/static/uploads/' + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL;// new canvas  
      img5.src = newURL;    
      console.log(newURL);
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
      console.log(imgName)
      // set the value of the hidden input field to the filename
      document.getElementById('image_name').value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(JSON.stringify({ imageName: imageName, newImageName: newImageName, clarValue: clarValue }));
}



function getDeh() {
  var imageSrc = document.getElementById('image-canvas').src;
  console.log(imageSrc);
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById('image-canvas');
  var img1 = document.getElementById('image-canvas1');
  var img2 = document.getElementById('image-canvas2');
  var img3 = document.getElementById('image-canvas3');
  var img4 = document.getElementById('image-canvas4');
  var img5 = document.getElementById('image-canvas5');  
  var dehValue = document.getElementById('DEH').value;
  console.log(dehValue);
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  console.log(imageName);
  var imageExt = imageName.split('.').pop();
  console.log(imageExt);
  var timestamp = new Date().getTime().toString().slice(-4);  // Get the current timestamp
  var newImageName = imageName.split('.')[0] + '-' + timestamp + '.' + imageExt; // Add timestamp to the image name
  console.log(newImageName);
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', '/adjust_deh', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response['image'];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: 'image/png' });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      console.log(imageName);
      var newURL = '/static/uploads/' + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL;// new canvas   
      img5.src = newURL;   
      console.log(newURL);
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
      console.log(imgName)
      // set the value of the hidden input field to the filename
      document.getElementById('image_name').value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(JSON.stringify({ imageName: imageName, newImageName: newImageName, dehValue: dehValue }));
}


function getSat() {
  var imageSrc = document.getElementById('image-canvas').src;
  console.log(imageSrc);
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById('image-canvas');
  var img1 = document.getElementById('image-canvas1');
  var img2 = document.getElementById('image-canvas2');
  var img3 = document.getElementById('image-canvas3');
  var img4 = document.getElementById('image-canvas4'); 
  var img5 = document.getElementById('image-canvas5'); 
  var satValue = document.getElementById('SAT').value;
  console.log(satValue);
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  console.log(imageName);
  var imageExt = imageName.split('.').pop();
  console.log(imageExt);
  var timestamp = new Date().getTime().toString().slice(-4);  // Get the current timestamp
  var newImageName = imageName.split('.')[0] + '-' + timestamp + '.' + imageExt; // Add timestamp to the image name
  console.log(newImageName);
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', '/adjust_sat', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response['image'];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: 'image/png' });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      console.log(imageName);
      var newURL = '/static/uploads/' + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL;// new canvas 
      img5.src = newURL;     
      console.log(newURL);
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
      console.log(imgName)
      // set the value of the hidden input field to the filename
      document.getElementById('image_name').value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(JSON.stringify({ imageName: imageName, newImageName: newImageName, satValue: satValue }));
}


function getVir() {
  var imageSrc = document.getElementById('image-canvas').src;
  console.log(imageSrc);
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById('image-canvas');
  var img1 = document.getElementById('image-canvas1');
  var img2 = document.getElementById('image-canvas2');
  var img3 = document.getElementById('image-canvas3');
  var img4 = document.getElementById('image-canvas4'); 
  var img5 = document.getElementById('image-canvas5'); 
  var virValue = document.getElementById('VIR').value;
  console.log(virValue);
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  console.log(imageName);
  var imageExt = imageName.split('.').pop();
  console.log(imageExt);
  var timestamp = new Date().getTime().toString().slice(-4);  // Get the current timestamp
  var newImageName = imageName.split('.')[0] + '-' + timestamp + '.' + imageExt; // Add timestamp to the image name
  console.log(newImageName);
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', '/adjust_vir', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response['image'];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: 'image/png' });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      console.log(imageName);
      var newURL = '/static/uploads/' + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL;// new canvas
      img5.src = newURL;      
      console.log(newURL);
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
      console.log(imgName)
      // set the value of the hidden input field to the filename
      document.getElementById('image_name').value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;

    }
  };
  xhr.send(JSON.stringify({ imageName: imageName, newImageName: newImageName, virValue: virValue }));
}

function getBlur() {
  var imageSrc = document.getElementById('image-canvas').src;
  console.log(imageSrc);
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById('image-canvas');
  var img1 = document.getElementById('image-canvas1');
  var img2 = document.getElementById('image-canvas2');
  var img3 = document.getElementById('image-canvas3');
  var img4 = document.getElementById('image-canvas4');
  var img5 = document.getElementById('image-canvas5');
  var blurValue = document.getElementById('blurslider').value;
  console.log(blurValue);
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  console.log(imageName);
  var imageExt = imageName.split('.').pop();
  console.log(imageExt);
  var timestamp = new Date().getTime().toString().slice(-4);  // Get the current timestamp
  var newImageName = imageName.split('.')[0] + '-' + timestamp + '.' + imageExt; // Add timestamp to the image name
  console.log(newImageName);
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', '/adjust_blur', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response['image'];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: 'image/png' });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      console.log(imageName);
      var newURL = '/static/uploads/' + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL;
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL;// new canvas
      img5.src = newURL;
      console.log(newURL);
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
      console.log(imgName)
      // set the value of the hidden input field to the filename
      document.getElementById('image_name').value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;

    }
  };
  xhr.send(JSON.stringify({ imageName: imageName, newImageName: newImageName, blurValue: blurValue }));
}


function getGrain() {
  var imageSrc = document.getElementById('image-canvas').src;
  console.log(imageSrc);
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById('image-canvas');
  var img1 = document.getElementById('image-canvas1');
  var img2 = document.getElementById('image-canvas2');
  var img3 = document.getElementById('image-canvas3');
  var img4 = document.getElementById('image-canvas4');
  var img5 = document.getElementById('image-canvas5');
  var grainValue = document.getElementById('grainslider').value;
  console.log(grainValue);
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  console.log(imageName);
  var imageExt = imageName.split('.').pop();
  console.log(imageExt);
  var timestamp = new Date().getTime().toString().slice(-4);  // Get the current timestamp
  var newImageName = imageName.split('.')[0] + '-' + timestamp + '.' + imageExt; // Add timestamp to the image name
  console.log(newImageName);
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', '/adjust_grain', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response['image'];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: 'image/png' });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      console.log(imageName);
      var newURL = '/static/uploads/' + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL;// new canvas 
      img5.src = newURL;   
      console.log(newURL);
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
      console.log(imgName)
      // set the value of the hidden input field to the filename
      document.getElementById('image_name').value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;

    }
  };
  xhr.send(JSON.stringify({ imageName: imageName, newImageName: newImageName, grainValue: grainValue }));
}








function getAsp() {
  var imageSrc = document.getElementById('image-canvas').src;
  console.log(imageSrc);
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById('image-canvas');
  var img1 = document.getElementById('image-canvas1');
  var img2 = document.getElementById('image-canvas2');
  var img3 = document.getElementById('image-canvas3');
  var img4 = document.getElementById('image-canvas4');
  var img5 = document.getElementById('image-canvas5');
  var widthAspValue = document.getElementById('imageaspwidth').value;
  var heightAspValue = document.getElementById('imageaspheight').value;
  console.log(widthAspValue);
  console.log(heightAspValue);
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  console.log(imageName);
  var imageExt = imageName.split('.').pop();
  console.log(imageExt);
  var timestamp = new Date().getTime().toString().slice(-4);  // Get the current timestamp
  var newImageName = imageName.split('.')[0] + '-' + timestamp + '.' + imageExt; // Add timestamp to the image name
  console.log(newImageName);
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', '/adjust_asp', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response['image'];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: 'image/png' });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      console.log(imageName);
      var newURL = '/static/uploads/' + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL;// new canvas 
      img5.src = newURL;   
      console.log(newURL);
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
      console.log(imgName)
      // set the value of the hidden input field to the filename
      document.getElementById('image_name').value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;

    }
  };
  xhr.send(JSON.stringify({ imageName: imageName, newImageName: newImageName, widthAspValue: widthAspValue, heightAspValue: heightAspValue}));
}


const fileInput = document.getElementById("fileopen");
const selectedImageName = document.querySelector(".wrapopenname p");
const openscreenup = document.querySelector(".openscreenup");
fileInput.addEventListener("change", function() {
  const selectedFile = fileInput.files[0];
  const selectedFileName = selectedFile ? selectedFile.name : "Select Image";
  const label = document.querySelector("#fileopenlable");
  label.textContent = selectedFileName;

  if (selectedFile) {
    // Create a new FileReader instance
    const reader = new FileReader();

    // Set up a callback function to run when the file is loaded
    reader.onload = function() {
      
      // Create a new image element
      const imagePreview = document.createElement("img");
      imagePreview.src = reader.result;
      imagePreview.style.padding = "1%";
      imagePreview.style.maxWidth = "100%";
      imagePreview.style.height = "auto";
      imagePreview.style.objectFit = "contain";
      imagePreview.style.maxHeight = "100%";
      imagePreview.style.borderRadius = "9px";

      // Add the image element to the openscreenup div
      openscreenup.innerHTML = "";
      openscreenup.appendChild(imagePreview);
    };

    // Read the selected file as a data URL
    reader.readAsDataURL(selectedFile);
  } else {
    openscreenup.innerHTML = "";
    selectedImageName.style.display = "none";
  }
});

const imageFormatSelector = document.querySelector("#image_format_selector");
const imageQualitySelector = document.querySelector("#image_quality_selector");

imageFormatSelector.addEventListener("change", function() {
    if (this.value === ".png") {
        imageQualitySelector.disabled = true;
    } else {
        imageQualitySelector.disabled = false;
    }
});

const blurBtn = document.getElementById('blur_on_button');
const overlayblur = document.getElementById('overlayblur');
const saveBtnBlur = document.getElementById('savebtnforblur');
blurBtn.addEventListener('click', () => {
  overlayblur.classList.add('active'); // add the 'active' class to show the overlay
});

saveBtnBlur.addEventListener('click', () => {
  overlayblur.classList.remove('active'); // remove the 'active' class to hide the overlay
});

const aspBtn = document.getElementById('aspect_ratio_button');
const overlayAsp = document.getElementById('overlayasp');
const saveBtnAsp = document.getElementById('savebtnforasp');
aspBtn.addEventListener('click', () => {
  overlayAsp.classList.add('active');
  updateSize(); // add the 'active' class to show the overlay
});

saveBtnAsp.addEventListener('click', () => {
  overlayAsp.classList.remove('active'); // remove the 'active' class to hide the overlay
});




const downloadBtn = document.getElementById('download');
const overlay = document.getElementById('overlay');

downloadBtn.addEventListener('click', () => {
  overlay.classList.add('active'); // add the 'active' class to show the overlay
});

overlay.addEventListener('click', (event) => {
  if (event.target === overlay) {
    overlay.classList.remove('active'); // remove the 'active' class to hide the overlay
  }
});


const openBtn = document.getElementById('open');
const overlay1 = document.getElementById('overlay1');

openBtn.addEventListener('click', () => {
  overlay1.classList.add('active'); // add the 'active' class to show the overlay
});

overlay1.addEventListener('click', (event) => {
  if (event.target === overlay1) {
    overlay1.classList.remove('active'); // remove the 'active' class to hide the overlay
  }
});



const infoBtn = document.getElementById('info');
const overlay2 = document.getElementById('overlay2');
const closeinfoBtn = document.getElementById('savebtnforinfo');

infoBtn.addEventListener('click', () => {
  overlay2.classList.add('active'); // add the 'active' class to show the overlay
});

overlay2.addEventListener('click', (event) => {
  if (event.target === overlay2) {
    overlay2.classList.remove('active'); // remove the 'active' class to hide the overlay
  }
});
closeinfoBtn.addEventListener('click', () => {
  overlay2.classList.remove('active'); // remove the 'active' class to hide the overlay
});



const premBtn = document.getElementById('premium');
const overlay3 = document.getElementById('overlay3');
const closepremBtn = document.getElementById('savebtnforpremium');
premBtn.addEventListener('click', () => {
  overlay3.classList.add('active'); // add the 'active' class to show the overlay
});

overlay3.addEventListener('click', (event) => {
  if (event.target === overlay3) {
    overlay3.classList.remove('active'); // remove the 'active' class to hide the overlay
  }
});
closepremBtn.addEventListener('click', () => {
  overlay3.classList.remove('active'); // remove the 'active' class to hide the overlay
});

const shareBtn = document.getElementById('send');
const overlay4 = document.getElementById('overlay4');
const closeshareBtn = document.getElementById('savebtnforshare');

shareBtn.addEventListener('click', () => {
  overlay4.classList.add('active'); // add the 'active' class to show the overlay
});

overlay4.addEventListener('click', (event) => {
  if (event.target === overlay4) {
    overlay4.classList.remove('active'); // remove the 'active' class to hide the overlay
  }
});
closeshareBtn.addEventListener('click', () => {
  overlay4.classList.remove('active'); // remove the 'active' class to hide the overlay
});



const grainBtn = document.getElementById('grain_button');
const overlaygrain = document.getElementById('overlaygrain');
const closegrainBtn = document.getElementById('savebtnforgrain');

grainBtn.addEventListener('click', () => {
  overlaygrain.classList.add('active'); // add the 'active' class to show the overlay
});

closegrainBtn.addEventListener('click', () => {
  overlaygrain.classList.remove('active'); // remove the 'active' class to hide the overlay
});








var buttons = document.getElementsByClassName("btn");

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        if (this.classList.contains("clicked")) {
            this.classList.remove("clicked");
        } else {
            for (var j = 0; j < buttons.length; j++) {
                buttons[j].classList.remove("clicked");
            }
            this.classList.add("clicked");
        }
    });
}
saveBtnBlur.addEventListener("click", function() {
  for (var j = 0; j < buttons.length; j++) {
      buttons[j].classList.remove("clicked");
  }
});
closegrainBtn.addEventListener("click", function() {
  for (var j = 0; j < buttons.length; j++) {
      buttons[j].classList.remove("clicked");
  }
});
saveBtnAsp.addEventListener("click", function() {
  for (var j = 0; j < buttons.length; j++) {
      buttons[j].classList.remove("clicked");
  }
});
overlayAsp.addEventListener('click', (event) => {
  if (event.target === overlayAsp) {
    overlayAsp.classList.remove('active'); // remove the 'active' class to hide the overlay
  }
    // Remove the "clicked" class from all buttons
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("clicked");
    }
});
overlayblur.addEventListener('click', (event) => {
  if (event.target === overlayblur) {
    overlayblur.classList.remove('active'); // remove the 'active' class to hide the overlay
  }
    // Remove the "clicked" class from all buttons
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("clicked");
    }
});
overlaygrain.addEventListener('click', (event) => {
  if (event.target === overlaygrain) {
    overlaygrain.classList.remove('active'); // remove the 'active' class to hide the overlay
  }
    // Remove the "clicked" class from all buttons
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("clicked");
    }
});




const fontTypeSelector = document.querySelector('#font-type-selector');

fontTypeSelector.addEventListener('change', () => {
  const selectedOption = fontTypeSelector.options[fontTypeSelector.selectedIndex];

  if (selectedOption.value === 'Bold' && fontTypeSelector) {
    fontTypeSelector.style.fontWeight = 'bold';
  } 
  if (selectedOption.value === 'Italic' && fontTypeSelector) {
    fontTypeSelector.style.fontWeight = 'italic';
  }
  if (selectedOption.value === 'Normal' && fontTypeSelector) {
    fontTypeSelector.style.fontWeight = 'normal';
  }
});

const fontSelector = document.querySelector('#font-selector');

fontSelector.addEventListener('change', () => {
  const selectedOption = fontSelector.options[fontSelector.selectedIndex];

  if (selectedOption.value === 'Impact') {
    document.execCommand('impact', true, 'Impact');
  } 
});


// Check the initial font and set the selected text accordingly
const selectedOption = fontSelector.options[fontSelector.selectedIndex];

const tempSlider = document.querySelector('#TEMP');
const tempRangeValue = document.querySelector('#rangeValueTEMP');

const tintSlider = document.querySelector('#TINT');
const tintRangeValue = document.querySelector('#rangeValueTINT');

const expoSlider = document.querySelector('#EXPO');
const expoRangeValue = document.querySelector('#rangeValueEXPO');

const contSlider = document.querySelector('#CONT');
const contRangeValue = document.querySelector('#rangeValueCONT');

const highSlider = document.querySelector('#HIGH');
const highRangeValue = document.querySelector('#rangeValueHIGH');

const shadSlider = document.querySelector('#SHAD');
const shadRangeValue = document.querySelector('#rangeValueSHAD');

const whiteSlider = document.querySelector('#WHITE');
const whiteRangeValue = document.querySelector('#rangeValueWHITE');

const blackSlider = document.querySelector('#BLACK');
const blackRangeValue = document.querySelector('#rangeValueBLACK');

const textSlider = document.querySelector('#TEXT');
const textRangeValue = document.querySelector('#rangeValueTEXT');

const clarSlider = document.querySelector('#CLAR');
const clarRangeValue = document.querySelector('#rangeValueCLAR');

const dehSlider = document.querySelector('#DEH');
const dehRangeValue = document.querySelector('#rangeValueDEH');

const virSlider = document.querySelector('#VIR');
const virRangeValue = document.querySelector('#rangeValueVIR');

const satSlider = document.querySelector('#SAT');
const satRangeValue = document.querySelector('#rangeValueSAT');

tempSlider.addEventListener('input', () => {
    tempRangeValue.innerText = tempSlider.value;
});
  
tempSlider.addEventListener('dblclick', () => {
    tempSlider.value = 26000;
    tempRangeValue.innerText = 26000;
});

tintSlider.addEventListener('input', () => {
    tintRangeValue.innerText = tintSlider.value;
});

tintSlider.addEventListener('dblclick', () => {
    tintSlider.value = 0;
    tintRangeValue.innerText = 0;
});
  
expoSlider.addEventListener('input', () => {
  expoRangeValue.innerText = expoSlider.value;
});

expoSlider.addEventListener('dblclick', () => {
  expoSlider.value = 0;
  expoRangeValue.innerText = 0;
});

contSlider.addEventListener('input', () => {
  contRangeValue.innerText = contSlider.value;
});

contSlider.addEventListener('dblclick', () => {
  contSlider.value = 0;
  contRangeValue.innerText = 0;
});

highSlider.addEventListener('input', () => {
  highRangeValue.innerText = highSlider.value;
});

highSlider.addEventListener('dblclick', () => {
  highSlider.value = 0;
  highRangeValue.innerText = 0;
});

shadSlider.addEventListener('input', () => {
  shadRangeValue.innerText = shadSlider.value;
});

shadSlider.addEventListener('dblclick', () => {
  shadSlider.value = 0;
  shadRangeValue.innerText = 0;
});

whiteSlider.addEventListener('input', () => {
  whiteRangeValue.innerText = whiteSlider.value;
});

whiteSlider.addEventListener('dblclick', () => {
  whiteSlider.value = 0;
  whiteRangeValue.innerText = 0;
});

blackSlider.addEventListener('input', () => {
  blackRangeValue.innerText = blackSlider.value;
});

blackSlider.addEventListener('dblclick', () => {
  blackSlider.value = 0;
  blackRangeValue.innerText = 0;
});

textSlider.addEventListener('input', () => {
    textRangeValue.innerText = textSlider.value;
});
  
textSlider.addEventListener('dblclick', () => {
    textSlider.value = 0;
    textRangeValue.innerText = 0;
});

clarSlider.addEventListener('input', () => {
    clarRangeValue.innerText = clarSlider.value;
});
  
clarSlider.addEventListener('dblclick', () => {
    clarSlider.value = 0;
    clarRangeValue.innerText = 0;
});

dehSlider.addEventListener('input', () => {
    dehRangeValue.innerText = dehSlider.value;
});
  
dehSlider.addEventListener('dblclick', () => {
    dehSlider.value = 0;
    dehRangeValue.innerText = 0;
});

virSlider.addEventListener('input', () => {
    virRangeValue.innerText = virSlider.value;
});
  
virSlider.addEventListener('dblclick', () => {
    virSlider.value = 0;
    virRangeValue.innerText = 0;
});

satSlider.addEventListener('input', () => {
    satRangeValue.innerText = satSlider.value;
});
  
satSlider.addEventListener('dblclick', () => {
    satSlider.value = 0;
    satRangeValue.innerText = 0;
});
