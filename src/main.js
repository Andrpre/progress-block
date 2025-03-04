import "./style.scss";
import ProgressBlock from "./ProgressBlock/ProgressBlock.js";

const initProgressBlockControls = () => {
  const wrapperElem = document.querySelector(".wrapper");
  const progressElem = wrapperElem.querySelector(".progress");
  const valueElem = wrapperElem.querySelector("#input-value");
  const animateElem = wrapperElem.querySelector("#checkbox-animate");
  const hideElem = wrapperElem.querySelector("#checkbox-hide");

  const spinner = new ProgressBlock();

  progressElem.append(spinner.elem);

  valueElem.addEventListener("input", (e) => {
    const inputValue = e.target.value.trim();
    let value = parseInt(inputValue, 10) || 0;

    value = Math.max(0, Math.min(100, value));

    e.target.value = value;
    spinner.progress = value;
  });
  animateElem.addEventListener("change", (e) => {
    spinner.state = e.target.checked ? "animated" : "normal";
  });
  hideElem.addEventListener("change", (e) =>
    e.target.checked ? (spinner.state = "hidden") : progressElem.append(spinner.elem)
  );
};

initProgressBlockControls();
