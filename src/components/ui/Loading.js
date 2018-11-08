import styled, { keyframes } from "styled-components";
import CircleSvg from "../../icons/circle.svg";

const rotateAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dashAnimation = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -15;
  }

  100% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -120;
  }
`;

export default styled(CircleSvg)`
  animation: ${rotateAnimation} var(--duration-long) linear infinite;
  color: var(--color-green);
  display: block;
  height: var(--size-40);
  position: relative;
  width: var(--size-40);

  circle {
    animation: ${dashAnimation} var(--duration-long) ease-in-out infinite;
    fill: none;
    stroke: currentColor;
    stroke-dasharray: 80, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    stroke-width: var(--corner-radius);
  }
`;
