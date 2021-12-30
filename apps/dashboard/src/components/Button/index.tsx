import styled from 'styled-components'

interface ButtonType {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  text: string
}

const Button = ({ text, onClick }: ButtonType) => {
  return <ButtonStyle onClick={onClick}>{text}</ButtonStyle>
}

const ButtonStyle = styled.button`
  display: flex;
  justify-content: center;

  padding: 0.679rem 1.5rem;

  border-radius: 60px;
  background: ${({ theme }) => theme.button.background};

  font-weight: 500;

  font-size: 1rem;

  margin: 0px;

  border: none;
  color: ${({ theme }) => theme.text.main};
  cursor: pointer;

  transition: filter 0.15s ease-out 0s;

  :hover {
    filter: saturate(0.8);
    transition: filter 0.15s ease-out 0s;
  }
`

export default Button
