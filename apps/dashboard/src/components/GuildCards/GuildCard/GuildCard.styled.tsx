import styled from "styled-components";

export const GuildCardWrapper = styled.div`
  --Card-Width: 100%;
  --Card-Height: 100%;

  height: 220px;

  background-color: red;
  display: flex;
  flex-direction: column;

  margin: 1rem 1rem;
`;

export const GuildBackground = styled.div`
  position: relative;

  width: var(--Card-Width);
  height: var(--Card-Height);
`;

export const GuildTag = styled.div`
  /* background-color: green;
  width: 100%;
  height: 75%; */
`;
