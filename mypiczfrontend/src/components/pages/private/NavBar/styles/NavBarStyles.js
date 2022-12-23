import styled from "styled-components";

export const BurgerContainer = styled.div`
    color: white;
    &:hover {
        cursor: pointer;
    }
`;

export const MainNavContainer = styled.div`
    background-color: rgba(144,49,170,1);
    opacity: 0.9;
    position: relative;
    display: flex;
    justify-content: space-between; 
    align-items: center;
    padding: 2rem 2.5rem;
`;

export const SideBarContent = styled.div`
    position: absolute;
    background-color: white;
    top: 0;
    right: 0;
    padding: 1rem 2rem;
    padding-top: 2.5rem;
    bottom: 0;
    visibility: ${props => props.out ? 'visible' : 'hidden'};
    width: ${props => props.out ? '30%' : '0'};
    transition: width 2s;
    @media(max-width: 468px){
        width: 50%;
    }
`;

export const OverlayContainer = styled.div`
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const CloseOverlay = styled.div`
    display: flex;
    position: absolute;
    background-color: rgba(0,0,0,0.1); 
    z-index: 2;
    top: 0;
    left: 0;
    height: 100vh;
    width: 70%;
    @media(max-width: 468px){
        width: 50%;
    }
`;