import styled from 'styled-components';

export const LoginContainer = styled.div`
    background-image: url(${props => props.img});
    background-repeat: repeat;
    position: fixed;
    top: 0;
    left: 0;
    width: 130%;
    height: 200%;
    translate: 0% -50%;

    @media(max-width: 768px){
        background-image: url(${props => props.img1});
        background-repeat: repeat-y;
        width: 100%;
        bottom: 0;
    }

    @keyframes cloudsA {
        100% {
            translate: -10vw -55%;
            scale: 1 1.1;
        }
    }
`;

export const SignUpContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    opacity: 0.8;
    background-color: white;
    @media(max-width: 468px){
        width: 100%;
        opacity: 0.7;
    }
`;

export const ContentContainer = styled.form`
    width: 70%;
    z-index: 10;
    @media(max-width: 468px){
        width: 90%;
    }
`;

export const GravatarContainer = styled.div`
    justify-content: center;
    display: flex;
`;

export const GravatarImg = styled.div`
    border-radius: 50%;
    margin-bottom: 15px;
`;