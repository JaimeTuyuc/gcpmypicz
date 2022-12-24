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

export const ModalStylesContainerDelete = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    width: 45%;
    border: 0.5px solid #000;
    padding: 1rem;
    border-radius: 8px;
    background-color: #1a1c1a;
    height: 55%;
    opacity: 0.9;
    display: flex;
    justify-content: center;
    align-items: center;
    @media(max-width: 468px){
        width: 150%;
    }

    @media(max-width: 768px){
        width: 75%;
    }
`;

export const OptionsContainerDelete = styled.div`
    background-color: white;
    width: 70%;
    border-radius: 7px;
    padding: 2rem 1.5rem;

    @media(max-width: 468px){
        width: 100%;
        padding: 2rem 0.5rem;
    }

    @media(max-width: 768px){
        width: 75%;
    }
`;