import styled from "styled-components"

// eslint-disable-next-line import/prefer-default-export
export const Button = styled.button`
  height: 24px;
  background-color: ${props => props.theme.button.bgColor};
  border: 1px solid ${props => props.theme.button.border};
  color: ${props => props.theme.button.color};
  border-radius: 4px;
  padding: 0 12px;

  &:active {
    background-color: ${props => props.theme.button.bgActive};
  }
  &:focus {
    outline: none;
  }
`
export const SecondaryButton = styled(Button)`
  border-radius: 12px;
  font-weight: 500;
  color: ${props => props.theme.secondaryButton.textColor};
  border-color: ${props => props.theme.secondaryButton.borderColor};
`

export const SubmitButton = styled(SecondaryButton)`
  border: 0;
  color: ${props => props.theme.CTAButton.textColor};
  background-color: ${props => props.theme.CTAButton.bgColor};
`

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  button { margin-left: 12px }
`
