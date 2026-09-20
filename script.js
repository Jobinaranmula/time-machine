document.addEventListener("DOMContentLoaded", () => {

  const enter = document.getElementById("enterBtn");
  const machine = document.getElementById("machine");

  console.log("TIME MACHINE SCRIPT LOADED");
  console.log("ENTER:", enter);
  console.log("MACHINE:", machine);

  if (!enter) {
    console.error("enterBtn NOT FOUND");
    return;
  }

  if (!machine) {
    console.error("machine NOT FOUND");
    return;
  }

  enter.addEventListener("click", () => {

    console.log("TIME MACHINE BUTTON CLICKED");

    machine.classList.remove("hidden");

    machine.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});
