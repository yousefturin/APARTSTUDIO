



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

infoBtn.addEventListener('click', () => {
  overlay2.classList.add('active'); // add the 'active' class to show the overlay
});

overlay2.addEventListener('click', (event) => {
  if (event.target === overlay2) {
    overlay2.classList.remove('active'); // remove the 'active' class to hide the overlay
  }
});



const premBtn = document.getElementById('premium');
const overlay3 = document.getElementById('overlay3');

premBtn.addEventListener('click', () => {
  overlay3.classList.add('active'); // add the 'active' class to show the overlay
});

overlay3.addEventListener('click', (event) => {
  if (event.target === overlay3) {
    overlay3.classList.remove('active'); // remove the 'active' class to hide the overlay
  }
});


const shareBtn = document.getElementById('send');
const overlay4 = document.getElementById('overlay4');

shareBtn.addEventListener('click', () => {
  overlay4.classList.add('active'); // add the 'active' class to show the overlay
});

overlay4.addEventListener('click', (event) => {
  if (event.target === overlay4) {
    overlay4.classList.remove('active'); // remove the 'active' class to hide the overlay
  }
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
