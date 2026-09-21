document.addEventListener("DOMContentLoaded", function () {

  const enterBtn = document.getElementById("enterBtn");
  const machine = document.getElementById("machine");

  // =========================
  // AUDIO
  // =========================

  const nature = new Audio("nature-morning.mp3");
  const rain = new Audio("rain.mp3");

  nature.loop = true;
  rain.loop = true;

  nature.volume = 0.50;
  rain.volume = 0.35;

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

      try {
        await nature.play();
      } catch (error) {
        console.log("Morning audio waiting:", error);
      }

    });

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
  // READY
  // =========================

  console.log(
    "TIME MACHINE + MORNING + RAIN + IMMERSIVE READY"
  );

});
