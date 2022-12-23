import styled from "styled-components";

export const ModalStylesContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    width: 40%;
    border: 0.5px solid #000;
    padding: 1rem;
    border-radius: 5px;
    background-color: white;
    @media(max-width: 468px){
        width: 90%;
    }

    @media(max-width: 768px){
        width: 70%;
    }
`;