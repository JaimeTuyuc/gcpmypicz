import styled from "styled-components";

export const MainCardContainer = styled.div`
    padding: 1rem;
    width: max-content;
`;

export const CardImageContainer = styled.div`
    background-color: rgba(144,49,170,1);
    width: 160px;
    height: 160px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem;
    position: relative;
`;

export const ImageCard = styled.img`
    width: 140px;
    height: 140px;
    border-radius: 50%;
    object-fit: cover;
`;

export const ButtonEditImage = styled.div`
    position: absolute;
    color: rgba(144,49,170,1);
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover{
        cursor: pointer;
    }
`;

export const InputContainer = styled.div`
    width: 50%;

    @media(max-width: 768px){
        width: 100%;
    }
`;

export const MainContainerForm = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    @media(max-width: 768px){
        flex-direction: column;
    }
`;

export const ActionButtonsContainer = styled.div`
    margin: 0 1rem;
    @media(max-width: 768px){
        margin: 0.5rem 0;
    }
`;