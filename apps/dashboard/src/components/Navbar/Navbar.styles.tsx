import styled from 'styled-components';

export const NavBarContainer = styled.nav`
  max-width: 1280px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 4rem;

  margin: 0px auto;

  padding: 24px 40px;
`;

export const NavBarItems = styled.div`
  display: flex;
  align-items: center;

  .navBarLinks {
    display: flex;
    margin-right: 1.5rem;
  }

  @media (max-width: 768px) {
    .navBarLinks {
      display: none;
    }
  }
`;

export const Item = styled.div`
  margin-right: 1.875rem;
  align-self: center;

  color: ${({ theme }) => theme.text.secondary};

  font-size: 1rem;
  cursor: pointer;

  :hover {
    color: rgb(242, 244, 251);
    transition: 150ms ease-out;
    -webkit-transition: 150ms ease-out;
    transition: color 0.15s ease-out 0s;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;

  box-sizing: border-box;

  border: 0;

  cursor: pointer;

  div {
    display: inline-block;
    position: relative;

    font-weight: 700;
    font-size: 1.875rem;

    color: rgb(256, 256, 256, 1);
  }

  div:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.base.accent};
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  div:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;
