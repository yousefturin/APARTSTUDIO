
document.getElementById('register-link').addEventListener('click', function(event) {
  event.preventDefault();
  var registerForm = document.querySelector('.register-form');
  var loginForm = document.querySelector('.login-form');

  registerForm.style.display = 'flex';
  loginForm.style.display = 'none';
});

document.getElementById('login-link').addEventListener('click', function(event) {
  event.preventDefault();
  var registerForm = document.querySelector('.register-form');
  var loginForm = document.querySelector('.login-form');

  registerForm.style.display = 'none';
  loginForm.style.display = 'flex';
}); 
var loginPage = document.querySelector('.wrap_loging_form');



const loginFunctionHolder = document.getElementById("login_function_holder");
const wrapLogingForm = document.getElementById('wrap_loging_form');

loginFunctionHolder.addEventListener("click", () => {
  wrapLogingForm.classList.add("active"); // add the 'active' class to show the overlay
});
wrapLogingForm.addEventListener("click", (event) => {
  if (event.target === wrapLogingForm) {
    wrapLogingForm.classList.remove("active"); // remove the 'active' class to hide the overlay
  }
});





// Function to check if the user is on a phone or tablet

function isMobileOrTablet() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
function showNotification() {
  // Create a notification element
  var notification = document.createElement("div");
  notification.textContent =
    "This website is currently under construction and may not display optimally on all devices. We apologize for any inconvenience caused.";

  // Apply some styling to the notification element
  notification.style.position = "fixed";
  notification.style.bottom = "0";
  notification.style.left = "0";
  notification.style.width = "100%";
  notification.style.backgroundColor = "#8b3838";
  notification.style.color = "white";
  notification.style.padding = "10px";
  notification.style.textAlign = "center";

  // Append the notification element to the document body
  document.body.appendChild(notification);
}

// Check if the user is on a phone or tablet and display the notification
if (isMobileOrTablet()) {
  showNotification();
}

const toggle = document.getElementById("toggle");
const monthlyPrice1 = document.getElementById("monthly-price1");
const monthlyPrice2 = document.getElementById("monthly-price2");

if (toggle && monthlyPrice1 && monthlyPrice2) {
  toggle.addEventListener("change", function () {
    if (toggle.checked) {
      setTimeout(function () {
        monthlyPrice1.innerText = "70.99";
        monthlyPrice2.innerText = "190.99";
        monthlyPrice1.nextSibling.textContent = " / yearly";
        monthlyPrice2.nextSibling.textContent = " / yearly";
      }, 500);
    } else {
      setTimeout(function () {
        monthlyPrice1.innerText = "8.99";
        monthlyPrice2.innerText = "19.99";
        monthlyPrice1.nextSibling.textContent = " / month";
        monthlyPrice2.nextSibling.textContent = " / month";
      }, 500);
    }
  });
} else {
  console.log("One or more elements not found.");
}

const loginPageBG = document.querySelector(".login-page");
const leftpane = document.querySelector(".leftpane");
const toppane = document.querySelector(".toppane");
const rightpane = document.querySelector(".rightpane");
const middlepane = document.querySelector(".middlepane");
const footerpane = document.querySelector(".footer");
const toggleButton = document.getElementById("_1st-toggle-btn");
const themeToggle = document.getElementById("themeToggle");
const histogramcanvas = document.getElementById("histogram-canvas");
const overlaylogin = document.getElementById("overlay_login");
const overlaycontent = document.querySelector(".overlay-content");
const overlay1content = document.querySelector(".overlay1-content");
const overlay2content = document.querySelector(".overlay2-content");
const overlay3content = document.querySelector(".overlay3-content");
const overlay4content = document.querySelector(".overlay4-content");
const overlayblurcontent = document.querySelector(".overlayblur-content");
const overlaygraincontent = document.querySelector(".overlaygrain-content");
const overlayaspcontent = document.querySelector(".overlayasp-content");
const wrapadjustfeatureinfo = document.querySelector(
  ".wrapadjustfeatureinfo span"
);
const wrapselectfeatureinfo = document.querySelector(
  ".wrapselectfeatureinfo span"
);
const wrapuploadimaginfo = document.querySelector(".wrapuploadimaginfo span");
const wrapdownloadandsharefeature = document.querySelector(
  ".wrapdownloadandsharefeature span"
);

// Check if a theme is stored in cookies
const storedTheme = getCookie("theme");
if (storedTheme === "dark") {
  applyDarkTheme();
  themeToggle.checked = false;
} else {
  applyLightTheme();
  themeToggle.checked = true;
}

toggleButton.addEventListener("click", () => {
  // Toggle between themes
  if (leftpane.classList.contains("light-e5e5e5")) {
    applyDarkTheme();
    setCookie("theme", "dark", 365); // Store the theme in a cookie for 365 days
    themeToggle.checked = false;
  } else {
    applyLightTheme();
    setCookie("theme", "light", 365);
    themeToggle.checked = true;
  }
});

function applyLightTheme() {
  leftpane.classList.remove("dark-595858");
  toppane.classList.remove("dark-595858");
  rightpane.classList.remove("dark-595858");
  footerpane.classList.remove("dark-595858");
  overlaylogin.classList.remove("dark-595858");
  overlaycontent.classList.remove("dark-595858");
  overlay1content.classList.remove("dark-595858");
  overlay2content.classList.remove("dark-595858");
  overlay3content.classList.remove("dark-595858");
  overlay4content.classList.remove("dark-595858");
  middlepane.classList.remove("dark-4c4b4b");
  histogramcanvas.classList.remove("dark-4c4b4b");
  overlayblurcontent.classList.remove("dark-595858");
  overlaygraincontent.classList.remove("dark-595858");
  overlayaspcontent.classList.remove("dark-595858");
  wrapadjustfeatureinfo.classList.remove("dark-4c4b4b");
  wrapselectfeatureinfo.classList.remove("dark-4c4b4b");
  wrapuploadimaginfo.classList.remove("dark-4c4b4b");
  wrapdownloadandsharefeature.classList.remove("dark-4c4b4b");
  loginPageBG.classList.remove("dark-595858");

  leftpane.classList.add("light-e5e5e5");
  toppane.classList.add("light-e5e5e5");
  rightpane.classList.add("light-e5e5e5");
  footerpane.classList.add("light-e5e5e5");
  overlaylogin.classList.add("light-e5e5e5");
  overlaycontent.classList.add("light-e5e5e5");
  overlay1content.classList.add("light-e5e5e5");
  overlay2content.classList.add("light-e5e5e5");
  overlay3content.classList.add("light-e5e5e5");
  overlay4content.classList.add("light-e5e5e5");
  middlepane.classList.add("light-9b9b9b");
  histogramcanvas.classList.add("light-9b9b9b");
  overlayblurcontent.classList.add("light-e5e5e5");
  overlaygraincontent.classList.add("light-e5e5e5");
  overlayaspcontent.classList.add("light-e5e5e5");
  wrapadjustfeatureinfo.classList.add("light-9b9b9b");
  wrapselectfeatureinfo.classList.add("light-9b9b9b");
  wrapuploadimaginfo.classList.add("light-9b9b9b");
  wrapdownloadandsharefeature.classList.add("light-9b9b9b");
  loginPageBG.classList.add("light-e5e5e5");
}

function applyDarkTheme() {
  leftpane.classList.remove("light-e5e5e5");
  toppane.classList.remove("light-e5e5e5");
  rightpane.classList.remove("light-e5e5e5");
  footerpane.classList.remove("light-e5e5e5");
  overlaylogin.classList.remove("light-e5e5e5");
  overlaycontent.classList.remove("light-e5e5e5");
  overlay1content.classList.remove("light-e5e5e5");
  overlay2content.classList.remove("light-e5e5e5");
  overlay3content.classList.remove("light-e5e5e5");
  overlay4content.classList.remove("light-e5e5e5");
  middlepane.classList.remove("light-9b9b9b");
  histogramcanvas.classList.remove("light-9b9b9b");
  overlayblurcontent.classList.remove("light-e5e5e5");
  overlaygraincontent.classList.remove("light-e5e5e5");
  overlayaspcontent.classList.remove("light-e5e5e5");
  wrapadjustfeatureinfo.classList.remove("light-9b9b9b");
  wrapselectfeatureinfo.classList.remove("light-9b9b9b");
  wrapuploadimaginfo.classList.remove("light-9b9b9b");
  wrapdownloadandsharefeature.classList.remove("light-9b9b9b");
  loginPageBG.classList.remove("light-e5e5e5");

  leftpane.classList.add("dark-595858");
  toppane.classList.add("dark-595858");
  rightpane.classList.add("dark-595858");
  footerpane.classList.add("dark-595858");
  overlaylogin.classList.add("dark-595858");
  overlaycontent.classList.add("dark-595858");
  overlay1content.classList.add("dark-595858");
  overlay2content.classList.add("dark-595858");
  overlay3content.classList.add("dark-595858");
  overlay4content.classList.add("dark-595858");
  middlepane.classList.add("dark-4c4b4b");
  histogramcanvas.classList.add("dark-4c4b4b");
  overlayblurcontent.classList.add("dark-595858");
  overlaygraincontent.classList.add("dark-595858");
  overlayaspcontent.classList.add("dark-595858");
  wrapadjustfeatureinfo.classList.add("dark-4c4b4b");
  wrapselectfeatureinfo.classList.add("dark-4c4b4b");
  wrapuploadimaginfo.classList.add("dark-4c4b4b");
  wrapdownloadandsharefeature.classList.add("dark-4c4b4b");
  loginPageBG.classList.add("dark-595858");
}

