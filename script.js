<script>

document.addEventListener("DOMContentLoaded", function () {

  /* ==========================================
     AUDIO PLAYER
  ========================================== */

  let currentAudio = null;
  let currentButton = null;


  const buttons =
    document.querySelectorAll(".audio-btn");


  buttons.forEach(function (button) {

    button.addEventListener("click", function () {

      const file =
        button.getAttribute("data-audio");

      const title =
        button.getAttribute("data-title");


      /* SAME BUTTON = PLAY / PAUSE */

      if (
        currentAudio &&
        currentButton === button
      ) {

        if (currentAudio.paused) {

          currentAudio.play();

          button.textContent =
            "⏸ Pause";

        } else {

          currentAudio.pause();

          button.textContent =
            "▶ കേൾക്കാം";

        }

        return;
      }


      /* STOP PREVIOUS AUDIO */

      if (currentAudio) {

        currentAudio.pause();
        currentAudio.currentTime = 0;

      }


      if (currentButton) {

        currentButton.textContent =
          "▶ കേൾക്കാം";

      }


      /* CREATE NEW AUDIO */

      const audio =
        new Audio(file);

      currentAudio = audio;
      currentButton = button;


      /* PLAY */

      audio.play()
        .then(function () {

          button.textContent =
            "⏸ Pause";

        })
        .catch(function (error) {

          console.log(
            "Audio play error:",
            error
          );

          button.textContent =
            "▶ വീണ്ടും ശ്രമിക്കുക";

        });


      /* NOW PLAYING */

      const programName =
        document.getElementById("programName");

      if (programName) {

        programName.textContent =
          title;

      }


      /* AUDIO FINISHED */

      audio.addEventListener(
        "ended",
        function () {

          button.textContent =
            "▶ കേൾക്കാം";

          currentAudio = null;
          currentButton = null;

        }
      );

    });

  });


  /* ==========================================
     ENTER TIME MACHINE
  ========================================== */

  const enterBtn =
    document.getElementById("enterBtn");

  const machine =
    document.getElementById("machine");


  if (enterBtn && machine) {

    enterBtn.addEventListener(
      "click",
      function () {

        machine.classList.remove("hidden");

        setTimeout(function () {

          machine.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }, 100);

      }
    );

  }


  /* ==========================================
     SLIDERS
  ========================================== */

  function connectSlider(
    inputId,
    valueId
  ) {

    const input =
      document.getElementById(inputId);

    const value =
      document.getElementById(valueId);

    if (!input || !value) return;


    input.addEventListener(
      "input",
      function () {

        value.textContent =
          input.value + "%";

      }
    );

  }


  connectSlider(
    "radioVol",
    "radioVal"
  );

  connectSlider(
    "natureVol",
    "natureVal"
  );

  connectSlider(
    "rainVol",
    "rainVal"
  );


  /* ==========================================
     SWITCHES
  ========================================== */

  function setupSwitch(id) {

    const button =
      document.getElementById(id);

    if (!button) return;


    button.addEventListener(
      "click",
      function () {

        button.classList.toggle("on");

        const span =
          button.querySelector("span");

        if (span) {

          span.textContent =
            button.classList.contains("on")
              ? "ON"
              : "OFF";

        }

      }
    );

  }


  setupSwitch("radioBtn");
  setupSwitch("natureSwitch");
  setupSwitch("rainSwitch");
  setupSwitch("headsetSwitch");


  /* ==========================================
     TOP RAIN BUTTON
  ========================================== */

  const rainBtn =
    document.getElementById("rainBtn");

  const rainSwitch =
    document.getElementById("rainSwitch");


  if (rainBtn && rainSwitch) {

    rainBtn.addEventListener(
      "click",
      function () {

        rainSwitch.click();

      }
    );

  }


  /* ==========================================
     BULB
  ========================================== */

  const bulb =
    document.getElementById("warmBulb");


  if (bulb) {

    bulb.addEventListener(
      "click",
      function () {

        document.body.classList.toggle(
          "dark-mode"
        );

      }
    );

  }

});

</script>
