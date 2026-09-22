document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTS
  ========================= */

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

  /* =========================
     ENTER TIME MACHINE
  ========================= */

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


  /* =========================
     BULB
     NO BLUE COLOR
  ========================= */

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


  /* Restore bulb setting */

  if (
    localStorage.getItem("timeMachineDark") === "on"
  ) {
    document.body.classList.add("dark-mode");
  }


  /* =========================
     SWITCH FUNCTION
  ========================= */

  function toggleSwitch(button) {

    if (!button) return;

    button.classList.toggle("on");

    const span = button.querySelector("span");

    if (span) {

      span.textContent =
        button.classList.contains("on")
          ? "ON"
          : "OFF";

    }

  }


  if (radioBtn) {
    radioBtn.addEventListener("click", () => {
      toggleSwitch(radioBtn);
    });
  }


  if (natureSwitch) {
    natureSwitch.addEventListener("click", () => {
      toggleSwitch(natureSwitch);
    });
  }


  if (rainSwitch) {
    rainSwitch.addEventListener("click", () => {
      toggleSwitch(rainSwitch);
    });
  }


  if (headsetSwitch) {
    headsetSwitch.addEventListener("click", () => {
      toggleSwitch(headsetSwitch);
    });
  }


  /* =========================
     TOP RAIN BUTTON
  ========================= */

  if (rainBtn && rainSwitch) {

    rainBtn.addEventListener("click", () => {

      toggleSwitch(rainSwitch);

      const rainOn =
        rainSwitch.classList.contains("on");

      rainBtn.innerHTML =
        rainOn
          ? "🌧️ <span>മഴ ON</span>"
          : "🌧️ <span>മഴ</span>";

    });

  }


  /* =========================
     VOLUME SLIDERS
  ========================= */

  function updateVolume(input, output) {

    if (!input || !output) return;

    input.addEventListener("input", () => {

      output.textContent =
        input.value + "%";

    });

  }

  updateVolume(radioVol, radioVal);
  updateVolume(natureVol, natureVal);
  updateVolume(rainVol, rainVal);


  /* =========================
     PROGRAM BUTTONS
  ========================= */

  function setProgram(name, time) {

    if (programName) {
      programName.textContent = name;
    }

    if (timeSlot) {
      timeSlot.textContent = time;
    }

  }


  const vayalum =
    document.getElementById("vayalumVeedumBtn");

  if (vayalum) {

    vayalum.addEventListener("click", () => {

      setProgram(
        "വയലും വീടും",
        "07:00 — 07:30"
      );

    });

  }


  const youvavani =
    document.getElementById("youvavaniBtn");

  if (youvavani) {

    youvavani.addEventListener("click", () => {

      setProgram(
        "യുവവാണി",
        "08:00 — 08:30"
      );

    });

  }


  const nadakam =
    document.getElementById("radioNadakamBtn");

  if (nadakam) {

    nadakam.addEventListener("click", () => {

      setProgram(
        "റേഡിയോ നാടകം",
        "20:00 — 21:00"
      );

    });

  }


  const gana =
    document.getElementById("ganaParipadiBtn");

  if (gana) {

    gana.addEventListener("click", () => {

      setProgram(
        "ഗാനപരിപാടി",
        "18:00 — 19:00"
      );

    });

  }


  /* =========================
     DATE LABEL
  ========================= */

  if (dateLabel) {

    const years = [
      "1982 · ഒരു രാവിലെ",
      "1984 · ഒരു വൈകുന്നേരം",
      "1985 · ഒരു രാവിലെ",
      "1987 · ഒരു രാത്രി",
      "1989 · ഒരു ഞായറാഴ്ച"
    ];

    let index = 2;

    dateLabel.addEventListener("click", () => {

      index++;

      if (index >= years.length) {
        index = 0;
      }

      dateLabel.textContent =
        years[index];

    });

  }


  /* =========================
     PROGRAM BUTTON FEEDBACK
  ========================= */

  document.querySelectorAll(
    ".program-grid article button"
  ).forEach(button => {

    button.addEventListener("click", () => {

      const original =
        button.textContent;

      button.textContent = "✓ പ്ലേ ചെയ്യുന്നു";

      setTimeout(() => {

        button.textContent = original;

      }, 1400);

    });

  });


});