// Helper function to set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Helper function to get a cookie by name
function getCookie(name) {
  const cookieName = name + "=";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

function setupVideoOverlay(button, overlay, video) {
  var timer;

  button.addEventListener("mouseover", function () {
    timer = setTimeout(showOverlay, 1000);
  });

  button.addEventListener("mouseout", function () {
    clearTimeout(timer);
    hideOverlay();
  });

  function showOverlay() {
    overlay.classList.add("active");
    video.currentTime = 0; // Start the video from the beginning
    video.play(); // Start playing the video
    video.playbackRate = 0.5; // Adjust the value to control the playback speed (e.g., 0.5 for half speed)
  }

  function hideOverlay() {
    overlay.classList.remove("active");
    video.pause(); // Pause the video when hiding the overlay
    video.currentTime = 0; // Reset the video to the beginning
  }

  // Listen for the 'ended' event to reset the playback rate once the video finishes playing
  video.addEventListener("ended", function () {
    video.playbackRate = 1.0; // Reset to normal playback speed
  });
}

var blurOnButton = document.getElementById("blur_on_button");
var imageOverlay = document.getElementById("blur_overlay_function");
var video = document.getElementById("blur_video_function");

setupVideoOverlay(blurOnButton, imageOverlay, video);

var grainOnButton = document.getElementById("grain_button");
var imageOverlayGrain = document.getElementById("grain_overlay_function");
var videoGrain = document.getElementById("grain_video_function");

setupVideoOverlay(grainOnButton, imageOverlayGrain, videoGrain);

var backgroundRemoveOnButton = document.getElementById("auto_fix_high_button");
var imageOverlayBackground = document.getElementById(
  "background_overlay_function"
);
var videoBackground = document.getElementById("background_video_function");

setupVideoOverlay(
  backgroundRemoveOnButton,
  imageOverlayBackground,
  videoBackground
);

var enhanceRemoveOnButton = document.getElementById("auto_awesome_button");
var imageOverlayEnhance = document.getElementById("enhance_overlay_function");
var videoEnhance = document.getElementById("enhance_video_function");

setupVideoOverlay(enhanceRemoveOnButton, imageOverlayEnhance, videoEnhance);

var colorizeRemoveOnButton = document.getElementById("camera_roll_button");
var imageOverlayColorize = document.getElementById("colorize_overlay_function");
var videoColorize = document.getElementById("colorize_video_function");

setupVideoOverlay(colorizeRemoveOnButton, imageOverlayColorize, videoColorize);

var cropRemoveOnButton = document.getElementById("crop_rotate_button");
var imageOverlayCrop = document.getElementById("crop_overlay_function");
var videoCrop = document.getElementById("crop_video_function");

setupVideoOverlay(cropRemoveOnButton, imageOverlayCrop, videoCrop);

var textRemoveOnButton = document.getElementById("format_button");
var imageOverlayText = document.getElementById("text_overlay_function");
var videoText = document.getElementById("text_video_function");

setupVideoOverlay(textRemoveOnButton, imageOverlayText, videoText);

var drawRemoveOnButton = document.getElementById("brush_button");
var imageOverlayDraw = document.getElementById("draw_overlay_function");
var videoDraw = document.getElementById("draw_video_function");

setupVideoOverlay(drawRemoveOnButton, imageOverlayDraw, videoDraw);

var eraserRemoveOnButton = document.getElementById("eraser_button");
var imageOverlayEraser = document.getElementById("eraser_overlay_function");
var videoEraser = document.getElementById("eraser_video_function");

setupVideoOverlay(eraserRemoveOnButton, imageOverlayEraser, videoEraser);

var AiRemoveOnButton = document.getElementById("ai_text_to_image");
var imageOverlayOpenai = document.getElementById("openai_overlay_function");
var videoOpenai = document.getElementById("openai_video_function");

setupVideoOverlay(AiRemoveOnButton, imageOverlayOpenai, videoOpenai);

// Get the cookie disclaimer element
var cookieDisclaimer = document.querySelector(".cookie-disclaimer");

// Get the close button element
var closeBtn = cookieDisclaimer.querySelector(".cookie-close");

// Function to hide the cookie disclaimer with fade-out animation
function hideCookieDisclaimer() {
  cookieDisclaimer.style.opacity = "0";
  setTimeout(function () {
    cookieDisclaimer.style.display = "none";
  }, 500); // Adjust the duration (in milliseconds) as desired for the fade-out animation
}

// Attach click event listener to the close button
closeBtn.addEventListener("click", hideCookieDisclaimer);

// Function to check if the user has previously agreed to the cookies
function hasUserAgreedToCookies() {
  // Check if a cookie named 'agreedToCookies' exists
  return document.cookie.indexOf("agreedToCookies") !== -1;
}

// Function to set the 'agreedToCookies' cookie when the user agrees
function setAgreedToCookies() {
  // Set the cookie to expire in 30 days
  var expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);
  document.cookie =
    "agreedToCookies=true; expires=" + expirationDate.toUTCString();
}

// Function to handle the click event on the "I agree" button
function handleAgreeButtonClick() {
  setAgreedToCookies();
  hideCookieDisclaimer();
}

// Get the "I agree" button element
var agreeBtn = cookieDisclaimer.querySelector(".cookie-agree");

// Attach click event listener to the "I agree" button
agreeBtn.addEventListener("click", handleAgreeButtonClick);

// Check if the user has already agreed to the cookies
if (hasUserAgreedToCookies()) {
  hideCookieDisclaimer();
}

var orangeCheckbox = document.getElementById("orange-checkbox_input");
var purpleCheckbox = document.getElementById("purpul-checkbox_input");
var payedplanewrapper = document.getElementById("payedplanewrapper_id");
var trainglewrapper = document.getElementById("traingle_checkbox_visu_id");
const button = document.getElementById("my-button");

// Check the orangeCheckbox by default
orangeCheckbox.checked = true;
payedplanewrapper.classList.add("orange-bg");
trainglewrapper.classList.add("orange-bg");
orangeCheckbox.disabled = true;

orangeCheckbox.addEventListener("change", function () {
  if (orangeCheckbox.checked) {
    payedplanewrapper.classList.add("orange-bg");
    trainglewrapper.classList.add("orange-bg");
    orangeCheckbox.disabled = true;

    // Unclick the purpleCheckbox
    purpleCheckbox.checked = false;
    purpleCheckbox.disabled = false;
    payedplanewrapper.classList.remove("purple-bg");
    trainglewrapper.classList.remove("purple-bg");
    button.textContent = "Get Started with Apart Studio Pro";
  } else {
    payedplanewrapper.classList.remove("orange-bg");
    trainglewrapper.classList.remove("orange-bg");
    orangeCheckbox.disabled = true;
  }
});

purpleCheckbox.addEventListener("change", function () {
  if (purpleCheckbox.checked) {
    payedplanewrapper.classList.add("purple-bg");
    trainglewrapper.classList.add("purple-bg");
    purpleCheckbox.disabled = true;

    // Unclick the orangeCheckbox
    orangeCheckbox.checked = false;
    orangeCheckbox.disabled = false;
    payedplanewrapper.classList.remove("orange-bg");
    trainglewrapper.classList.remove("orange-bg");
    button.textContent = "Get Started with Apart Studio Pro+";
  } else {
    payedplanewrapper.classList.remove("purple-bg");
    trainglewrapper.classList.remove("purple-bg");
    purpleCheckbox.disabled = false;
  }
});

const downloadImage = document.getElementById("image-canvas");
// Check first if there is an image and it has an src then do the function if not just skip it
if (!downloadImage || !downloadImage.src) {
  document.getElementById("download").disabled = true;
  document.getElementById("send").disabled = true;
  document.getElementById("auto_awesome_button").disabled = true;
  document.getElementById("camera_roll_button").disabled = true;
  document.getElementById("ai_text_to_image").disabled = true;
  document.getElementById("auto_fix_high_button").disabled = true;
  document.getElementById("download").style.cursor = "not-allowed";
  document.getElementById("send").style.cursor = "not-allowed";
  document.getElementById("download").classList.add("disabled");
  document.getElementById("send").classList.add("disabled");
  document.getElementById("auto_awesome_button").classList.add("disabled");
  document.getElementById("camera_roll_button").classList.add("disabled");
  document.getElementById("ai_text_to_image").classList.add("disabled");
  document.getElementById("auto_fix_high_button").classList.add("disabled");
  document.getElementById("auto_fix_high_button").style.cursor = "not-allowed";
  document.getElementById("auto_awesome_button").style.cursor = "not-allowed";
  document.getElementById("camera_roll_button").style.cursor = "not-allowed";
  document.getElementById("ai_text_to_image").style.cursor = "not-allowed";
} else {
  document.getElementById("download").disabled = false;
  document.getElementById("send").disabled = false;
  document.getElementById("auto_awesome_button").disabled = false;
  document.getElementById("camera_roll_button").disabled = false;
  document.getElementById("ai_text_to_image").disabled = false;
  document.getElementById("auto_fix_high_button").disabled = false;
  document.getElementById("download").classList.remove("disabled");
  document.getElementById("send").classList.remove("disabled");
  document.getElementById("auto_awesome_button").classList.remove("disabled");
  document.getElementById("camera_roll_button").classList.remove("disabled");
  document.getElementById("ai_text_to_image").classList.remove("disabled");
  document.getElementById("auto_fix_high_button").classList.remove("disabled");
}

var cropButton = document.getElementById("crop_rotate_button");
var textBox = null; // initialize textBox variable to null

