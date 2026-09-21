document.addEventListener("DOMContentLoaded", function () {

  const enterBtn = document.getElementById("enterBtn");
  const machine = document.getElementById("machine");


  // =========================
  // AUDIO
  // =========================

  const nature = new Audio("nature-morning.mp3");
  const rain = new Audio("rain.mp3");
  const radio = new Audio("radio.mp3");

  // 🌾 വയലും വീടും
  const vayalumVeedum = new Audio("vayalum-veedum.mp3");

  nature.loop = true;
  rain.loop = true;
  radio.loop = true;

  // വയലും വീടും audio repeat വേണ്ടെങ്കിൽ false
  vayalumVeedum.loop = false;

  nature.volume = 0.50;
  rain.volume = 0.35;
  radio.volume = 0.55;
  vayalumVeedum.volume = 0.50;


  let audioContext = null;
  let natureSource = null;
  let naturePanner = null;
  let immersive = false;


  // =========================
  // TIME MACHINE
  // =========================

  if (enterBtn && machine) {

    enterBtn.addEventListener("click", async function () {

      machine.classList.remove("hidden");

      machine.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });


      // 🌿 Morning Nature
      try {
        await nature.play();
      } catch (error) {
        console.log("Morning audio waiting:", error);
      }


      // 📻 Radio
      try {
        await radio.play();
      } catch (error) {
        console.log("Radio waiting:", error);
      }


      // 🌾 വയലും വീടും
      try {
        await vayalumVeedum.play();
      } catch (error) {
        console.log("Vayalum Veedum waiting:", error);
      }

    });

  }


  // =========================
  // RADIO VOLUME
  // =========================

  const radioVol = document.getElementById("radioVol");
  const radioVal = document.getElementById("radioVal");

  if (radioVol) {

    radioVol.value = 55;

    radioVol.addEventListener("input", function () {

      radio.volume = Number(this.value) / 100;

      if (radioVal) {
        radioVal.textContent = this.value + "%";
      }

    });

  }

  if (radioVal) {
    radioVal.textContent = "55%";
  }


  // =========================
  // MORNING VOLUME
  // =========================

  const natureVol = document.getElementById("natureVol");
  const natureVal = document.getElementById("natureVal");

  if (natureVol) {

    natureVol.value = 50;

    natureVol.addEventListener("input", function () {

      nature.volume = Number(this.value) / 100;

      if (natureVal) {
        natureVal.textContent = this.value + "%";
      }

    });

  }

  if (natureVal) {
    natureVal.textContent = "50%";
  }


  // =========================
  // RAIN VOLUME
  // =========================

  const rainVol = document.getElementById("rainVol");
  const rainVal = document.getElementById("rainVal");

  if (rainVol) {

    rainVol.value = 35;

    rainVol.addEventListener("input", function () {

      rain.volume = Number(this.value) / 100;

      if (rainVal) {
        rainVal.textContent = this.value + "%";
      }

    });

  }

  if (rainVal) {
    rainVal.textContent = "35%";
  }


  // =========================
  // RADIO ON / OFF
  // =========================

  const radioBtn =
    document.getElementById("radioBtn");

  if (radioBtn) {

    radioBtn.addEventListener("click", async function () {

      const isOn =
        radioBtn.classList.toggle("on");

      const span =
        radioBtn.querySelector("span");

      if (span) {
        span.textContent = isOn ? "ON" : "OFF";
      }

      if (isOn) {

        try {
          await radio.play();
        } catch (error) {
          console.log("Radio error:", error);
        }

      } else {

        radio.pause();

      }

    });

  }


  // =========================
  // NATURE ON / OFF
  // =========================

  const natureSwitch =
    document.getElementById("natureSwitch");

  if (natureSwitch) {

    natureSwitch.addEventListener("click", async function () {

      const isOn =
        natureSwitch.classList.toggle("on");

      const span =
        natureSwitch.querySelector("span");

      if (span) {
        span.textContent = isOn ? "ON" : "OFF";
      }

      if (isOn) {

        try {
          await nature.play();
        } catch (error) {
          console.log("Nature error:", error);
        }

      } else {

        nature.pause();

      }

    });

  }


  // =========================
  // RAIN ON / OFF
  // =========================

  const rainSwitch =
    document.getElementById("rainSwitch");

  if (rainSwitch) {

    rainSwitch.addEventListener("click", async function () {

      const isOn =
        rainSwitch.classList.toggle("on");

      const span =
        rainSwitch.querySelector("span");

      if (span) {
        span.textContent = isOn ? "ON" : "OFF";
      }

      if (isOn) {

        try {
          await rain.play();
        } catch (error) {
          console.log("Rain error:", error);
        }

      } else {

        rain.pause();

      }

    });

  }


  // =========================
  // 🌾 VAYALUM VEEDUM
  // ON / OFF
  // =========================

  const vayalumVeedumSwitch =
    document.getElementById("vayalumVeedumSwitch");

  if (vayalumVeedumSwitch) {

    vayalumVeedumSwitch.addEventListener(
      "click",
      async function () {

        const isOn =
          vayalumVeedumSwitch.classList.toggle("on");

        const span =
          vayalumVeedumSwitch.querySelector("span");

        if (span) {
          span.textContent = isOn ? "ON" : "OFF";
        }

        if (isOn) {

          try {
            await vayalumVeedum.play();
          } catch (error) {
            console.log(
              "Vayalum Veedum error:",
              error
            );
          }

        } else {

          vayalumVeedum.pause();

        }

      }
    );

  }


  // =========================
  // RAIN HEADER BUTTON
  // =========================

  const rainBtn =
    document.getElementById("rainBtn");

  if (rainBtn) {

    rainBtn.addEventListener("click", async function () {

      if (machine) {

        machine.classList.remove("hidden");

        machine.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

      if (
        rainSwitch &&
        !rainSwitch.classList.contains("on")
      ) {

        rainSwitch.classList.add("on");

        const span =
          rainSwitch.querySelector("span");

        if (span) {
          span.textContent = "ON";
        }

      }

      try {
        await rain.play();
      } catch (error) {
        console.log("Rain waiting:", error);
      }

    });

  }


  // =========================
  // HEADPHONE IMMERSIVE
  // =========================

  const headsetSwitch =
    document.getElementById("headsetSwitch");


  function createImmersiveAudio() {

    if (audioContext) return;

    audioContext =
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();

    natureSource =
      audioContext.createMediaElementSource(nature);

    naturePanner =
      audioContext.createStereoPanner();

    natureSource.connect(naturePanner);
    naturePanner.connect(audioContext.destination);

  }


  if (headsetSwitch) {

    headsetSwitch.addEventListener(
      "click",
      async function () {

        immersive =
          headsetSwitch.classList.toggle("on");

        const span =
          headsetSwitch.querySelector("span");

        if (span) {
          span.textContent =
            immersive ? "ON" : "OFF";
        }

        createImmersiveAudio();

        if (audioContext.state === "suspended") {
          await audioContext.resume();
        }

        if (immersive) {

          naturePanner.pan.value = -0.15;

          nature.volume =
            Math.min(
              Number(natureVol?.value || 50) / 100 + 0.03,
              1
            );

          console.log("🎧 IMMERSIVE ON");

        } else {

          naturePanner.pan.value = 0;

          nature.volume =
            Number(natureVol?.value || 50) / 100;

          console.log("🎧 IMMERSIVE OFF");

        }

      }
    );

  }


  // =========================
  // RADIO STATUS
  // =========================

  const timeSlot =
    document.getElementById("timeSlot");

  radio.addEventListener("play", function () {

    if (timeSlot) {
      timeSlot.textContent = "ON AIR";
    }

  });

  radio.addEventListener("pause", function () {

    if (timeSlot) {
      timeSlot.textContent = "PAUSED";
    }

  });


  // =========================
  // 🌾 VAYALUM VEEDUM STATUS
  // =========================

  vayalumVeedum.addEventListener(
    "ended",
    function () {

      console.log(
        "🌾 Vayalum Veedum audio finished"
      );

    }
  );


  // =========================
  // READY
  // =========================

  console.log(
    "TIME MACHINE + RADIO + MORNING + RAIN + VAYALUM VEEDUM + IMMERSIVE READY"
  );

});
