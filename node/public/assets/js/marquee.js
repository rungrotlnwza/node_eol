const marquees = document.querySelectorAll(".marquee");
marquees.forEach((marquee) => {
  const logos = marquee.innerHTML;
  marquee.innerHTML = logos + logos + logos;

  let speed = 1;
  let position = 0;
  let isPaused = false;

  function animate() {
    if (!isPaused) {
      position -= speed;
      if (position <= -marquee.scrollWidth / 4) {
        position = 0;
      }
      marquee.style.transform = `translateX(${position}px)`;
    }
    requestAnimationFrame(animate);
  }
  setTimeout(() => {
    animate();
  }, 100);
  marquee.addEventListener("mouseenter", () => (isPaused = true));
  marquee.addEventListener("mouseleave", () => (isPaused = false));
});
