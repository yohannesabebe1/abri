document.addEventListener("DOMContentLoaded", function () {
  const openGiftBtn = document.getElementById("openGift");
  const giftContainer = document.getElementById("giftContainer");
  const giftBox = document.getElementById("giftBox");
  const giftLid = document.querySelector(".gift-lid");
  const friendNameInput = document.getElementById("friendName");
  const displayName = document.getElementById("displayName");
  const friendImage = document.getElementById("friendImage");
  const sadSticker = document.getElementById("sadSticker");
  const friendDescription = document.getElementById("friendDescription");

  // Different images for different names
  const nameToImageMap = {
    abri: "./images/photo_2025-04-18_09-16-30.jpg",
    abrilo: "./images/photo_2025-06-06_13-47-21.jpg",
    abriham: "./images/photo_2025-04-21_13-50-22.jpg",
    abreham: "./images/photo_2025-04-28_08-31-11.jpg",
    ab: "./images/photo_2025-06-01_20-49-48.jpg",
  };

  // Different descriptions for different names
  const nameToDescriptionMap = {
    abri: "Abri, your creativity and humor light up every room! Thanks for always knowing how to make people smile.",
    abrilo:
      "Abrilo, your loyalty and kindness are unmatched. The world is better with you in it!",
    abriham:
      "Abriham, your adventurous spirit is contagious. Thanks for all the amazing memories!",
    abreham:
      "Abreham, your wisdom and compassion inspire everyone around you. You're truly special!",
    ab: "Ab, your energy and enthusiasm are electrifying. Life is never dull with you around!",
  };

  openGiftBtn.addEventListener("click", function () {
    const name = friendNameInput.value.trim();

    if (name === "") {
      alert("Please enter your name first!");
      return;
    }

    // Reset animations
    giftLid.style.animation = "none";
    void giftLid.offsetWidth; // Trigger reflow
    giftLid.style.animation = "";

    // Show the gift container
    giftContainer.style.display = "block";

    // Set the name
    displayName.textContent = name;

    // Set image based on name
    const lowercaseName = name.toLowerCase();

    if (nameToImageMap[lowercaseName]) {
      // Known friend
      friendImage.src = nameToImageMap[lowercaseName];
      friendImage.style.display = "block";
      sadSticker.style.display = "none";
      displayName.classList.remove("not-friend");
      friendDescription.textContent =
        nameToDescriptionMap[lowercaseName] ||
        `${name}, you're an amazing friend! Thanks for being you.`;
    } else {
      // Unknown person
      friendImage.style.display = "none";
      sadSticker.style.display = "block";
      displayName.classList.add("not-friend");
      friendDescription.textContent = `Sorry ${name}, you're not on my friends list. Maybe we should get to know each other better!`;
    }

    // Open the gift
    setTimeout(() => {
      giftBox.classList.add("open");
      if (nameToImageMap[lowercaseName]) {
        createConfetti();
      }
    }, 100);
  });

  function createConfetti() {
    const colors = ["#6c5ce7", "#a29bfe", "#fd79a8", "#e84393", "#00cec9"];

    // Clear existing confetti
    document.querySelectorAll(".confetti").forEach((el) => el.remove());

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.top = -10 + "px";
      confetti.style.width = Math.random() * 10 + 5 + "px";
      confetti.style.height = Math.random() * 10 + 5 + "px";
      confetti.style.animation = `confettiFall ${
        Math.random() * 3 + 2
      }s linear forwards`;
      confetti.style.animationDelay = Math.random() * 2 + "s";
      giftContainer.appendChild(confetti);

      // Remove confetti after animation
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.remove();
        }
      }, 5000);
    }
  }
});