cropButton.addEventListener("click", function () {
  if (textBox) {
    // if textBox exists, remove it
    var img = document.getElementById("image-canvas");
    // Get the size of the textBox element
    var textBoxWidth = textBox.offsetWidth;
    var textBoxHeight = textBox.offsetHeight;
    var textBoxX = textBox.offsetLeft - img.offsetLeft;
    var textBoxY = textBox.offsetTop - img.offsetTop;
    // Get the natural width and height of the image
    var naturalWidth = img.naturalWidth;
    var naturalHeight = img.naturalHeight;
    // Map the position and size of the textBox to the natural width and height of the image
    var mappedX = (textBoxX * naturalWidth) / img.offsetWidth;
    var mappedY = (textBoxY * naturalHeight) / img.offsetHeight;
    var mappedWidth = (textBoxWidth * naturalWidth) / img.offsetWidth;
    var mappedHeight = (textBoxHeight * naturalHeight) / img.offsetHeight;
    var imageSrc = document.getElementById("image-canvas").src;
    document.getElementById("imageurl").innerHTML = imageSrc;
    var img1 = document.getElementById("image-canvas1");
    var img2 = document.getElementById("image-canvas2");
    var img3 = document.getElementById("image-canvas3");
    var img4 = document.getElementById("image-canvas4");
    var img5 = document.getElementById("image-canvas5");
    var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
    var imageExt = imageName.split(".").pop();
    var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
    var newImageName =
      imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "/crop_image", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Decode the Base64-encoded image data
        var imgData = xhr.response["image"];
        var byteCharacters = atob(imgData);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        // Create a blob with the byte array and create an object URL
        var blob = new Blob([byteArray], { type: "image/png" });
        var blobURL = URL.createObjectURL(blob);
        // Get the image name from the URL and construct the new URL
        var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
        var newURL = "/static/uploads/" + newImageName;
        // Set the new image source
        img.src = newURL;
        img1.src = newURL;
        img2.src = newURL;
        img3.src = newURL;
        img4.src = newURL; // new canvas
        img5.src = newURL;
        // Revoke the old object URL to free up memory
        URL.revokeObjectURL(blobURL);
        const imgSrc = img.src;
        const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
        // set the value of the hidden input field to the filename
        document.getElementById("image_name").value = imgName;
        document.getElementById("imageurl").innerHTML = imageSrc;
      }
    };
    xhr.send(
      JSON.stringify({
        imageName: imageName,
        newImageName: newImageName,
        mappedX: mappedX,
        mappedY: mappedY,
        mappedWidth: mappedWidth,
        mappedHeight: mappedHeight,
      })
    );
    textBox.parentNode.removeChild(textBox);
    textBox = null; // reset textBox variable to null
  } else {
    // if textBox does not exist, add it
    textBox = addcropBoxToCanvas();
  }
});

function addcropBoxToCanvas() {
  // Get the canvas element
  var canvas = document.getElementById("image-canvas");
  // Create a new text box element
  var textBox = document.createElement("textarea");
  textBox.style.position = "absolute";
  textBox.style.width = canvas.offsetWidth - 200 + "px";
  textBox.style.height = canvas.offsetHeight - 200 + "px";
  textBox.style.outline = "4px solid white";
  textBox.style.backgroundColor = "transparent";
  textBox.style.color = "black";
  textBox.readOnly = true;

  var canvasRect = canvas.getBoundingClientRect();
  var canvasCenterX = canvasRect.left + canvasRect.width / 2;
  var canvasCenterY = canvasRect.top + canvasRect.height / 2;

  var textBoxWidth = parseInt(textBox.style.width);
  var textBoxHeight = parseInt(textBox.style.height);

  textBox.style.left = canvasCenterX - textBoxWidth / 2 + "px";
  textBox.style.top = canvasCenterY - textBoxHeight / 2 + "px";

  // Add event listeners for moving the text box
  var isDragging = false;
  var startX, startY;
  textBox.addEventListener("mousedown", function (event) {
    isDragging = true;
    startX = event.clientX - parseInt(textBox.style.left);
    startY = event.clientY - parseInt(textBox.style.top);
  });
  textBox.addEventListener("mouseup", function (event) {
    isDragging = false;
    textBox.style.cursor = "grab"; // Change cursor back to grab
  });
  textBox.addEventListener("mousemove", function (event) {
    if (isDragging) {
      var xMin = canvasRect.left + 75;
      var xMax = canvasRect.right - textBox.offsetWidth - 75;
      var yMin = canvasRect.top + 75;
      var yMax = canvasRect.bottom - textBox.offsetHeight - 75;

      var x = event.clientX - startX;
      var y = event.clientY - startY;

      x = Math.min(Math.max(x, xMin), xMax);
      y = Math.min(Math.max(y, yMin), yMax);

      textBox.style.left = x + "px";
      textBox.style.top = y + "px";
    }
  });
  // Change cursor to grab when hovering over the text area
  textBox.addEventListener("mouseenter", function (event) {
    textBox.style.cursor = "grab";
  });
  // Stop moving the text box when the mouse leaves it
  textBox.addEventListener("mouseleave", function (event) {
    isDragging = false;
    textBox.style.cursor = "default";
  });

  // Add event listeners for resizing the text box
  var isResizing = false;
  var startWidth, startHeight, startX, startY;
  var resizer = document.createElement("div");
  resizer.style.width = "10px";
  resizer.style.height = "10px";
  resizer.style.position = "absolute";
  resizer.style.bottom = 0;
  resizer.style.right = 0;
  textBox.appendChild(resizer);
  resizer.addEventListener("mousedown", function (event) {
    isResizing = true;
    startWidth = parseInt(textBox.style.width);
    startHeight = parseInt(textBox.style.height);
    startX = event.clientX;
    startY = event.clientY;
  });
  textBox.addEventListener("mouseup", function (event) {
    isResizing = false;
  });
  textBox.addEventListener("mousemove", function (event) {
    if (isResizing) {
      var width = startWidth + (event.clientX - startX);
      var height = startHeight + (event.clientY - startY);
      textBox.style.width = width + "px";
      textBox.style.height = height + "px";
      resizer.style.right = -width / 2 + "px";
      resizer.style.bottom = -height / 2 + "px";
      // Change cursor to "nwse-resize" when hovering over the resizer element
      if (event.target === resizer || event.target.parentNode === resizer) {
        textBox.style.cursor = "nwse-resize";
      } else {
        textBox.style.cursor = "auto";
      }
    }
  });

  // Stop resizing the text box when the mouse leaves it
  textBox.addEventListener("mouseleave", function (event) {
    isResizing = false;
  });

  // Add the text box element to the canvas element
  canvas.parentNode.appendChild(textBox);
  return textBox;
}

var formatButton = document.getElementById("format_button");
var textBox = null; // initialize textBox variable to null

formatButton.addEventListener("click", function () {
  if (textBox) {
    // if textBox exists, remove it
    var img = document.getElementById("image-canvas");
    // Get the size of the textBox element
    var textBoxValue = textBox.value;
    var textFontSize = document.getElementById("text-size").value;
    var textFontWight = document.getElementById("font-type-selector").value;
    var textFontStyle = document.getElementById("font-selector").value;
    var textFontSpace = document.getElementById("text-wrap").value;
    var textFontRotation = document.getElementById("text-rotation").value;
    var textColor = document.getElementById("colorpicker").value;
    var textBoxWidth = textBox.offsetWidth;
    var textBoxHeight = textBox.offsetHeight;
    var textBoxX = textBox.offsetLeft - img.offsetLeft;
    var textBoxY = textBox.offsetTop - img.offsetTop;
    // Get the natural width and height of the image
    var naturalWidth = img.naturalWidth;
    var naturalHeight = img.naturalHeight;
    // Map the position and size of the textBox to the natural width and height of the image
    var mappedX = (textBoxX * naturalWidth) / img.offsetWidth;
    var mappedY = (textBoxY * naturalHeight) / img.offsetHeight;
    var mappedWidth = (textBoxWidth * naturalWidth) / img.offsetWidth;
    var mappedHeight = (textBoxHeight * naturalHeight) / img.offsetHeight;
    var imageSrc = document.getElementById("image-canvas").src;
    document.getElementById("imageurl").innerHTML = imageSrc;
    var img1 = document.getElementById("image-canvas1");
    var img2 = document.getElementById("image-canvas2");
    var img3 = document.getElementById("image-canvas3");
    var img4 = document.getElementById("image-canvas4");
    var img5 = document.getElementById("image-canvas5");
    var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
    var imageExt = imageName.split(".").pop();
    var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
    var newImageName =
      imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "/add_text", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Decode the Base64-encoded image data
        var imgData = xhr.response["image"];
        var byteCharacters = atob(imgData);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        // Create a blob with the byte array and create an object URL
        var blob = new Blob([byteArray], { type: "image/png" });
        var blobURL = URL.createObjectURL(blob);
        // Get the image name from the URL and construct the new URL
        var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
        var newURL = "/static/uploads/" + newImageName;
        // Set the new image source
        img.src = newURL;
        img1.src = newURL;
        img2.src = newURL;
        img3.src = newURL;
        img4.src = newURL; // new canvas
        img5.src = newURL;
        // Revoke the old object URL to free up memory
        URL.revokeObjectURL(blobURL);
        const imgSrc = img.src;
        const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
        // set the value of the hidden input field to the filename
        document.getElementById("image_name").value = imgName;
        document.getElementById("imageurl").innerHTML = imageSrc;
      }
    };
    xhr.send(
      JSON.stringify({
        imageName: imageName,
        newImageName: newImageName,
        mappedX: mappedX,
        mappedY: mappedY,
        mappedWidth: mappedWidth,
        mappedHeight: mappedHeight,
        textBoxValue: textBoxValue,
        textFontSize: textFontSize,
        textFontWight: textFontWight,
        textFontStyle: textFontStyle,
        textFontSpace: textFontSpace,
        textFontRotation: textFontRotation,
        textColor: textColor,
      })
    );
    textBox.parentNode.removeChild(textBox);
    textBox = null; // reset textBox variable to null
  } else {
    // if textBox does not exist, add it
    textBox = addTextBoxToCanvas();
  }
});

