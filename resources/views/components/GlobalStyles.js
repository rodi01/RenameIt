import styled, { css } from 'styled-components'

export const defaultPadding = '24px'

export const InputMargin = '20px'

export const ButtonStyles = css`
  height: 24px;
  background-color: ${(props) => props.theme.button.bgColor};
  border: 1px solid ${(props) => props.theme.button.border};
  color: ${(props) => props.theme.button.color};
  border-radius: 4px;
  padding: 0 12px;
  letter-spacing: -0.07px;

  &:active {
    background-color: ${(props) => props.theme.button.bgActive};
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.5;
  }
`

export const LabelStyles = css`
  font-size: 14px;
  letter-spacing: -0.08px;
  align-self: center;
`

export const StyledH3 = styled.h3`
  font-weight: normal;
  text-transform: uppercase;
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.92px;
`

export const Button = styled.button`
  ${ButtonStyles};
`
export const SecondaryButton = styled(Button)`
  font-size: 12px;
  border-radius: 12px;
  font-weight: 500;
  padding: 0 16px;
  color: ${(props) => props.theme.secondaryButton.textColor};
  border-color: ${(props) => props.theme.secondaryButton.borderColor};
`

export const SubmitButton = styled(SecondaryButton)`
  border: 0;
  color: ${(props) => props.theme.CTAButton.textColor};
  background-color: ${(props) => props.theme.CTAButton.bgColor};
  &:active {
    background-color: ${(props) => props.theme.CTAButton.bgActive};
  }
`

export const Footer = styled.div`
  display: flex;
  margin-top: auto;
  justify-content: flex-end;
  button {
    margin-left: 12px;
  }
`

export const inputCss = css`
  background: ${(props) => props.theme.input.background};
  padding: 0 8px;
  border-radius: 4px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.input.border};
  color: ${(props) => props.theme.input.color};
  margin-left: 8px;
  font-size: 13px;
  letter-spacing: -0.08px;
  flex-grow: 1;
  margin-right: 8px;
  -webkit-user-select: auto;
  user-select: auto;

  &[type='number'] {
    width: 50px;
    flex-grow: 0;
    padding-right: 2px;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.input.borderActive};
  }
`

export const StyledInput = styled.input`
  ${inputCss}
`
