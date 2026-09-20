here// TIME MACHINE — Immersive Audio System
// Radio + Nature + Rain + Headphone Immersive Mode

const $ = (s) => document.querySelector(s);

const enter = $("#enterBtn");
const machine = $("#machine");

// --------------------------------------------------
// AUDIO FILES
// --------------------------------------------------

const radio = new Audio("audio/radio.mp3");
const nature = new Audio("audio/nature.mp3");
const rain = new Audio("audio/rain.mp3");

// Loop ambience
radio.loop = true;
nature.loop = true;
rain.loop = true;

// Initial volumes
radio.volume = 0.55;
nature.volume = 0.26;
rain.volume = 0.34;

// --------------------------------------------------
// START TIME MACHINE
// --------------------------------------------------

if (enter) {
  enter.addEventListener("click", () => {
    machine.classList.remove("hidden");

    machine.scrollIntoView({
      behavior: "smooth"
    });

    // Start audio after user interaction
    startAudio();
  });
}

// --------------------------------------------------
// AUDIO START
// --------------------------------------------------

function startAudio() {
  radio.play().catch(() => {});
  nature.play().catch(() => {});
}

// --------------------------------------------------
// VOLUME CONTROLS
// --------------------------------------------------

function bindRange(id, valueId, audio) {
  const slider = $("#" + id);
  const value = $("#" + valueId);

  if (!slider) return;

  slider.addEventListener("input", () => {
    audio.volume = Number(slider.value) / 100;

    if (value) {
      value.textContent = slider.value + "%";
    }
  });
}

bindRange("radioVol", "radioVal", radio);
bindRange("natureVol", "natureVal", nature);
bindRange("rainVol", "rainVal", rain);

// --------------------------------------------------
// ON / OFF BUTTON
// --------------------------------------------------

function toggle(buttonId, audio) {
  const btn = $("#" + buttonId);

  if (!btn) return;

  btn.addEventListener("click", () => {
    const isOn = !btn.classList.contains("on");

    btn.classList.toggle("on", isOn);

    const span = btn.querySelector("span");

    if (span) {
      span.textContent = isOn ? "ON" : "OFF";
    }

    if (isOn) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  });
}

toggle("radioSwitch", radio);
toggle("natureSwitch", nature);
toggle("rainSwitch", rain);

// --------------------------------------------------
// RAIN BUTTON
// --------------------------------------------------

const rainButton = $("#rainBtn");

if (rainButton) {
  rainButton.addEventListener("click", () => {
    const rainSwitch = $("#rainSwitch");

    if (rainSwitch) {
      rainSwitch.click();
    }

    machine.classList.remove("hidden");
    machine.scrollIntoView({
      behavior: "smooth"
    });
  });
}

// --------------------------------------------------
// HEADPHONE IMMERSIVE MODE
// --------------------------------------------------

let immersive = false;

const headsetSwitch = $("#headsetSwitch");
const headsetBtn = $("#headsetBtn");

function updateImmersive() {

  immersive = !immersive;

  if (headsetSwitch) {
    headsetSwitch.classList.toggle("on", immersive);

    const span = headsetSwitch.querySelector("span");

    if (span) {
      span.textContent = immersive ? "ON" : "OFF";
    }
  }

  if (immersive) {

    // Headphone-style stereo balance
    radio.pan = 0;
    nature.pan = -0.15;
    rain.pan = 0.12;

    // Slightly softer radio
    radio.volume = Math.min(radio.volume, 0.60);

    // Nature ambience slightly wider
    nature.volume = Math.min(nature.volume + 0.04, 1);

    // Rain surrounds the ambience
    rain.volume = Math.min(rain.volume + 0.03, 1);

  } else {

    // Normal stereo
    radio.pan = 0;
    nature.pan = 0;
    rain.pan = 0;
  }
}

if (headsetSwitch) {
  headsetSwitch.addEventListener("click", updateImmersive);
}

if (headsetBtn) {
  headsetBtn.addEventListener("click", updateImmersive);
}

// --------------------------------------------------
// PROGRAM BUTTONS
// --------------------------------------------------

document
  .querySelectorAll(".program-grid button")
  .forEach((button) => {

    button.addEventListener("click", () => {

      const article = button.closest("article");

      if (!article) return;

      const title = article.querySelector("b");

      if (title && $("#programName")) {
        $("#programName").textContent =
          title.textContent;
      }

      if ($("#timeSlot")) {
        $("#timeSlot").textContent = "ON AIR";
      }

      // Make sure radio is playing
      radio.play().catch(() => {});
    });

  });

// --------------------------------------------------
// RADIO STATUS
// --------------------------------------------------

radio.addEventListener("play", () => {

  const timeSlot = $("#timeSlot");

  if (timeSlot) {
    timeSlot.textContent = "ON AIR";
  }

});

radio.addEventListener("pause", () => {

  const timeSlot = $("#timeSlot");

  if (timeSlot) {
    timeSlot.textContent = "PAUSED";
  }

});

// --------------------------------------------------
// VISIBILITY / TAB SAFETY
// --------------------------------------------------

document.addEventListener("visibilitychange", () => {

  if (document.hidden) {
    // Keep ambience running naturally.
    return;
  }

});

// --------------------------------------------------
// INITIAL BUTTON STATE
// --------------------------------------------------

if ($("#radioSwitch")) {
  $("#radioSwitch").classList.add("on");
}

if ($("#natureSwitch")) {
  $("#natureSwitch").classList.add("on");
}

if ($("#rainSwitch")) {
  $("#rainSwitch").classList.remove("on");
}

if ($("#headsetSwitch")) {
  $("#headsetSwitch").classList.add("on");
}

console.log("TIME MACHINE immersive audio system ready.");
