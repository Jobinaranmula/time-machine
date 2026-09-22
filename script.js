document.addEventListener("DOMContentLoaded", function () {

  console.log("TIME MACHINE SCRIPT LOADED");

  const audio = {
    radio: new Audio("./radio.mp3"),
    nature: new Audio("./nature-morning.mp3"),
    rain: new Audio("./rain.mp3"),
    vayalum: new Audio("./vayalum-veedum.mp3"),
    youvavani: new Audio("./youvavani.mp3"),
    nadakam: new Audio("./radio-nadakam.mp3"),
    gana: new Audio("./gana-paripadi.mp3")
  };

  audio.radio.loop = true;
  audio.nature.loop = true;
  audio.rain.loop = true;

  audio.radio.volume = 0.78;
  audio.nature.volume = 0.28;
  audio.rain.volume = 0.22;


  /* =========================
     TEST AUDIO
  ========================= */

  function playAudio(sound) {

    if (!sound) return;

    sound.play()
      .then(() => {
        console.log("AUDIO PLAYING");
      })
      .catch((error) => {
        console.error("AUDIO ERROR:", error);
        alert("Audio play ആയില്ല. MP3 file / GitHub Pages പരിശോധിക്കണം.");
      });
  }


  /* =========================
     ENTER
  ========================= */

  const enterBtn = document.getElementById("enterBtn");
  const machine = document.getElementById("machine");

  if (enterBtn && machine) {

    enterBtn.addEventListener("click", function () {

      machine.classList.remove("hidden");

      setTimeout(function () {

        machine.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }, 100);

    });

  }


  /* =========================
     RADIO
  ========================= */

  const radioBtn = document.getElementById("radioBtn");

  if (radioBtn) {

    radioBtn.addEventListener("click", function () {

      if (audio.radio.paused) {

        playAudio(audio.radio);

        radioBtn.classList.add("on");

        const span = radioBtn.querySelector("span");

        if (span) span.textContent = "ON";

      } else {

        audio.radio.pause();

        radioBtn.classList.remove("on");

        const span = radioBtn.querySelector("span");

        if (span) span.textContent = "OFF";

      }

    });

  }


  /* =========================
     NATURE
  ========================= */

  const natureSwitch =
    document.getElementById("natureSwitch");

  if (natureSwitch) {

    natureSwitch.addEventListener("click", function () {

      if (audio.nature.paused) {

        playAudio(audio.nature);

        natureSwitch.classList.add("on");

        const span =
          natureSwitch.querySelector("span");

        if (span) span.textContent = "ON";

      } else {

        audio.nature.pause();

        natureSwitch.classList.remove("on");

        const span =
          natureSwitch.querySelector("span");

        if (span) span.textContent = "OFF";

      }

    });

  }


  /* =========================
     RAIN
  ========================= */

  const rainSwitch =
    document.getElementById("rainSwitch");

  const rainBtn =
    document.getElementById("rainBtn");

  function toggleRain() {

    if (audio.rain.paused) {

      playAudio(audio.rain);

      if (rainSwitch) {
        rainSwitch.classList.add("on");

        const span =
          rainSwitch.querySelector("span");

        if (span) span.textContent = "ON";
      }

      if (rainBtn) {
        rainBtn.innerHTML =
          "🌧️ <span>മഴ ON</span>";
      }

    } else {

      audio.rain.pause();

      if (rainSwitch) {
        rainSwitch.classList.remove("on");

        const span =
          rainSwitch.querySelector("span");

        if (span) span.textContent = "OFF";
      }

      if (rainBtn) {
        rainBtn.innerHTML =
          "🌧️ <span>മഴ</span>";
      }

    }

  }

  if (rainSwitch) {
    rainSwitch.addEventListener("click", toggleRain);
  }

  if (rainBtn) {
    rainBtn.addEventListener("click", toggleRain);
  }


  /* =========================
     VOLUME
  ========================= */

  const radioVol =
    document.getElementById("radioVol");

  const radioVal =
    document.getElementById("radioVal");

  if (radioVol) {

    radioVol.addEventListener("input", function () {

      audio.radio.volume =
        Number(this.value) / 100;

      if (radioVal) {
        radioVal.textContent =
          this.value + "%";
      }

    });

  }


  const natureVol =
    document.getElementById("natureVol");

  const natureVal =
    document.getElementById("natureVal");

  if (natureVol) {

    natureVol.addEventListener("input", function () {

      audio.nature.volume =
        Number(this.value) / 100;

      if (natureVal) {
        natureVal.textContent =
          this.value + "%";
      }

    });

  }


  const rainVol =
    document.getElementById("rainVol");

  const rainVal =
    document.getElementById("rainVal");

  if (rainVol) {

    rainVol.addEventListener("input", function () {

      audio.rain.volume =
        Number(this.value) / 100;

      if (rainVal) {
        rainVal.textContent =
          this.value + "%";
      }

    });

  }


  /* =========================
     PROGRAMS
  ========================= */

  function programButton(
    id,
    sound,
    name,
    time
  ) {

    const button =
      document.getElementById(id);

    if (!button) return;

    button.addEventListener("click", function () {

      /* stop other programs */

      audio.vayalum.pause();
      audio.youvavani.pause();
      audio.nadakam.pause();
      audio.gana.pause();

      audio.vayalum.currentTime = 0;
      audio.youvavani.currentTime = 0;
      audio.nadakam.currentTime = 0;
      audio.gana.currentTime = 0;


      const programName =
        document.getElementById("programName");

      const timeSlot =
        document.getElementById("timeSlot");


      if (programName) {
        programName.textContent = name;
      }

      if (timeSlot) {
        timeSlot.textContent = time;
      }


      sound.currentTime = 0;

      playAudio(sound);

    });

  }


  programButton(
    "vayalumVeedumBtn",
    audio.vayalum,
    "വയലും വീടും",
    "07:00 — 07:30"
  );


  programButton(
    "youvavaniBtn",
    audio.youvavani,
    "യുവവാണി",
    "08:00 — 08:30"
  );


  programButton(
    "radioNadakamBtn",
    audio.nadakam,
    "റേഡിയോ നാടകം",
    "20:00 — 21:00"
  );


  programButton(
    "ganaParipadiBtn",
    audio.gana,
    "ഗാനപരിപാടി",
    "18:00 — 19:00"
  );


  /* =========================
     HEADSET
  ========================= */

  const headsetSwitch =
    document.getElementById("headsetSwitch");

  if (headsetSwitch) {

    headsetSwitch.addEventListener("click", function () {

      this.classList.toggle("on");

      const span =
        this.querySelector("span");

      if (span) {

        span.textContent =
          this.classList.contains("on")
            ? "ON"
            : "OFF";

      }

    });

  }


  /* =========================
     BULB
  ========================= */

  const warmBulb =
    document.getElementById("warmBulb");

  if (warmBulb) {

    warmBulb.addEventListener("click", function () {

      document.body.classList.toggle("dark-mode");

    });

  }

});
