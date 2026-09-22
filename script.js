document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     TIME MACHINE — AUDIO + CONTROLS
  ===================================================== */

  const $ = (id) => document.getElementById(id);


  /* =====================================================
     ELEMENTS
  ===================================================== */

  const enterBtn = $("enterBtn");
  const machine = $("machine");

  const warmBulb = $("warmBulb");
  const rainBtn = $("rainBtn");

  const radioBtn = $("radioBtn");
  const natureSwitch = $("natureSwitch");
  const rainSwitch = $("rainSwitch");
  const headsetSwitch = $("headsetSwitch");

  const radioVol = $("radioVol");
  const natureVol = $("natureVol");
  const rainVol = $("rainVol");

  const radioVal = $("radioVal");
  const natureVal = $("natureVal");
  const rainVal = $("rainVal");

  const programName = $("programName");
  const timeSlot = $("timeSlot");
  const dateLabel = $("dateLabel");


  /* =====================================================
     AUDIO FILES
  ===================================================== */

  const radioAudio = new Audio("radio.mp3");
  const natureAudio = new Audio("nature-morning.mp3");
  const rainAudio = new Audio("rain.mp3");

  const programAudio = {
    vayalumVeedumBtn: new Audio("vayalum-veedum.mp3"),
    youvavaniBtn: new Audio("youvavani.mp3"),
    radioNadakamBtn: new Audio("radio-nadakam.mp3"),
    ganaParipadiBtn: new Audio("gana-paripadi.mp3")
  };


  /* =====================================================
     AUDIO SETTINGS
  ===================================================== */

  radioAudio.loop = true;
  natureAudio.loop = true;
  rainAudio.loop = true;

  Object.values(programAudio).forEach(audio => {
    audio.loop = false;
  });


  radioAudio.volume = 0.78;
  natureAudio.volume = 0.28;
  rainAudio.volume = 0.22;


  /* =====================================================
     STOP ALL PROGRAM AUDIO
  ===================================================== */

  function stopPrograms() {

    Object.values(programAudio).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });

  }


  /* =====================================================
     ENTER BUTTON
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
     WARM LIGHT ONLY
  ===================================================== */

  if (warmBulb) {

    warmBulb.addEventListener("click", (e) => {

      e.preventDefault();

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
     SWITCH
  ===================================================== */

  function toggleSwitch(button) {

    if (!button) return false;

    button.classList.toggle("on");

    const span = button.querySelector("span");

    const isOn =
      button.classList.contains("on");

    if (span) {
      span.textContent =
        isOn ? "ON" : "OFF";
    }

    return isOn;
  }


  /* =====================================================
     RADIO SWITCH
  ===================================================== */

  if (radioBtn) {

    radioBtn.addEventListener("click", () => {

      const on = toggleSwitch(radioBtn);

      if (on) {

        radioAudio.play().catch(() => {});

      } else {

        radioAudio.pause();

      }

    });

  }


  /* =====================================================
     NATURE SWITCH
  ===================================================== */

  if (natureSwitch) {

    natureSwitch.addEventListener("click", () => {

      const on = toggleSwitch(natureSwitch);

      if (on) {

        natureAudio.play().catch(() => {});

      } else {

        natureAudio.pause();

      }

    });

  }


  /* =====================================================
     RAIN SWITCH
  ===================================================== */

  if (rainSwitch) {

    rainSwitch.addEventListener("click", () => {

      const on = toggleSwitch(rainSwitch);

      if (on) {

        rainAudio.play().catch(() => {});

      } else {

        rainAudio.pause();

      }

    });

  }


  /* =====================================================
     TOP RAIN BUTTON
  ===================================================== */

  if (rainBtn && rainSwitch) {

    rainBtn.addEventListener("click", () => {

      const on = toggleSwitch(rainSwitch);

      if (on) {

        rainAudio.play().catch(() => {});

        rainBtn.innerHTML =
          "🌧️ <span>മഴ ON</span>";

      } else {

        rainAudio.pause();

        rainBtn.innerHTML =
          "🌧️ <span>മഴ</span>";

      }

    });

  }


  /* =====================================================
     HEADSET / IMMERSIVE
  ===================================================== */

  if (headsetSwitch) {

    headsetSwitch.addEventListener("click", () => {

      toggleSwitch(headsetSwitch);

    });

  }


  /* =====================================================
     VOLUME
  ===================================================== */

  if (radioVol) {

    radioVol.addEventListener("input", () => {

      const value =
        Number(radioVol.value);

      radioAudio.volume =
        value / 100;

      if (radioVal) {
        radioVal.textContent =
          value + "%";
      }

    });

  }


  if (natureVol) {

    natureVol.addEventListener("input", () => {

      const value =
        Number(natureVol.value);

      natureAudio.volume =
        value / 100;

      if (natureVal) {
        natureVal.textContent =
          value + "%";
      }

    });

  }


  if (rainVol) {

    rainVol.addEventListener("input", () => {

      const value =
        Number(rainVol.value);

      rainAudio.volume =
        value / 100;

      if (rainVal) {
        rainVal.textContent =
          value + "%";
      }

    });

  }


  /* =====================================================
     PROGRAM PLAYER
  ===================================================== */

  function playProgram(
    buttonId,
    name,
    time
  ) {

    const button = $(buttonId);
    const audio = programAudio[buttonId];

    if (!button || !audio) return;


    button.addEventListener("click", () => {

      /* Stop previous program */

      stopPrograms();


      /* Set current program */

      if (programName) {
        programName.textContent = name;
      }

      if (timeSlot) {
        timeSlot.textContent = time;
      }


      /* Play */

      audio.currentTime = 0;

      audio.play().catch((error) => {

        console.log(
          "Audio playback waiting for user interaction:",
          error
        );

      });


      /* Button feedback */

      const original =
        button.innerHTML;

      button.innerHTML =
        "⏸ കേൾക്കുന്നു...";


      audio.onended = () => {

        button.innerHTML =
          original;

      };

    });

  }


  /* =====================================================
     PROGRAMS
  ===================================================== */

  playProgram(
    "vayalumVeedumBtn",
    "വയലും വീടും",
    "07:00 — 07:30"
  );


  playProgram(
    "youvavaniBtn",
    "യുവവാണി",
    "08:00 — 08:30"
  );


  playProgram(
    "radioNadakamBtn",
    "റേഡിയോ നാടകം",
    "20:00 — 21:00"
  );


  playProgram(
    "ganaParipadiBtn",
    "ഗാനപരിപാടി",
    "18:00 — 19:00"
  );


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

    dateLabel.style.cursor = "pointer";

    dateLabel.addEventListener("click", () => {

      index++;

      if (index >= years.length) {
        index = 0;
      }

      dateLabel.textContent =
        years[index];

    });

  }


  /* =====================================================
     MAKE ALL AUDIO BUTTONS SAFE
  ===================================================== */

  document.querySelectorAll(
    ".program-grid article button"
  ).forEach(button => {

    button.addEventListener("click", () => {

      button.blur();

    });

  });


  /* =====================================================
     REMOVE BLUE FOCUS EFFECT
  ===================================================== */

  document.querySelectorAll(
    "button, input, a"
  ).forEach(element => {

    element.addEventListener(
      "touchstart",
      () => {
        element.style.outline = "none";
      },
      { passive: true }
    );

  });


  console.log(
    "TIME MACHINE AUDIO SYSTEM READY"
  );

});
