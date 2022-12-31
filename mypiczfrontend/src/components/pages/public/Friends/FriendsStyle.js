import styled from "styled-components";

export const MainFriendsContainer = styled.div`
    display: flex;
    flex-direction: row;

    @media(max-width: 768px){
        flex-direction: column;
    }
`;

export const ContenContainer = styled.div`
    width: 30%;
    @media(max-width: 768px){
        width: 100%;
    }
`;