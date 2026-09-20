document.addEventListener("DOMContentLoaded", function () {

  const button = document.getElementById("enterBtn");
  const machine = document.getElementById("machine");


  button.addEventListener("click", function () {
    machine.classList.remove("hidden");
    machine.scrollIntoView({ behavior: "smooth" });
  });

});
