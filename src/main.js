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

  valueElem.addEventListener("input", () => {
    spinner.progress = valueElem.value;
  });
  animateElem.addEventListener("change", () => {
    spinner.state = animateElem.checked ? "animated" : "normal";
  });
  hideElem.addEventListener("change", (e) =>
    e.target.checked ? (spinner.state = "hidden") : progressElem.append(spinner.elem)
  );
};

document.addEventListener("DOMContentLoaded", initProgressBlockControls);
