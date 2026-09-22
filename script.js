document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     TIME MACHINE — FINAL AUDIO SCRIPT
  ===================================================== */

  const enterBtn = document.getElementById("enterBtn");
  const machine = document.getElementById("machine");

  const warmBulb = document.getElementById("warmBulb");
  const rainBtn = document.getElementById("rainBtn");

  const radioBtn = document.getElementById("radioBtn");
  const natureSwitch = document.getElementById("natureSwitch");
  const rainSwitch = document.getElementById("rainSwitch");
  const headsetSwitch = document.getElementById("headsetSwitch");

  const radioVol = document.getElementById("radioVol");
  const natureVol = document.getElementById("natureVol");
  const rainVol = document.getElementById("rainVol");

  const radioVal = document.getElementById("radioVal");
  const natureVal = document.getElementById("natureVal");
  const rainVal = document.getElementById("rainVal");

  const programName = document.getElementById("programName");
  const timeSlot = document.getElementById("timeSlot");
  const dateLabel = document.getElementById("dateLabel");


  /* =====================================================
     AUDIO FILES
  ===================================================== */

  const audio = {

    radio: new Audio("./radio.mp3"),

    nature: new Audio("./nature-morning.mp3"),

    rain: new Audio("./rain.mp3"),

    vayalum: new Audio("./vayalum-veedum.mp3"),

    youvavani: new Audio("./youvavani.mp3"),

    nadakam: new Audio("./radio-nadakam.mp3"),

    gana: new Audio("./gana-paripadi.mp3")

  };


  /* =====================================================
     AUDIO SETTINGS
  ===================================================== */

  Object.values(audio).forEach(player => {

    player.preload = "auto";

  });


  audio.radio.loop = true;
  audio.nature.loop = true;
  audio.rain.loop = true;


  /* =====================================================
     VOLUME DEFAULTS
  ===================================================== */

  audio.radio.volume = 0.78;
  audio.nature.volume = 0.28;
  audio.rain.volume = 0.22;


  /* =====================================================
     ENTER TIME MACHINE
  ===================================================== */

  if (enterBtn && machine) {

    enterBtn.addEventListener("click", () => {

      machine.classList.remove("hidden");

      setTimeout(() => {

        machine.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }, 100);

    });

  }


  /* =====================================================
     BULB
  ===================================================== */

  if (warmBulb) {

    warmBulb.addEventListener("click", () => {

      document.body.classList.toggle("dark-mode");

      localStorage.setItem(
        "timeMachineDark",
        document.body.classList.contains("dark-mode")
          ? "on"
          : "off"
      );

    });

  }


  if (
    localStorage.getItem("timeMachineDark") === "on"
  ) {

    document.body.classList.add("dark-mode");

  }


  /* =====================================================
     SWITCH UI
  ===================================================== */

  function updateSwitch(button, state) {

    if (!button) return;

    if (state) {

      button.classList.add("on");

    } else {

      button.classList.remove("on");

    }

    const span = button.querySelector("span");

    if (span) {

      span.textContent = state ? "ON" : "OFF";

    }

  }


  /* =====================================================
     RADIO ON / OFF
  ===================================================== */

  if (radioBtn) {

    radioBtn.addEventListener("click", () => {

      if (audio.radio.paused) {

        audio.radio.play().catch(() => {});

        updateSwitch(radioBtn, true);

      } else {

        audio.radio.pause();

        updateSwitch(radioBtn, false);

      }

    });

  }


  /* =====================================================
     NATURE ON / OFF
  ===================================================== */

  if (natureSwitch) {

    natureSwitch.addEventListener("click", () => {

      if (audio.nature.paused) {

        audio.nature.play().catch(() => {});

        updateSwitch(natureSwitch, true);

      } else {

        audio.nature.pause();

        updateSwitch(natureSwitch, false);

      }

    });

  }


  /* =====================================================
     RAIN ON / OFF
  ===================================================== */

  function toggleRain() {

    if (audio.rain.paused) {

      audio.rain.play().catch(() => {});

      updateSwitch(rainSwitch, true);

      if (rainBtn) {

        rainBtn.innerHTML =
          "🌧️ <span>മഴ ON</span>";

      }

    } else {

      audio.rain.pause();

      updateSwitch(rainSwitch, false);

      if (rainBtn) {

        rainBtn.innerHTML =
          "🌧️ <span>മഴ</span>";

      }

    }

  }


  if (rainSwitch) {

    rainSwitch.addEventListener(
      "click",
      toggleRain
    );

  }


  if (rainBtn) {

    rainBtn.addEventListener(
      "click",
      toggleRain
    );

  }


  /* =====================================================
     IMMERSIVE
  ===================================================== */

  if (headsetSwitch) {

    headsetSwitch.addEventListener("click", () => {

      const isOn =
        !headsetSwitch.classList.contains("on");

      updateSwitch(
        headsetSwitch,
        isOn
      );

    });

  }


  /* =====================================================
     VOLUME CONTROLS
  ===================================================== */

  function setupVolume(
    input,
    label,
    player
  ) {

    if (!input || !player) return;

    function update() {

      const value =
        Number(input.value);

      player.volume =
        value / 100;

      if (label) {

        label.textContent =
          value + "%";

      }

    }

    input.addEventListener(
      "input",
      update
    );

    update();

  }


  setupVolume(
    radioVol,
    radioVal,
    audio.radio
  );


  setupVolume(
    natureVol,
    natureVal,
    audio.nature
  );


  setupVolume(
    rainVol,
    rainVal,
    audio.rain
  );


  /* =====================================================
     STOP ALL PROGRAM AUDIO
  ===================================================== */

  function stopPrograms() {

    [
      audio.vayalum,
      audio.youvavani,
      audio.nadakam,
      audio.gana
    ].forEach(player => {

      player.pause();

      player.currentTime = 0;

    });

    document
      .querySelectorAll(
        ".program-grid article button"
      )
      .forEach(button => {

        button.dataset.playing = "false";

        button.textContent =
          button.dataset.originalText ||
          "▶ കേൾക്കാം";

      });

  }


  /* =====================================================
     PLAY PROGRAM
  ===================================================== */

  function playProgram(
    player,
    name,
    time,
    button
  ) {

    const wasPlaying =
      !player.paused;

    stopPrograms();

    if (wasPlaying) {

      player.pause();

      return;

    }

    if (programName) {

      programName.textContent =
        name;

    }

    if (timeSlot) {

      timeSlot.textContent =
        time;

    }

    if (dateLabel) {

      dateLabel.textContent =
        "1985 · ഒരു രാവിലെ";

    }

    if (button) {

      button.dataset.originalText =
        button.textContent;

      button.dataset.playing =
        "true";

      button.textContent =
        "⏸ നിർത്താം";

    }

    player.currentTime = 0;

    player.play().catch(error => {

      console.log(
        "Audio play error:",
        error
      );

    });

  }


  /* =====================================================
     VAYALUM VEEDUM
  ===================================================== */

  const vayalumBtn =
    document.getElementById(
      "vayalumVeedumBtn"
    );

  if (vayalumBtn) {

    vayalumBtn.addEventListener(
      "click",
      () => {

        playProgram(
          audio.vayalum,
          "വയലും വീടും",
          "07:00 — 07:30",
          vayalumBtn
        );

      }
    );

  }


  /* =====================================================
     YOUVAVANI
  ===================================================== */

  const youvavaniBtn =
    document.getElementById(
      "youvavaniBtn"
    );

  if (youvavaniBtn) {

    youvavaniBtn.addEventListener(
      "click",
      () => {

        playProgram(
          audio.youvavani,
          "യുവവാണി",
          "08:00 — 08:30",
          youvavaniBtn
        );

      }
    );

  }


  /* =====================================================
     RADIO NADAKAM
  ===================================================== */

  const nadakamBtn =
    document.getElementById(
      "radioNadakamBtn"
    );

  if (nadakamBtn) {

    nadakamBtn.addEventListener(
      "click",
      () => {

        playProgram(
          audio.nadakam,
          "റേഡിയോ നാടകം",
          "20:00 — 21:00",
          nadakamBtn
        );

      }
    );

  }


  /* =====================================================
     GANA PARIPADI
  ===================================================== */

  const ganaBtn =
    document.getElementById(
      "ganaParipadiBtn"
    );

  if (ganaBtn) {

    ganaBtn.addEventListener(
      "click",
      () => {

        playProgram(
          audio.gana,
          "ഗാനപരിപാടി",
          "18:00 — 19:00",
          ganaBtn
        );

      }
    );

  }


  /* =====================================================
     OTHER PROGRAM BUTTONS
  ===================================================== */

  document
    .querySelectorAll(
      ".program-grid article button"
    )
    .forEach(button => {

      if (
        button === vayalumBtn ||
        button === youvavaniBtn ||
        button === nadakamBtn ||
        button === ganaBtn
      ) {

        return;

      }

      button.addEventListener(
        "click",
        () => {

          const article =
            button.closest("article");

          if (!article) return;

          const title =
            article.querySelector("b");

          if (title) {

            if (programName) {

              programName.textContent =
                title.textContent.trim();

            }

          }

        }
      );

    });


  /* =====================================================
     AUDIO ENDED
  ===================================================== */

  [
    audio.vayalum,
    audio.youvavani,
    audio.nadakam,
    audio.gana
  ].forEach(player => {

    player.addEventListener(
      "ended",
      () => {

        document
          .querySelectorAll(
            ".program-grid article button"
          )
          .forEach(button => {

            if (
              button.dataset.playing === "true"
            ) {

              button.dataset.playing =
                "false";

              button.textContent =
                button.dataset.originalText ||
                "▶ കേൾക്കാം";

            }

          });

      }
    );

  });


  /* =====================================================
     DATE LABEL
  ===================================================== */

  if (dateLabel) {

    const years = [

      "1982 · ഒരു രാവിലെ",
      "1984 · ഒരു വൈകുന്നേരം",
      "1985 · ഒരു രാവിലെ",
      "1987 · ഒരു രാത്രി",
      "1989 · ഒരു ഞായറാഴ്ച"

    ];

    let index = 2;

    dateLabel.addEventListener(
      "click",
      () => {

        index++;

        if (index >= years.length) {

          index = 0;

        }

        dateLabel.textContent =
          years[index];

      }
    );

  }


  /* =====================================================
     INITIAL BUTTON STATE
  ===================================================== */

  updateSwitch(
    radioBtn,
    false
  );

  updateSwitch(
    natureSwitch,
    false
  );

  updateSwitch(
    rainSwitch,
    false
  );


  console.log(
    "TIME MACHINE AUDIO SYSTEM READY"
  );

});
