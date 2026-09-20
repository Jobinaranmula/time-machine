document.addEventListener("DOMContentLoaded", function () {

  const enterBtn = document.getElementById("enterBtn");
  const machine = document.getElementById("machine");

  // MORNING AUDIO
  const nature = new Audio("nature-morning.mp3");
  nature.loop = true;
  nature.volume = 0.28;

  // TIME MACHINE BUTTON
  if (enterBtn && machine) {
    enterBtn.addEventListener("click", async function () {

      machine.classList.remove("hidden");

      machine.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      // Start morning sound
      try {
        await nature.play();
      } catch (error) {
        console.log("Morning audio waiting:", error);
      }

    });
  }

  // NATURE ON / OFF
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
          console.log("Audio error:", error);
        }
      } else {
        nature.pause();
      }

    });

  }

  console.log("TIME MACHINE + MORNING AUDIO READY");

});
