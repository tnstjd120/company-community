import styled from "@emotion/styled";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  width: 100%;
  min-width: 200px;
  transition: opacity 0.3s;
  cursor: pointer;

  perspective: 1000px;
  transform-style: preserve-3d;
  width: 100%;
  min-width: 200px;
  height: 200px;
  position: relative;
`;

export const CardFront = styled.div`
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  outline: 1px solid #ddd;
  border-radius: 8px;
  transition: ouline 0.4s;

  &[data-active="true"] {
    outline: 2px solid #0078fe;
    background-color: #0078fe10;
  }

  :hover {
    outline: 2px solid royalblue;
  }

  figure {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      max-width: 120px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;

export const CardBack = styled.div`
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotateY(180deg);
  border-radius: 4px;
  background-color: royalblue;

  .qtLogo {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    border: 10px solid #fff;
    border-radius: 50%;
    background-color: royalblue;

    ::before {
      content: "";
      position: absolute;
      right: -16px;
      bottom: -16px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: #fff;
    }
  }
`;
