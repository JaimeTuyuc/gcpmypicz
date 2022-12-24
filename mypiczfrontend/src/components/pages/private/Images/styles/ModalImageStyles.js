import styled from "styled-components";

export const ModalContentContainer = styled.form`
    background-color: white;
`;

export const ImageContainerForm = styled.div`
    padding: 0.5rem 1.5rem;
    position: relative;
    width: auto;
    transition: 0.8s ease all;
`;

export const ButtonClose = styled.div`
    position: absolute;
    top: 0;
    right: 0;

    &:hover{
        cursor: pointer;
        transform: scale(1.1);
    }
`;

export const ImageContent = styled.img`
    width: 200px;
    border: 0.5px solid #000;
`;

const getColor = (props) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isFocused) {
      return '#2196f3';
  }
  return '#eeeeee';
}

export const DragableZoneContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${props => getColor(props)};
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border .24s ease-in-out;
`;