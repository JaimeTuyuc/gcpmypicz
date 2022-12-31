import { Button, FormControl, Link, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import img1 from '../../imgs/sea.svg';
import bg from '../../imgs/bg.svg';
import { ContentContainer, LoginContainer, SignUpContainer } from './styles/LoginStyles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserService } from '../../../services/userService';
import { useEffect } from 'react';
import { userActions } from '../../../features/userSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.user);
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    });
    const { email, password } = userInfo;
    const [userError, setUserError] = useState({
        emailE: false,
        passwordE: false
    })
    const { emailE, passwordE } = userError;
    useEffect(() => {
        if (isLoggedIn) {
            // navigate('/app')
            navigate('/app')
        }
        return () => {
            setUserInfo({
                email: '',
                password: ''
            });
            setUserError({
                emailE: false,
                passwordE: false
            })
            setTimeout(() => {
                dispatch(userActions.dispatchLoggedSuccess(null));
            }, 1500)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])
    const loginUser = (e) => {
        e.preventDefault();
        dispatch(loginUserService({ email, password }));
    }
    return (
        <>
            <LoginContainer img={bg} img1={img1} />
            <SignUpContainer>
                <ContentContainer
                    onSubmit={loginUser}
                >
                    <Box>
                        <Typography color='violet' fontWeight='bold' textAlign={'center'} marginBottom='10px' variant='h4'>MyPicz</Typography>
                    </Box>

                    <FormControl
                        fullWidth
                        style={{ marginTop: '10px' }}
                    >
                        <TextField
                            required
                            id='email'
                            label='Email address'
                            type='email'
                            color='success'
                            value={email}
                            onChange={e => setUserInfo({ ...userInfo, email: e.target.value })}
                            onBlur={() => setUserError({ ...userError, emailE: true })}
                            error={emailE && email === '' }
                            helperText={emailE && email === '' && 'Required field *' }
                        />
                    </FormControl>
                    <FormControl
                        fullWidth
                        style={{ marginTop: '10px' }}
                    >
                        <TextField
                            required
                            id='password'
                            label='Password'
                            type='password'
                            color='success'
                            value={password}
                            onChange={e => setUserInfo({ ...userInfo, password: e.target.value })}
                            onBlur={() => setUserError({ ...userError, passwordE: true })}
                            error={passwordE && password === '' }
                            helperText={passwordE && password === '' && 'Required field *'}
                        />
                    </FormControl>
                    <FormControl
                        fullWidth
                        style={{ marginTop: '30px' }}
                    >
                        <Button
                            variant='contained'
                            size='large'
                            // disabled={isDisabled}
                            type='submit'
                            color='secondary'
                        >Login</Button>
                    </FormControl>

                    <Box marginTop='35px' flexDirection={'row'} display={'flex'} justifyContent='flex-end'>
                        <Typography variant='body2' marginRight={'5px'} >Don't have an account?</Typography>
                        <Link
                            component={'button'}
                            variant='body2'
                            onClick={() => navigate('/register')}
                        >Create Account</Link>
                    </Box>
                </ContentContainer>
            </SignUpContainer>
        </>
    )
}

export default Login;