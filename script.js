document.addEventListener("DOMContentLoaded", function () {

  const enterBtn = document.getElementById("enterBtn");
  const machine = document.getElementById("machine");

  if (enterBtn && machine) {
    enterBtn.addEventListener("click", function () {
      machine.classList.remove("hidden");

      machine.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }

});
