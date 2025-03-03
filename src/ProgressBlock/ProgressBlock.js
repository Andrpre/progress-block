const STATE = {
  ANIMATED: "animated",
  NORMAL: "normal",
  HIDDEN: "hidden",
};

export default class ProgressBlock {
  #progress = 60;
  #state = STATE.NORMAL;
  #elem;
  #animation;
  #className;
  #color;
  #strokeSize;
  #speedRate;

  constructor({ className = "progress-block", color = {}, strokeSize = 8, speedRate = 1000 } = {}) {
    this.#className = className;
    this.#color = {
      spinner: color.spinner || "#005DFF",
      spinnerBg: color.spinnerBg || "#EEF3F6",
    };
    this.#strokeSize = strokeSize;
    this.#speedRate = speedRate;

    this.#render();
    this.progress = this.#progress;
    this.state = this.#state;
  }

  set progress(value) {
    this.#progress = Math.max(0, Math.min(100, value));
    this.#updateProgress();
  }

  set state(value) {
    if (!Object.values(STATE).includes(value)) {
      throw new Error(`Invalid state: ${value}`);
    }

    this.#state = value;

    switch (value) {
      case STATE.ANIMATED:
        this.#startAnimation();
        break;
      case STATE.NORMAL:
        this.#stopAnimation();
        break;
      case STATE.HIDDEN:
        this.#removeElement();
        break;
    }
  }

  get elem() {
    return this.#elem;
  }

  get progress() {
    return this.#progress;
  }

  get state() {
    return this.#state;
  }

  #render() {
    const wrapper = document.createElement("div");
    const radius = 50 - this.#strokeSize / 2;

    wrapper.innerHTML = `
      <svg class="${this.#className}" viewBox="0 0 100 100">
        <circle class="${this.#className}-spinner-bg" cx="50" cy="50" r="${radius}" stroke-width="${
      this.#strokeSize
    }"></circle>
        <circle
          class="${this.#className}-spinner"
          cx="50"
          cy="50"
          r="${radius}"
          stroke-width="${this.#strokeSize}"
        ></circle>
      </svg>
      `;

    this.#elem = wrapper.firstElementChild;
    this.#applyStyles();
  }

  #applyStyles() {
    if (!this.#elem) return;

    const bgProgress = this.#elem.querySelector(`.${this.#className}-spinner-bg`);
    const progress = this.#elem.querySelector(`.${this.#className}-spinner`);

    Object.assign(bgProgress.style, {
      fill: "none",
      stroke: this.#color.spinnerBg,
    });
    Object.assign(progress.style, {
      fill: "none",
      stroke: this.#color.spinner,
      transition: "stroke-dashoffset 0.3s ease",
    });

    this.#elem.style.transform = "rotate(-90deg)";
  }

  #updateProgress() {
    if (!this.#elem) return;

    const circle = this.#elem.querySelector(`.${this.#className}-spinner`);
    const radius = circle.getAttribute("r");
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (this.#progress / 100) * circumference;

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = offset;
  }

  #startAnimation() {
    if (this.#animation || !this.#elem) return;

    this.#animation = this.#elem.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      {
        duration: this.#speedRate,
        iterations: Infinity,
        easing: "linear",
      }
    );
  }

  #stopAnimation() {
    if (!this.#animation) return;

    this.#animation.cancel();
    this.#animation = null;
  }

  #removeElement() {
    if (!this.#elem) return;

    this.#elem.remove();
  }
}