function addTextBoxToCanvas() {
  // Get the canvas element
  var canvas = document.getElementById("image-canvas");

  // Create a new text box element
  var textBox = document.createElement("textarea");
  textBox.placeholder = "Type your text here";
  textBox.style.position = "absolute";
  textBox.style.width = "100px";
  textBox.style.height = "50px";
  textBox.style.border = "none";
  textBox.style.backgroundColor = "transparent";
  textBox.style.color = "black";
  textBox.style.cssText += "::placeholder {color: black;}";

  var canvasRect = canvas.getBoundingClientRect();
  var canvasCenterX = canvasRect.left + canvasRect.width / 2;
  var canvasCenterY = canvasRect.top + canvasRect.height / 2;

  var textBoxWidth = parseInt(textBox.style.width);
  var textBoxHeight = parseInt(textBox.style.height);

  textBox.style.left = canvasCenterX - textBoxWidth / 2 + "px";
  textBox.style.top = canvasCenterY - textBoxHeight / 2 + "px";

  // Add event listeners for moving the text box
  var isDragging = false;
  var startX, startY;
  textBox.addEventListener("mousedown", function (event) {
    isDragging = true;
    startX = event.clientX - parseInt(textBox.style.left);
    startY = event.clientY - parseInt(textBox.style.top);
  });
  textBox.addEventListener("mouseup", function (event) {
    isDragging = false;
    textBox.style.cursor = "grab"; // Change cursor back to grab
  });
  textBox.addEventListener("mousemove", function (event) {
    if (isDragging) {
      var xMin = canvasRect.left + 20;
      var xMax = canvasRect.right - textBox.offsetWidth - 20;
      var yMin = canvasRect.top + 20;
      var yMax = canvasRect.bottom - textBox.offsetHeight - 20;

      var x = event.clientX - startX;
      var y = event.clientY - startY;

      x = Math.min(Math.max(x, xMin), xMax);
      y = Math.min(Math.max(y, yMin), yMax);

      textBox.style.left = x + "px";
      textBox.style.top = y + "px";
    }
  });
  // Change cursor to grab when hovering over the text area
  textBox.addEventListener("mouseenter", function (event) {
    textBox.style.cursor = "grab";
  });
  // Stop moving the text box when the mouse leaves it
  textBox.addEventListener("mouseleave", function (event) {
    isDragging = false;
    textBox.style.cursor = "default";
  });

  // Add event listeners for resizing the text box
  var isResizing = false;
  var startWidth, startHeight, startX, startY;
  var resizer = document.createElement("div");
  resizer.style.width = "10px";
  resizer.style.height = "10px";
  resizer.style.position = "absolute";
  resizer.style.bottom = 0;
  resizer.style.right = 0;
  textBox.appendChild(resizer);
  resizer.addEventListener("mousedown", function (event) {
    isResizing = true;
    startWidth = parseInt(textBox.style.width);
    startHeight = parseInt(textBox.style.height);
    startX = event.clientX;
    startY = event.clientY;
  });
  textBox.addEventListener("mouseup", function (event) {
    isResizing = false;
  });
  textBox.addEventListener("mousemove", function (event) {
    if (isResizing) {
      var width = startWidth + (event.clientX - startX);
      var height = startHeight + (event.clientY - startY);
      textBox.style.width = width + "px";
      textBox.style.height = height + "px";
      resizer.style.right = -width / 2 + "px";
      resizer.style.bottom = -height / 2 + "px";
      // Change cursor to "nwse-resize" when hovering over the resizer element
      if (event.target === resizer || event.target.parentNode === resizer) {
        textBox.style.cursor = "nwse-resize";
      } else {
        textBox.style.cursor = "auto";
      }
    }
  });

  // Stop resizing the text box when the mouse leaves it
  textBox.addEventListener("mouseleave", function (event) {
    isResizing = false;
  });

  // Add the text box element to the canvas element
  canvas.parentNode.appendChild(textBox);
  return textBox;
}

const selectorFont = document.getElementById("font-selector");

selectorFont.addEventListener("change", (event) => {
  const selectorFont = event.target.value;
  textBox.style.fontFamily = selectorFont;
});

var fontSelector_changes = document.getElementById("font-selector");

fontSelector_changes.addEventListener("change", function () {
  var selectedOption =
    fontSelector_changes.options[fontSelector_changes.selectedIndex];
  var selectedFontFamily = selectedOption.value;
  fontSelector_changes.style.fontFamily = selectedFontFamily;
});

var fontTypeSelector = document.getElementById("font-type-selector");

fontTypeSelector.addEventListener("change", function () {
  var selectedOption = fontTypeSelector.options[fontTypeSelector.selectedIndex];
  var selectedFontWeight = selectedOption.value;

  if (selectedFontWeight === "Normal") {
    fontTypeSelector.style.fontWeight = "normal";
    fontTypeSelector.style.fontStyle = "normal";
  } else if (selectedFontWeight === "Bold") {
    fontTypeSelector.style.fontWeight = "bold";
    fontTypeSelector.style.fontStyle = "normal";
  } else if (selectedFontWeight === "Italic") {
    fontTypeSelector.style.fontWeight = "normal";
    fontTypeSelector.style.fontStyle = "italic";
  }
});

const fontWeightStyle = document.getElementById("font-type-selector");

// Add an event listener to the font-type-selector element
fontWeightStyle.addEventListener("change", function () {
  // Get the selected font type
  const fontType = fontWeightStyle.value;

  // Set the font style based on the selected font type
  if (fontType === "Bold") {
    textBox.style.fontWeight = "bold";
    textBox.style.fontStyle = "normal";
  } else if (fontType === "Italic") {
    textBox.style.fontStyle = "italic";
    textBox.style.fontWeight = "normal";
  } else {
    textBox.style.fontWeight = "normal";
    textBox.style.fontStyle = "normal";
  }
});

const fontSizeInput = document.getElementById("text-size");
const dpi = window.devicePixelRatio * 96;
const rotationInput = document.getElementById("text-rotation");
const fontColorInput = document.getElementById("colorpicker");
fontColorInput.addEventListener("input", () => {
  const SelectedColor = fontColorInput.value;
  textBox.style.color = SelectedColor;
});

fontSizeInput.addEventListener("input", () => {
  // set the font size of the textbox to the value in px
  textBox.style.fontSize = `${fontSizeInput.value / 2}px`;
});

rotationInput.addEventListener("input", () => {
  // get the rotation angle from the input element
  const rotationAngle = rotationInput.value;

  // set the rotation transform of the textbox
  textBox.style.transform = `rotate(${rotationAngle}deg)`;
});

function updateSize() {
  var image = document.getElementById("image-canvas");
  var widthInput = document.getElementById("imageaspwidth");
  var heightInput = document.getElementById("imageaspheight");

  if (image.complete) {
    widthInput.value = image.naturalWidth;
    heightInput.value = image.naturalHeight;
  } else {
    image.addEventListener("load", function () {
      widthInput.value = image.naturalWidth;
      heightInput.value = image.naturalHeight;
    });
  }
}

const colorButtons = document.querySelectorAll(".ColorBtn");
const colorDivs = document.querySelectorAll(".ColorDiv");
const aspectButton = document.getElementById("aspect_ratio_button");
const BlurButton = document.getElementById("blur_on_button");
const GrainButton = document.getElementById("grain_button");
const EnhanceButton = document.getElementById("auto_awesome_button");
const BWButton = document.getElementById("camera_roll_button");
colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!button.classList.contains("clicked")) {
      // Remove 'clicked' class from all other buttons
      colorButtons.forEach((btn) => {
        if (btn !== button && btn.classList.contains("clicked")) {
          btn.classList.remove("clicked");
        }
      });

      // Toggle 'clicked' class on clicked button
      button.classList.add("clicked");

      // Hide all color divs
      colorDivs.forEach((div) => {
        div.classList.remove("active");
      });

      // Show corresponding color div
      const colorDiv = document.getElementById(
        `${button.id.replace("Btn", "Div")}`
      );
      colorDiv.classList.add("active");
    } else {
      // Toggle 'clicked' class on clicked button
      button.classList.remove("clicked");

      // Hide corresponding color div
      const colorDiv = document.getElementById(
        `${button.id.replace("Btn", "Div")}`
      );
      colorDiv.classList.remove("active");
    }
  });
});

function handleKeyPress(event) {
  const target = event.target;

  // Check if the event originated from an input element
  const isTextInput =
    target.tagName === "INPUT" || target.tagName === "TEXTAREA";

  // If it's a text input, exit the function and allow normal typing
  if (isTextInput) {
    return;
  }
  if (event.key === "t" || event.key === "T") {
    formatButton.click();
  } else if (event.key === "c" || event.key === "C") {
    cropButton.click();
  } else if (event.key === "a" || event.key === "A") {
    aspectButton.click();
  } else if (event.key === "b" || event.key === "B") {
    BlurButton.click();
  } else if (event.key === "g" || event.key === "G") {
    GrainButton.click();
  } else if (event.key === "e" || event.key === "E") {
    EnhanceButton.click();
  } else if (event.key === "w" || event.key === "W") {
    BWButton.click();
  }
}

document.addEventListener("keydown", handleKeyPress);

const imageElement = document.getElementById("image-canvas");
let zoomLevel = 1;
let imagePositionX = 0;
let imagePositionY = 0;
let zoomDisplayTimeout = null;
let zoomTimeout = null;
let isDisplayVisible = false;

// Create the zoom percentage display element
const zoomDisplay = document.createElement("div");
zoomDisplay.style.position = "fixed";
zoomDisplay.style.top = "50%";
zoomDisplay.style.left = "50%";
zoomDisplay.style.transform = "translate(-50%, -50%)";
zoomDisplay.style.padding = "10px";
zoomDisplay.style.background = "rgba(0, 0, 0, 0.5)";
zoomDisplay.style.color = "#fff";
zoomDisplay.style.fontFamily = "Arial, sans-serif";
zoomDisplay.style.fontSize = "16px";
zoomDisplay.style.lineHeight = "1";
zoomDisplay.style.borderRadius = "5px";
zoomDisplay.style.pointerEvents = "none";
zoomDisplay.style.display = "none";
document.body.appendChild(zoomDisplay);

