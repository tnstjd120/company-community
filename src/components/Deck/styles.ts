import styled from "@emotion/styled";

export const DeckContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const DeckGrid = styled.div`
  width: 100%;
  height: calc(100vh - 240px);
  max-height: calc(100vh - 240px);
  overflow-y: auto;
  display: grid;
  gap: 20px;
  padding: 20px;
  grid-template-rows: repeat(6, 1fr);

  @media screen and (min-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (min-width: 1400px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media screen and (min-width: 1920px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

export const DeckHeader = styled.div`
  width: 100%;
  min-height: 50px;
  padding: 8px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: opacity 0.3s;

  &[data-opacity="true"] {
    opacity: 0;
  }
`;

export const DeckFooter = styled.div`
  width: 100%;
  min-height: 50px;
  padding: 8px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
