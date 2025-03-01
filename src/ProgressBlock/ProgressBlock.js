export default class ProgressBlock {
  elem = null;
  #animation = null;

  constructor() {
    this.#render();
    this.progress = 30;
    this.state = "animated";
  }

  set progress(percent) {
    const circle = this.elem.querySelector(".progress-block-spinner");
    const radius = circle.getAttribute("r");
    const circumference = 2 * Math.PI * radius;

    if (percent < 1) percent = 0;
    if (percent > 100) percent = 100;

    const offset = circumference - (percent / 100) * circumference;

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = offset;
  }

  set state(state) {
    switch (state) {
      case "animated":
        if (!this.#animation) {
          this.#animation = this.elem.animate(
            [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
            {
              duration: 1000,
              iterations: Infinity,
              easing: "linear",
            }
          );
        }
        break;

      case "normal":
        if (this.#animation) {
          this.#animation.cancel();
          this.#animation = null;
        }
        break;

      case "hidden":
        if (this.elem.parentNode) {
          this.elem.remove();
        }
        break;

      default:
        break;
    }
    this.elem.dataset.state = state;
  }

  #render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <svg class="progress-block" viewBox="0 0 100 100">
        <circle class="progress-block-spinner-bg" cx="50" cy="50" r="46" stroke-width="8"></circle>
        <circle
          class="progress-block-spinner"
          cx="50"
          cy="50"
          r="46"
          stroke-width="8"
        ></circle>
      </svg>
      `;

    this.elem = wrapper.firstElementChild;

    const bgProgress = this.elem.querySelector(".progress-block-spinner-bg");
    Object.assign(bgProgress.style, {
      fill: "none",
      stroke: "#EEF3F6",
    });

    const progress = this.elem.querySelector(".progress-block-spinner");
    Object.assign(progress.style, {
      fill: "none",
      stroke: "#005DFF",
      transition: "stroke-dashoffset 0.3s ease",
    });

    this.elem.style.transform = "rotate(-90deg)";
  }
}