function showZoomPercentage() {
  clearTimeout(zoomDisplayTimeout);
  clearTimeout(zoomTimeout);

  // Check if the zoom display is already visible
  if (isDisplayVisible) {
    return;
  }

  zoomDisplay.style.display = "block";
  zoomDisplay.style.opacity = "1";
  isDisplayVisible = true;

  // Show the zoom percentage display for 2 seconds
  zoomDisplayTimeout = setTimeout(() => {
    zoomDisplay.style.opacity = "0";
    zoomDisplay.style.transition = "opacity 1s";

    zoomTimeout = setTimeout(() => {
      zoomDisplay.style.display = "none";
      isDisplayVisible = false;
    }, 1000);
  }, 2000);
}

function updateZoomDisplay() {
  zoomDisplay.textContent = `Zoom: ${Math.round(zoomLevel * 100)}%`;
}
function hideZoomDisplay() {
  clearTimeout(zoomDisplayTimeout);
  clearTimeout(zoomTimeout);

  if (!isDisplayVisible) {
    return;
  }
  zoomDisplay.style.display = "none";
  isDisplayVisible = false;
}

function handleZoom(event) {
  clearTimeout(zoomTimeout);

  // Check if the mouse is over the image element
  const isPlusKey = event.key === "=" && event.code === "Equal";
  const isMinusKey = event.key === "-" && event.code === "Minus";

  if (isPlusKey || isMinusKey) {
    event.preventDefault(); // Prevent default zoom behavior
    // Zoom in
    if (event.deltaY < 0 || isPlusKey) {
      zoomLevel += 0.1;
    }
    // Zoom out
    else if (event.deltaY > 0 || isMinusKey) {
      zoomLevel -= 0.1;
      if (zoomLevel < 0.1) {
        zoomLevel = 0.1;
      }
    }

    imageElement.style.transform = `scale(${zoomLevel})`;
    updateZoomDisplay();
    showZoomPercentage();
  }

  // Check if the image is zoomed in
  if (zoomLevel > 1) {
    const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

    // Move the image using arrow keys
    if (arrowKeys.includes(event.key)) {
      const moveStep = 10; // Adjust the move step as needed

      if (event.key === "ArrowUp") {
        imagePositionY += moveStep;
      } else if (event.key === "ArrowLeft") {
        imagePositionX += moveStep;
      } else if (event.key === "ArrowDown") {
        imagePositionY -= moveStep;
        event.preventDefault(); // Prevent default behavior for ArrowDown
      } else if (event.key === "ArrowRight") {
        imagePositionX -= moveStep;
      }

      imageElement.style.transform = `scale(${zoomLevel}) translate(${imagePositionX}px, ${imagePositionY}px)`;
    }

    // Reset the timeout to hide the zoom display after 2 seconds
    clearTimeout(zoomTimeout);
    zoomTimeout = setTimeout(hideZoomDisplay, 2000);
  } else {
    hideZoomDisplay();
  }
}

document.addEventListener("wheel", handleZoom);
document.addEventListener("keydown", handleZoom);

function shareImageOnTwitter() {
  var imageSrc = document.getElementById("image-canvas").src;
  const imageUrl = imageSrc; // replace with the URL of the image you want to share
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(imageUrl)}`
  );
}
function shareImageOnFacebook() {
  var imageSrc = document.getElementById("image-canvas").src;
  const imageUrl = imageSrc;
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      imageUrl
    )}`
  );
}
function shareImageOnInstagram() {
  var imageSrc = document.getElementById("image-canvas").src;
  const imageUrl = imageSrc;
  window.open(
    `https://www.instagram.com/create/story/image/?url=${encodeURIComponent(
      imageUrl
    )}`
  );
}
function shareImageOnLinkedIn() {
  var imageSrc = document.getElementById("image-canvas").src;
  const imageUrl = imageSrc;
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      imageUrl
    )}`
  );
}
function shareImageOnPinterest() {
  var imageSrc = document.getElementById("image-canvas").src;
  const imageUrl = imageSrc;
  window.open(
    `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
      imageUrl
    )}`
  );
}
function shareImageOnVK() {
  var imageSrc = document.getElementById("image-canvas").src;
  const imageUrl = imageSrc;
  window.open(`https://vk.com/share.php?url=${encodeURIComponent(imageUrl)}`);
}

const img = document.getElementById("image-canvas");
// Check first if there is an image and it has an src then do the function if not just skip it
if (!img || !img.src) {
  console.log("Image source not found");
} else {
  const imageSrc = img.src;
  document.getElementById("imageurl").innerHTML = imageSrc;

  const canvas = document.getElementById("histogram-canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  img.onload = function () {
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
      ctx.fillStyle = "#000";
      ctx.fillRect(x, y, width, height);
    }
  };

  img.src = imageSrc;
}

function getRedHueColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var RedColorHueValue = document.getElementById("RedHue").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_RedHueColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      RedColorHueValue: RedColorHueValue,
    })
  );
}

function getOrangeHueColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var OrangeColorHueValue = document.getElementById("OrangeHue").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_OrangeHueColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      OrangeColorHueValue: OrangeColorHueValue,
    })
  );
}

function getYellowHueColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var YellowColorHueValue = document.getElementById("YellowHue").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_YellowHueColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      YellowColorHueValue: YellowColorHueValue,
    })
  );
}

function getGreenHueColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var GreenColorHueValue = document.getElementById("GreenHue").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_GreenHueColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      GreenColorHueValue: GreenColorHueValue,
    })
  );
}

function getMagentaHueColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var MagentaColorHueValue = document.getElementById("MagentaHue").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_MagentaHueColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      MagentaColorHueValue: MagentaColorHueValue,
    })
  );
}

function getBlueHueColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var BlueColorHueValue = document.getElementById("BlueHue").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_BlueHueColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      BlueColorHueValue: BlueColorHueValue,
    })
  );
}

function getPurpulHueColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var PurpulColorHueValue = document.getElementById("PurpulHue").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_PurpulHueColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      PurpulColorHueValue: PurpulColorHueValue,
    })
  );
}

function getPinkHueColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var PinkColorHueValue = document.getElementById("PinkHue").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_PinkHueColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      PinkColorHueValue: PinkColorHueValue,
    })
  );
}

function getPinkSatColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var PinkColorSatValue = document.getElementById("PinkSat").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_PinkSatColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      PinkColorSatValue: PinkColorSatValue,
    })
  );
}

function getPurpulSatColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var PurpulColorSatValue = document.getElementById("PurpulSat").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_PurpulSatColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      PurpulColorSatValue: PurpulColorSatValue,
    })
  );
}

function getBlueSatColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var BlueColorSatValue = document.getElementById("BlueSat").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_BlueSatColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      BlueColorSatValue: BlueColorSatValue,
    })
  );
}

function getMagentaSatColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var MagentaColorSatValue = document.getElementById("MagentaSat").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_MagentaSatColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      MagentaColorSatValue: MagentaColorSatValue,
    })
  );
}

function getGreenSatColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var GreenColorSatValue = document.getElementById("GreenSat").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_GreenSatColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      GreenColorSatValue: GreenColorSatValue,
    })
  );
}

function getYellowSatColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var YellowColorSatValue = document.getElementById("YellowSat").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_YellowSatColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      YellowColorSatValue: YellowColorSatValue,
    })
  );
}

function getOrangeSatColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var OrangeColorSatValue = document.getElementById("OrangeSat").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_OrangeSatColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      OrangeColorSatValue: OrangeColorSatValue,
    })
  );
}

function getRedSatColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var RedColorSatValue = document.getElementById("RedSat").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_RedSatColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      RedColorSatValue: RedColorSatValue,
    })
  );
}

function getPinkLumColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var PinkColorLumValue = document.getElementById("PinkLum").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_PinkLumColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      PinkColorLumValue: PinkColorLumValue,
    })
  );
}

function getPurpulLumColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var PurpulColorLumValue = document.getElementById("PurpulLum").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_PurpulLumColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      PurpulColorLumValue: PurpulColorLumValue,
    })
  );
}

function getBlueLumColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var BlueColorLumValue = document.getElementById("BlueLum").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_BlueLumColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      BlueColorLumValue: BlueColorLumValue,
    })
  );
}

function getMagentaLumColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var MagentaColorLumValue = document.getElementById("MagentaLum").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_MagentaLumColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      MagentaColorLumValue: MagentaColorLumValue,
    })
  );
}

function getGreenLumColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var GreenColorLumValue = document.getElementById("GreenLum").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_GreenLumColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      GreenColorLumValue: GreenColorLumValue,
    })
  );
}

function getYellowLumColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var YellowColorLumValue = document.getElementById("YellowLum").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_YellowLumColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      YellowColorLumValue: YellowColorLumValue,
    })
  );
}

function getOrangeLumColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var OrangeColorLumValue = document.getElementById("OrangeLum").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_OrangeLumColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      OrangeColorLumValue: OrangeColorLumValue,
    })
  );
}

function getRedLumColor() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var RedColorLumValue = document.getElementById("RedLum").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_RedLumColor", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      RedColorLumValue: RedColorLumValue,
    })
  );
}

function getContrast() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var contrastValue = document.getElementById("CONT").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_contrast", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL;
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      contrastValue: contrastValue,
    })
  );
}

function getHighlight() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var highlightValue = document.getElementById("HIGH").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_highlight", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      highlightValue: highlightValue,
    })
  );
}

function getShadow() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var shadowValue = document.getElementById("SHAD").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_shadow", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      shadowValue: shadowValue,
    })
  );
}

function getWhite() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var whiteValue = document.getElementById("WHITE").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_white", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      whiteValue: whiteValue,
    })
  );
}

function getBlack() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var blackValue = document.getElementById("BLACK").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_black", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      blackValue: blackValue,
    })
  );
}

function getExposure() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var exposureValue = document.getElementById("EXPO").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_exposure", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      exposureValue: exposureValue,
    })
  );
}

