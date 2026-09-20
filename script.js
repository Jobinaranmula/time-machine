document.addEventListener("DOMContentLoaded", function () {

  const enterBtn = document.getElementById("enterBtn");
  const machine = document.getElementById("machine");

  // =========================
  // MORNING NATURE AUDIO
  // =========================

  const nature = new Audio("nature-morning.mp3");

  nature.loop = true;
  nature.volume = 0.50;


  // =========================
  // TIME MACHINE BUTTON
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
  // MORNING VOLUME CONTROL
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

  const natureSwitch = document.getElementById("natureSwitch");

  if (natureSwitch) {

    natureSwitch.addEventListener("click", async function () {

      const isOn = natureSwitch.classList.toggle("on");

      const span = natureSwitch.querySelector("span");

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
  // HEADPHONE IMMERSIVE MODE
  // =========================

  const headsetSwitch =
    document.getElementById("headsetSwitch");

  if (headsetSwitch) {

    headsetSwitch.addEventListener("click", function () {

      const isOn =
        headsetSwitch.classList.toggle("on");

      const span =
        headsetSwitch.querySelector("span");

      if (span) {
        span.textContent = isOn ? "ON" : "OFF";
      }

      if (isOn) {

        // Immersive volume
        nature.volume =
          Math.min(nature.volume + 0.05, 1);

        console.log("🎧 Immersive ON");

      } else {

        // Normal volume
        nature.volume =
          Number(natureVol?.value || 50) / 100;

        console.log("🎧 Immersive OFF");

      }

    });

  }


  console.log(
    "TIME MACHINE + MORNING AUDIO + IMMERSIVE READY"
  );

});
