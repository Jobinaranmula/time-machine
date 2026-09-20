hereconst $ = (s) => document.querySelector(s);

document.addEventListener("DOMContentLoaded", () => {

  const enter = $("#enterBtn");
  const machine = $("#machine");

  // AUDIO
  const radio = new Audio("audio/radio.mp3");
  const nature = new Audio("nature-morning.mp3");
  const rain = new Audio("audio/rain.mp3");

  radio.loop = true;
  nature.loop = true;
  rain.loop = true;

  radio.volume = 0.55;
  nature.volume = 0.26;
  rain.volume = 0.34;

  // -----------------------------
  // TIME MACHINE BUTTON
  // -----------------------------

  if (enter && machine) {
    enter.addEventListener("click", async () => {

      machine.classList.remove("hidden");

      machine.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      try {
        await radio.play();
      } catch (e) {
        console.log("Radio waiting for audio permission");
      }

      try {
        await nature.play();
      } catch (e) {
        console.log("Nature waiting for audio permission");
      }

    });
  }

  // -----------------------------
  // VOLUME
  // -----------------------------

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

  // -----------------------------
  // RADIO ON / OFF
  // -----------------------------

  const radioBtn = $("#radioBtn");

  if (radioBtn) {

    radioBtn.addEventListener("click", () => {

      const isOn = radioBtn.classList.toggle("on");
      const span = radioBtn.querySelector("span");

      if (span) {
        span.textContent = isOn ? "ON" : "OFF";
      }

      if (isOn) {
        radio.play().catch(() => {});
      } else {
        radio.pause();
      }

    });

  }

  // -----------------------------
  // NATURE ON / OFF
  // -----------------------------

  const natureSwitch = $("#natureSwitch");

  if (natureSwitch) {

    natureSwitch.addEventListener("click", () => {

      const isOn = natureSwitch.classList.toggle("on");
      const span = natureSwitch.querySelector("span");

      if (span) {
        span.textContent = isOn ? "ON" : "OFF";
      }

      if (isOn) {
        nature.play().catch(() => {});
      } else {
        nature.pause();
      }

    });

  }

  // -----------------------------
  // RAIN ON / OFF
  // -----------------------------

  const rainSwitch = $("#rainSwitch");

  if (rainSwitch) {

    rainSwitch.addEventListener("click", () => {

      const isOn = rainSwitch.classList.toggle("on");
      const span = rainSwitch.querySelector("span");

      if (span) {
        span.textContent = isOn ? "ON" : "OFF";
      }

      if (isOn) {
        rain.play().catch(() => {});
      } else {
        rain.pause();
      }

    });

  }

  // -----------------------------
  // RAIN BUTTON
  // -----------------------------

  const rainBtn = $("#rainBtn");

  if (rainBtn) {

    rainBtn.addEventListener("click", () => {

      if (machine) {
        machine.classList.remove("hidden");

        machine.scrollIntoView({
          behavior: "smooth"
        });
      }

      if (rainSwitch && !rainSwitch.classList.contains("on")) {
        rainSwitch.click();
      }

    });

  }

  // -----------------------------
  // HEADPHONE IMMERSIVE
  // -----------------------------

  const headsetSwitch = $("#headsetSwitch");

  if (headsetSwitch) {

    headsetSwitch.addEventListener("click", () => {

      const isOn = headsetSwitch.classList.toggle("on");
      const span = headsetSwitch.querySelector("span");

      if (span) {
        span.textContent = isOn ? "ON" : "OFF";
      }

      if (isOn) {

        radio.volume = Math.min(radio.volume, 0.60);
        nature.volume = Math.min(nature.volume + 0.04, 1);
        rain.volume = Math.min(rain.volume + 0.03, 1);

      } else {

        radio.volume = 0.55;
        nature.volume = 0.26;
        rain.volume = 0.34;

      }

    });

  }

  // -----------------------------
  // PROGRAM BUTTONS
  // -----------------------------

  document
    .querySelectorAll(".program-grid article button")
    .forEach((button) => {

      button.addEventListener("click", () => {

        const article = button.closest("article");

        if (!article) return;

        const title = article.querySelector("b");

        if (title && $("#programName")) {
          $("#programName").textContent = title.textContent;
        }

        if ($("#timeSlot")) {
          $("#timeSlot").textContent = "ON AIR";
        }

        radio.play().catch(() => {});

      });

    });

  // -----------------------------
  // RADIO STATUS
  // -----------------------------

  radio.addEventListener("play", () => {

    if ($("#timeSlot")) {
      $("#timeSlot").textContent = "ON AIR";
    }

  });

  radio.addEventListener("pause", () => {

    if ($("#timeSlot")) {
      $("#timeSlot").textContent = "PAUSED";
    }

  });

  console.log("TIME MACHINE READY");

});
