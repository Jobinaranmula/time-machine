document.addEventListener("DOMContentLoaded", function () {

  const enterBtn = document.getElementById("enterBtn");
  const machine = document.getElementById("machine");

  // =========================
  // MORNING AUDIO
  // =========================

  const nature = new Audio("nature-morning.mp3");
  nature.loop = true;
  nature.volume = 0.50;

  let audioContext = null;
  let source = null;
  let panner = null;
  let immersive = false;

  // =========================
  // START AUDIO
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
  // VOLUME CONTROL
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
          console.log("Nature audio error:", error);
        }

      } else {

        nature.pause();

      }

    });

  }

  // =========================
  // CREATE IMMERSIVE AUDIO
  // =========================

  function createImmersiveAudio() {

    if (audioContext) return;

    audioContext =
      new (window.AudioContext ||
           window.webkitAudioContext)();

    source =
      audioContext.createMediaElementSource(nature);

    panner =
      audioContext.createStereoPanner();

    source.connect(panner);
    panner.connect(audioContext.destination);
  }

  // =========================
  // HEADPHONE IMMERSIVE
  // =========================

  const headsetSwitch =
    document.getElementById("headsetSwitch");

  if (headsetSwitch) {

    headsetSwitch.addEventListener("click", async function () {

      immersive =
        headsetSwitch.classList.toggle("on");

      const span =
        headsetSwitch.querySelector("span");

      if (span) {
        span.textContent =
          immersive ? "ON" : "OFF";
      }

      // Create audio system after user tap
      createImmersiveAudio();

      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      if (immersive) {

        // Headphone immersive mode
        panner.pan.value = -0.15;

        nature.volume =
          Math.min(
            Number(natureVol?.value || 50) / 100 + 0.03,
            1
          );

        console.log("🎧 IMMERSIVE MODE ON");

      } else {

        // Normal mode
        panner.pan.value = 0;

        nature.volume =
          Number(natureVol?.value || 50) / 100;

        console.log("🎧 IMMERSIVE MODE OFF");
      }

    });

  }

  console.log(
    "TIME MACHINE + MORNING AUDIO + HEADPHONE IMMERSIVE READY"
  );

});