function getColorize() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/colorize", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
      camera_roll_button.classList.remove("clicked", "spinner");
      overlay_colorizing.remove();
      document.body.style.overflow = "auto";
    } else {
      console.error("Error:", xhr.status);
      // Print error message on screen
      alert("There was an error processing the request. Please try again.");
      camera_roll_button.classList.remove("clicked", "spinner");
      overlay_colorizing.remove();
      document.body.style.overflow = "auto";
    }
  };

  xhr.onerror = function () {
    console.error("Request failed");
    // Print error message on screen
    alert("There was an error processing the request. Please try again.");
  };

  xhr.send(
    JSON.stringify({ imageName: imageName, newImageName: newImageName })
  );
}
function getEnhance() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/enhance", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
      auto_awesome_button.classList.remove("clicked", "spinner");
      overlay_colorizing.remove();
      document.body.style.overflow = "auto";
    } else {
      console.error("Error:", xhr.status);
      // Print error message on screen
      alert("There was an error processing the request. Please try again.");
      auto_awesome_button.classList.remove("clicked", "spinner");
      overlay_colorizing.remove();
      document.body.style.overflow = "auto";
    }
  };
  xhr.onerror = function () {
    console.error("Request failed");
    // Print error message on screen
    alert("There was an error processing the request. Please try again.");
  };
  xhr.send(
    JSON.stringify({ imageName: imageName, newImageName: newImageName })
  );
}
function getBackgroundRemoved() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/BackgroundRemoved", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
      auto_fix_high_button.classList.remove("clicked", "spinner");
      overlay_colorizing.remove();
      document.body.style.overflow = "auto";
    } else {
      console.error("Error:", xhr.status);
      // Print error message on screen
      alert("There was an error processing the request. Please try again.");
      auto_fix_high_button.classList.remove("clicked", "spinner");
      overlay_colorizing.remove();
      document.body.style.overflow = "auto";
    }
  };
  xhr.onerror = function () {
    console.error("Request failed");
    // Print error message on screen
    alert("There was an error processing the request. Please try again.");
  };
  xhr.send(
    JSON.stringify({ imageName: imageName, newImageName: newImageName })
  );
}
function getTemp() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var tempValue = document.getElementById("TEMP").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_temp", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      tempValue: tempValue,
    })
  );
}

function getTint() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var tintValue = document.getElementById("TINT").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_tint", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      tintValue: tintValue,
    })
  );
}

function getText() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var textValue = document.getElementById("TEXT").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_text", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      textValue: textValue,
    })
  );
}

function getClar() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var clarValue = document.getElementById("CLAR").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_clar", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      clarValue: clarValue,
    })
  );
}

function getDeh() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var dehValue = document.getElementById("DEH").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_deh", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      dehValue: dehValue,
    })
  );
}

function getSat() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var satValue = document.getElementById("SAT").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_sat", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imageSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      satValue: satValue,
    })
  );
}

function getVir() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var virValue = document.getElementById("VIR").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_vir", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      virValue: virValue,
    })
  );
}

function getBlur() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var blurValue = document.getElementById("blurslider").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_blur", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL;
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      blurValue: blurValue,
    })
  );
}

function getGrain() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var grainValue = document.getElementById("grainslider").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_grain", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    }
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      grainValue: grainValue,
    })
  );
}

// Send JOSN to get the aspict ratio
function getAsp() {
  var imageSrc = document.getElementById("image-canvas").src;
  document.getElementById("imageurl").innerHTML = imageSrc;
  var img = document.getElementById("image-canvas");
  var img1 = document.getElementById("image-canvas1");
  var img2 = document.getElementById("image-canvas2");
  var img3 = document.getElementById("image-canvas3");
  var img4 = document.getElementById("image-canvas4");
  var img5 = document.getElementById("image-canvas5");
  var widthAspValue = document.getElementById("imageaspwidth").value;
  var heightAspValue = document.getElementById("imageaspheight").value;
  var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
  var imageExt = imageName.split(".").pop();
  var timestamp = new Date().getTime().toString().slice(-4); // Get the current timestamp
  var newImageName = imageName.split(".")[0] + "-" + timestamp + "." + imageExt; // Add timestamp to the image name
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", "/adjust_asp", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Decode the Base64-encoded image data
      var imgData = xhr.response["image"];
      var byteCharacters = atob(imgData);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      // Create a blob with the byte array and create an object URL
      var blob = new Blob([byteArray], { type: "image/png" });
      var blobURL = URL.createObjectURL(blob);
      // Get the image name from the URL and construct the new URL
      var imageName = img.src.substring(img.src.lastIndexOf("/") + 1);
      var newURL = "/static/uploads/" + newImageName;
      // Set the new image source
      img.src = newURL;
      img1.src = newURL; // new canvas
      img2.src = newURL;
      img3.src = newURL;
      img4.src = newURL; // new canvas
      img5.src = newURL;
      // Revoke the old object URL to free up memory
      URL.revokeObjectURL(blobURL);
      const imgSrc = img.src;
      const imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1);
      // set the value of the hidden input field to the filename
      document.getElementById("image_name").value = imgName;
      document.getElementById("imageurl").innerHTML = imgSrc;
    } else {
      console.error("Error:", xhr.status);
      // Print error message on screen
      alert("There was an error processing the request. Please try again.");
    }
  };
  xhr.onerror = function () {
    console.error("Request failed");
    // Print error message on screen
    alert("There was an error processing the request. Please try again.");
  };
  xhr.send(
    JSON.stringify({
      imageName: imageName,
      newImageName: newImageName,
      widthAspValue: widthAspValue,
      heightAspValue: heightAspValue,
    })
  );
}

// Display the image that will be opened inside the open overlay
const fileInput = document.getElementById("fileopen");
const selectedImageName = document.querySelector(".wrapopenname p");
const openscreenup = document.querySelector(".openscreenup");
fileInput.addEventListener("change", function () {
  const selectedFile = fileInput.files[0];
  const selectedFileName = selectedFile ? selectedFile.name : "Select Image";
  const label = document.querySelector("#fileopenlable");
  label.textContent = selectedFileName;

  if (selectedFile) {
    // Create a new FileReader instance
    const reader = new FileReader();

    // Set up a callback function to run when the file is loaded
    reader.onload = function () {
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

// Disable the quality for the .png format
const imageFormatSelector = document.querySelector("#image_format_selector");
const imageQualitySelector = document.querySelector("#image_quality_selector");

imageFormatSelector.addEventListener("change", function () {
  if (this.value === ".png") {
    imageQualitySelector.disabled = true;
  } else {
    imageQualitySelector.disabled = false;
  }
});

const blurBtn = document.getElementById("blur_on_button");
const overlayblur = document.getElementById("overlayblur");
const saveBtnBlur = document.getElementById("savebtnforblur");

blurBtn.addEventListener("click", () => {
  overlayblur.classList.add("active"); // add the 'active' class to show the overlay
});
saveBtnBlur.addEventListener("click", () => {
  overlayblur.classList.remove("active"); // remove the 'active' class to hide the overlay
});

const aspBtn = document.getElementById("aspect_ratio_button");
const overlayAsp = document.getElementById("overlayasp");
const saveBtnAsp = document.getElementById("savebtnforasp");

aspBtn.addEventListener("click", () => {
  overlayAsp.classList.add("active");
  updateSize(); // add the 'active' class to show the overlay
});
saveBtnAsp.addEventListener("click", () => {
  overlayAsp.classList.remove("active"); // remove the 'active' class to hide the overlay
});

const downloadBtn = document.getElementById("download");
const overlay = document.getElementById("overlay");

downloadBtn.addEventListener("click", () => {
  overlay.classList.add("active"); // add the 'active' class to show the overlay
});
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    overlay.classList.remove("active"); // remove the 'active' class to hide the overlay
  }
});

const openBtn = document.getElementById("open");
const overlay1 = document.getElementById("overlay1");

openBtn.addEventListener("click", () => {
  overlay1.classList.add("active"); // add the 'active' class to show the overlay
});
overlay1.addEventListener("click", (event) => {
  if (event.target === overlay1) {
    overlay1.classList.remove("active"); // remove the 'active' class to hide the overlay
  }
});

const infoBtn = document.getElementById("info");
const overlay2 = document.getElementById("overlay2");
const closeinfoBtn = document.getElementById("savebtnforinfo");

infoBtn.addEventListener("click", () => {
  overlay2.classList.add("active"); // add the 'active' class to show the overlay
});
overlay2.addEventListener("click", (event) => {
  if (event.target === overlay2) {
    overlay2.classList.remove("active"); // remove the 'active' class to hide the overlay
  }
});

const premBtn = document.getElementById("premium");
const overlay3 = document.getElementById("overlay3");
const closepremBtn = document.getElementById("savebtnforpremium");

premBtn.addEventListener("click", () => {
  overlay3.classList.add("active"); // add the 'active' class to show the overlay
});
overlay3.addEventListener("click", (event) => {
  if (event.target === overlay3) {
    overlay3.classList.remove("active"); // remove the 'active' class to hide the overlay
  }
});

const shareBtn = document.getElementById("send");
const overlay4 = document.getElementById("overlay4");
const closeshareBtn = document.getElementById("savebtnforshare");

shareBtn.addEventListener("click", () => {
  overlay4.classList.add("active"); // add the 'active' class to show the overlay
});
overlay4.addEventListener("click", (event) => {
  if (event.target === overlay4) {
    overlay4.classList.remove("active"); // remove the 'active' class to hide the overlay
  }
});
closeshareBtn.addEventListener("click", () => {
  overlay4.classList.remove("active"); // remove the 'active' class to hide the overlay
});

// make event to chnage the color of button on the left side "grain" and to close the overlay
const grainBtn = document.getElementById("grain_button");
const overlaygrain = document.getElementById("overlaygrain");
const closegrainBtn = document.getElementById("savebtnforgrain");

grainBtn.addEventListener("click", () => {
  overlaygrain.classList.add("active"); // add the 'active' class to show the overlay
});
closegrainBtn.addEventListener("click", () => {
  overlaygrain.classList.remove("active"); // remove the 'active' class to hide the overlay
});

var overlay_colorizing = document.createElement("div");
overlay_colorizing.classList.add("overlay_colorizing");

// Apply centering styles to the overlay_colorizing div
overlay_colorizing.style.position = "fixed";

// Add click event listeners to camera_roll_button and auto_awesome_button
var camera_roll_button = document.getElementById("camera_roll_button");
camera_roll_button.addEventListener("click", function () {
  camera_roll_button.classList.add("clicked", "spinner");
  document.body.appendChild(overlay_colorizing);
  document.body.style.overflow = "hidden";
});

var auto_awesome_button = document.getElementById("auto_awesome_button");
auto_awesome_button.addEventListener("click", function () {
  auto_awesome_button.classList.add("clicked", "spinner");
  document.body.appendChild(overlay_colorizing);
  document.body.style.overflow = "hidden";
});
var auto_fix_high_button = document.getElementById("auto_fix_high_button");
auto_fix_high_button.addEventListener("click", function () {
  auto_fix_high_button.classList.add("clicked", "spinner");
  document.body.appendChild(overlay_colorizing);
  document.body.style.overflow = "hidden";
});

// Function to update the text every 2 seconds
function updateText() {
  var textArray = [
    "PLEASE WAIT THIS PROCESS MIGHT TAKE A FEW MOMENTS...",
    "GETTING THE IMAGE ANALYZED...",
    "BREAKING THE IMAGE DOWN...",
    "RECONSTRUCTING THE IMAGE...",
    "PLEASE BE PATIENT...",
  ]; // Array of different texts
  var randomIndex = Math.floor(Math.random() * textArray.length); // Get a random index
  var newText = textArray[randomIndex]; // Get the text at the random index
  overlay_colorizing.textContent = newText; // Set the new text as the content of the div
  // Apply centering styles to the text content
  overlay_colorizing.style.display = "flex";
  overlay_colorizing.style.alignItems = "center";
  overlay_colorizing.style.justifyContent = "center";
  overlay_colorizing.style.textAlign = "center";
  overlay_colorizing.style.fontWeight = "bold";
  overlay_colorizing.style.fontSize = "30px";
  overlay_colorizing.style.color = "rgb(255, 255, 255)";
  overlay_colorizing.style.textShadow = "0.5px 0.5px 2px rgba(0, 0, 0, 0.2)";
  overlay_colorizing.style.filter = "blur(1px)";
}

// Call the updateText function every 5.5 seconds
setInterval(updateText, 5500);

// change the state of buttons on the left side of page to clicked and unclicked
var buttons = document.getElementsByClassName("btn");

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
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

// removing the button color if it was clicked from the left side of the page, since the have the overlays and okay button
saveBtnBlur.addEventListener("click", function () {
  for (var j = 0; j < buttons.length; j++) {
    buttons[j].classList.remove("clicked");
  }
});
closegrainBtn.addEventListener("click", function () {
  for (var j = 0; j < buttons.length; j++) {
    buttons[j].classList.remove("clicked");
  }
});
saveBtnAsp.addEventListener("click", function () {
  for (var j = 0; j < buttons.length; j++) {
    buttons[j].classList.remove("clicked");
  }
});
overlayAsp.addEventListener("click", (event) => {
  if (event.target === overlayAsp) {
    overlayAsp.classList.remove("active"); // remove the 'active' class to hide the overlay
  }
  // Remove the "clicked" class from all buttons
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("clicked");
  }
});
overlayblur.addEventListener("click", (event) => {
  if (event.target === overlayblur) {
    overlayblur.classList.remove("active"); // remove the 'active' class to hide the overlay
  }
  // Remove the "clicked" class from all buttons
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("clicked");
  }
});
overlaygrain.addEventListener("click", (event) => {
  if (event.target === overlaygrain) {
    overlaygrain.classList.remove("active"); // remove the 'active' class to hide the overlay
  }
  // Remove the "clicked" class from all buttons
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("clicked");
  }
});

