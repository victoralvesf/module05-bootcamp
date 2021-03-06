import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }

  input:valid,
  input:focus {
    border: 1px solid #7159c1;
  }
`;

const rotate = keyframes`
  from: {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const ErrorSmall = styled.small`
  color: red;
  padding: 3px;
`;

export const List = styled.ul`
  color: #555;
  text-decoration: none;
  list-style: none;
  font-size: 16px;
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #7159c1;
  }

  li {
    padding: 10px 15px;
    width: 98%;
    border-bottom: 1px solid rgba(113, 89, 193, 0.1);
    /* border-radius: 5px; */
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 1px 3px rgba(113, 89, 193, 0.3);

    a {
      border: 1px solid #7159c1;
      padding: 5px 15px;
      border-radius: 5px;
      color: #7159c1;
      text-decoration: none;
    }

    a:hover {
      background: #7159c1;
      color: #fff;
    }
  }
`;