const loginBtn = document.getElementById("wrap_loging");
const overlayLogin = document.getElementById("overlay_login");

let isActive = false;

loginBtn.addEventListener("click", () => {
  if (isActive) {
    overlayLogin.classList.remove("active"); // remove the 'active' class to hide the overlay
    isActive = false;
  } else {
    overlayLogin.classList.add("active"); // add the 'active' class to show the overlay
    isActive = true;
  }
});

document.addEventListener("click", (event) => {
  if (
    !loginBtn.contains(event.target) &&
    event.target !== overlayLogin &&
    !overlayLogin.contains(event.target)
  ) {
    overlayLogin.classList.remove("active"); // remove the 'active' class to hide the overlay
    isActive = false;
  }
});

// displaying the style of the font selector in the font box
/*
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
*/
const fontSelector = document.querySelector("#font-selector");

fontSelector.addEventListener("change", () => {
  const selectedOption = fontSelector.options[fontSelector.selectedIndex];

  if (selectedOption.value === "Impact") {
    document.execCommand("impact", true, "Impact");
  }
});

// Check the initial font and set the selected value accordingly
const selectedOption = fontSelector.options[fontSelector.selectedIndex];

const tempSlider = document.querySelector("#TEMP");
const tempRangeValue = document.querySelector("#rangeValueTEMP");

tempSlider.addEventListener("input", () => {
  tempRangeValue.innerText = tempSlider.value;
});

tempSlider.addEventListener("dblclick", () => {
  tempSlider.value = 26000;
  tempRangeValue.innerText = 26000;
});

const tintSlider = document.querySelector("#TINT");
const tintRangeValue = document.querySelector("#rangeValueTINT");

tintSlider.addEventListener("input", () => {
  tintRangeValue.innerText = tintSlider.value;
});

tintSlider.addEventListener("dblclick", () => {
  tintSlider.value = 0;
  tintRangeValue.innerText = 0;
});

const expoSlider = document.querySelector("#EXPO");
const expoRangeValue = document.querySelector("#rangeValueEXPO");

expoSlider.addEventListener("input", () => {
  expoRangeValue.innerText = expoSlider.value;
});

expoSlider.addEventListener("dblclick", () => {
  expoSlider.value = 0;
  expoRangeValue.innerText = 0;
});

const contSlider = document.querySelector("#CONT");
const contRangeValue = document.querySelector("#rangeValueCONT");

contSlider.addEventListener("input", () => {
  contRangeValue.innerText = contSlider.value;
});

contSlider.addEventListener("dblclick", () => {
  contSlider.value = 0;
  contRangeValue.innerText = 0;
});

const highSlider = document.querySelector("#HIGH");
const highRangeValue = document.querySelector("#rangeValueHIGH");

highSlider.addEventListener("input", () => {
  highRangeValue.innerText = highSlider.value;
});

highSlider.addEventListener("dblclick", () => {
  highSlider.value = 0;
  highRangeValue.innerText = 0;
});

const shadSlider = document.querySelector("#SHAD");
const shadRangeValue = document.querySelector("#rangeValueSHAD");

shadSlider.addEventListener("input", () => {
  shadRangeValue.innerText = shadSlider.value;
});

shadSlider.addEventListener("dblclick", () => {
  shadSlider.value = 0;
  shadRangeValue.innerText = 0;
});

const whiteSlider = document.querySelector("#WHITE");
const whiteRangeValue = document.querySelector("#rangeValueWHITE");

whiteSlider.addEventListener("input", () => {
  whiteRangeValue.innerText = whiteSlider.value;
});

whiteSlider.addEventListener("dblclick", () => {
  whiteSlider.value = 0;
  whiteRangeValue.innerText = 0;
});

const blackSlider = document.querySelector("#BLACK");
const blackRangeValue = document.querySelector("#rangeValueBLACK");

blackSlider.addEventListener("input", () => {
  blackRangeValue.innerText = blackSlider.value;
});

blackSlider.addEventListener("dblclick", () => {
  blackSlider.value = 0;
  blackRangeValue.innerText = 0;
});

const textSlider = document.querySelector("#TEXT");
const textRangeValue = document.querySelector("#rangeValueTEXT");

textSlider.addEventListener("input", () => {
  textRangeValue.innerText = textSlider.value;
});

textSlider.addEventListener("dblclick", () => {
  textSlider.value = 0;
  textRangeValue.innerText = 0;
});

const clarSlider = document.querySelector("#CLAR");
const clarRangeValue = document.querySelector("#rangeValueCLAR");

clarSlider.addEventListener("input", () => {
  clarRangeValue.innerText = clarSlider.value;
});

clarSlider.addEventListener("dblclick", () => {
  clarSlider.value = 0;
  clarRangeValue.innerText = 0;
});

const dehSlider = document.querySelector("#DEH");
const dehRangeValue = document.querySelector("#rangeValueDEH");

dehSlider.addEventListener("input", () => {
  dehRangeValue.innerText = dehSlider.value;
});

dehSlider.addEventListener("dblclick", () => {
  dehSlider.value = 0;
  dehRangeValue.innerText = 0;
});

const virSlider = document.querySelector("#VIR");
const virRangeValue = document.querySelector("#rangeValueVIR");

virSlider.addEventListener("input", () => {
  virRangeValue.innerText = virSlider.value;
});

virSlider.addEventListener("dblclick", () => {
  virSlider.value = 0;
  virRangeValue.innerText = 0;
});

const satSlider = document.querySelector("#SAT");
const satRangeValue = document.querySelector("#rangeValueSAT");

satSlider.addEventListener("input", () => {
  satRangeValue.innerText = satSlider.value;
});

satSlider.addEventListener("dblclick", () => {
  satSlider.value = 0;
  satRangeValue.innerText = 0;
});

const RedHueSlider = document.querySelector("#RedHue");
const rangeValueRedHue = document.querySelector("#rangeValueRedHue");

RedHueSlider.addEventListener("input", () => {
  rangeValueRedHue.innerText = RedHueSlider.value;
});

RedHueSlider.addEventListener("dblclick", () => {
  RedHueSlider.value = 0;
  rangeValueRedHue.innerText = 0;
});

const RedSatSlider = document.querySelector("#RedSat");
const rangeValueRedSat = document.querySelector("#rangeValueRedSat");

RedSatSlider.addEventListener("input", () => {
  rangeValueRedSat.innerText = RedSatSlider.value;
});

RedSatSlider.addEventListener("dblclick", () => {
  RedSatSlider.value = 0;
  rangeValueRedSat.innerText = 0;
});

const RedLumSlider = document.querySelector("#RedLum");
const rangeValueRedLum = document.querySelector("#rangeValueRedLum");

RedLumSlider.addEventListener("input", () => {
  rangeValueRedLum.innerText = RedLumSlider.value;
});

RedLumSlider.addEventListener("dblclick", () => {
  RedLumSlider.value = 0;
  rangeValueRedLum.innerText = 0;
});

const OrangeHueSlider = document.querySelector("#OrangeHue");
const rangeValueOrangeHue = document.querySelector("#rangeValueOrangeHue");

OrangeHueSlider.addEventListener("input", () => {
  rangeValueOrangeHue.innerText = OrangeHueSlider.value;
});

OrangeHueSlider.addEventListener("dblclick", () => {
  OrangeHueSlider.value = 0;
  rangeValueOrangeHue.innerText = 0;
});

const OrangeSatSlider = document.querySelector("#OrangeSat");
const rangeValueOrangeSat = document.querySelector("#rangeValueOrangeSat");

OrangeSatSlider.addEventListener("input", () => {
  rangeValueOrangeSat.innerText = OrangeSatSlider.value;
});

OrangeSatSlider.addEventListener("dblclick", () => {
  OrangeSatSlider.value = 0;
  rangeValueOrangeSat.innerText = 0;
});

const OrangeLumlider = document.querySelector("#OrangeLum");
const rangeValueOrangeLum = document.querySelector("#rangeValueOrangeLum");

OrangeLumlider.addEventListener("input", () => {
  rangeValueOrangeLum.innerText = OrangeLumlider.value;
});

OrangeLumlider.addEventListener("dblclick", () => {
  OrangeLumlider.value = 0;
  rangeValueOrangeLum.innerText = 0;
});

const YellowHueSlider = document.querySelector("#YellowHue");
const rangeValueYellowHue = document.querySelector("#rangeValueYellowHue");

YellowHueSlider.addEventListener("input", () => {
  rangeValueYellowHue.innerText = YellowHueSlider.value;
});

YellowHueSlider.addEventListener("dblclick", () => {
  YellowHueSlider.value = 0;
  rangeValueYellowHue.innerText = 0;
});

const YellowSatSlider = document.querySelector("#YellowSat");
const rangeValueYellowSat = document.querySelector("#rangeValueYellowSat");

YellowSatSlider.addEventListener("input", () => {
  rangeValueYellowSat.innerText = YellowSatSlider.value;
});

YellowSatSlider.addEventListener("dblclick", () => {
  YellowSatSlider.value = 0;
  rangeValueYellowSat.innerText = 0;
});

const YellowLumlider = document.querySelector("#YellowLum");
const rangeValueYellowLum = document.querySelector("#rangeValueYellowLum");

YellowLumlider.addEventListener("input", () => {
  rangeValueYellowLum.innerText = YellowLumlider.value;
});

YellowLumlider.addEventListener("dblclick", () => {
  YellowLumlider.value = 0;
  rangeValueYellowLum.innerText = 0;
});

const GreenHueSlider = document.querySelector("#GreenHue");
const rangeValueGreenHue = document.querySelector("#rangeValueGreenHue");

GreenHueSlider.addEventListener("input", () => {
  rangeValueGreenHue.innerText = GreenHueSlider.value;
});

GreenHueSlider.addEventListener("dblclick", () => {
  GreenHueSlider.value = 0;
  rangeValueGreenHue.innerText = 0;
});

const GreenSatSlider = document.querySelector("#GreenSat");
const rangeValueGreenSat = document.querySelector("#rangeValueGreenSat");

GreenSatSlider.addEventListener("input", () => {
  rangeValueGreenSat.innerText = GreenSatSlider.value;
});

GreenSatSlider.addEventListener("dblclick", () => {
  GreenSatSlider.value = 0;
  rangeValueGreenSat.innerText = 0;
});

const GreenLumlider = document.querySelector("#GreenLum");
const rangeValueGreenLum = document.querySelector("#rangeValueGreenLum");

GreenLumlider.addEventListener("input", () => {
  rangeValueGreenLum.innerText = GreenLumlider.value;
});

GreenLumlider.addEventListener("dblclick", () => {
  GreenLumlider.value = 0;
  rangeValueGreenLum.innerText = 0;
});

const MagentaHueSlider = document.querySelector("#MagentaHue");
const rangeValueMagentaHue = document.querySelector("#rangeValueMagentaHue");

MagentaHueSlider.addEventListener("input", () => {
  rangeValueMagentaHue.innerText = MagentaHueSlider.value;
});

MagentaHueSlider.addEventListener("dblclick", () => {
  MagentaHueSlider.value = 0;
  rangeValueMagentaHue.innerText = 0;
});

const MagentaSatSlider = document.querySelector("#MagentaSat");
const rangeValueMagentaSat = document.querySelector("#rangeValueMagentaSat");

MagentaSatSlider.addEventListener("input", () => {
  rangeValueMagentaSat.innerText = MagentaSatSlider.value;
});

MagentaSatSlider.addEventListener("dblclick", () => {
  MagentaSatSlider.value = 0;
  rangeValueMagentaSat.innerText = 0;
});

const MagentaLumlider = document.querySelector("#MagentaLum");
const rangeValueMagentaLum = document.querySelector("#rangeValueMagentaLum");

MagentaLumlider.addEventListener("input", () => {
  rangeValueMagentaLum.innerText = MagentaLumlider.value;
});

MagentaLumlider.addEventListener("dblclick", () => {
  MagentaLumlider.value = 0;
  rangeValueMagentaLum.innerText = 0;
});

const BlueHueSlider = document.querySelector("#BlueHue");
const rangeValueBlueHue = document.querySelector("#rangeValueBlueHue");

BlueHueSlider.addEventListener("input", () => {
  rangeValueBlueHue.innerText = BlueHueSlider.value;
});

BlueHueSlider.addEventListener("dblclick", () => {
  BlueHueSlider.value = 0;
  rangeValueBlueHue.innerText = 0;
});

const BlueSatSlider = document.querySelector("#BlueSat");
const rangeValueBlueSat = document.querySelector("#rangeValueBlueSat");

BlueSatSlider.addEventListener("input", () => {
  rangeValueBlueSat.innerText = BlueSatSlider.value;
});

BlueSatSlider.addEventListener("dblclick", () => {
  BlueSatSlider.value = 0;
  rangeValueBlueSat.innerText = 0;
});

const BlueLumlider = document.querySelector("#BlueLum");
const rangeValueBlueLum = document.querySelector("#rangeValueBlueLum");

BlueLumlider.addEventListener("input", () => {
  rangeValueBlueLum.innerText = BlueLumlider.value;
});

BlueLumlider.addEventListener("dblclick", () => {
  BlueLumlider.value = 0;
  rangeValueBlueLum.innerText = 0;
});

const PurpulHueSlider = document.querySelector("#PurpulHue");
const rangeValuePurpulHue = document.querySelector("#rangeValuePurpulHue");

PurpulHueSlider.addEventListener("input", () => {
  rangeValuePurpulHue.innerText = PurpulHueSlider.value;
});

PurpulHueSlider.addEventListener("dblclick", () => {
  PurpulHueSlider.value = 0;
  rangeValuePurpulHue.innerText = 0;
});

const PurpulSatSlider = document.querySelector("#PurpulSat");
const rangeValuePurpulSat = document.querySelector("#rangeValuePurpulSat");

PurpulSatSlider.addEventListener("input", () => {
  rangeValuePurpulSat.innerText = PurpulSatSlider.value;
});

PurpulSatSlider.addEventListener("dblclick", () => {
  PurpulSatSlider.value = 0;
  rangeValuePurpulSat.innerText = 0;
});

const PurpulLumlider = document.querySelector("#PurpulLum");
const rangeValuePurpulLum = document.querySelector("#rangeValuePurpulLum");

PurpulLumlider.addEventListener("input", () => {
  rangeValuePurpulLum.innerText = PurpulLumlider.value;
});

PurpulLumlider.addEventListener("dblclick", () => {
  PurpulLumlider.value = 0;
  rangeValuePurpulLum.innerText = 0;
});

const PinkHueSlider = document.querySelector("#PinkHue");
const rangeValuePinkHue = document.querySelector("#rangeValuePinkHue");

PinkHueSlider.addEventListener("input", () => {
  rangeValuePinkHue.innerText = PinkHueSlider.value;
});

PinkHueSlider.addEventListener("dblclick", () => {
  PinkHueSlider.value = 0;
  rangeValuePinkHue.innerText = 0;
});

const PinkSatlider = document.querySelector("#PinkSat");
const rangeValuePinkSat = document.querySelector("#rangeValuePinkSat");

PinkSatlider.addEventListener("input", () => {
  rangeValuePinkSat.innerText = PinkSatlider.value;
});

PinkSatlider.addEventListener("dblclick", () => {
  PinkSatlider.value = 0;
  rangeValuePinkSat.innerText = 0;
});

const PinkLumlider = document.querySelector("#PinkLum");
const rangeValuePinkLum = document.querySelector("#rangeValuePinkLum");

PinkLumlider.addEventListener("input", () => {
  rangeValuePinkLum.innerText = PinkLumlider.value;
});

PinkLumlider.addEventListener("dblclick", () => {
  PinkLumlider.value = 0;
  rangeValuePinkLum.innerText = 0;
});
