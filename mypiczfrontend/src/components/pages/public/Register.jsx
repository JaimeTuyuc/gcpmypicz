import React, { useEffect, useState } from 'react'
import img from '../../imgs/bg2.svg'
import img1 from '../../imgs/sea.svg';
import { ContentContainer, GravatarContainer, GravatarImg, LoginContainer, SignUpContainer } from './styles/LoginStyles';
import { FormControl, TextField, Button, Typography, Link } from '@mui/material';
import gravatar from 'gravatar';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { registerNewUser } from '../../../services/userService';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../../features/userSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const { accountCreated } = useSelector((state) => state.user);
    const regex = /^[a-zA-Z0-9./!#$%&'{*+/=?^_`{|}~-]+@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const [userData, setUserData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        avatar: ''
    });
    const { name, lastName, email, password, avatar } = userData;

    const [userError, setUserError] = useState({
        nameE: false,
        lastNameE: false,
        emailE: false,
        passwordE: false
    });
    const { nameE, lastNameE, emailE, passwordE } = userError;

    const [validEmail, setIsValidEmail] = useState(false);
    // Vlidate email
    useEffect(() => {
        const timer = setTimeout(() => {
            if (email !== '') {
                // Validate the the user has only one email
                if (!regex.test(email)) {
                    setIsValidEmail(true)
                } else {
                    setIsValidEmail(false)
                    const gravatarImg = gravatar.url(email, { protocol: 'http', format: 'qr', f: 'y', forcedefault: 'y', d: 'monsterid' }, true);
                    setUserData({ ...userData, avatar: gravatarImg })
                }
            }
        }, 1000)
        return () => {
            clearTimeout(timer);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);

    useEffect(() => {
        if (accountCreated) {
            navigation('/')
        }

        return () => {
            dispatch(userActions.dispatchAccountCreated(null));
            setUserData({
                name: '',
                lastName: '',
                password: '',
                email: '',
                avatar: ''
            });
            setUserError({
                nameE: false,
                lastNameE: false,
                emailE: false,
                passwordE: false
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountCreated])

    const isDisabled = !name || !lastName || !email || !password || password.length < 6 || validEmail; 

    const onSubmitUser = (e) => {
        e.preventDefault();
        dispatch(registerNewUser({ name, lastName, email, password, avatar }));
    }
    
    return (
        <>
            <LoginContainer img={img} img1={img1} />
            <SignUpContainer>
                <ContentContainer
                    onSubmit={onSubmitUser}
                >
                    <Box>
                        <Typography color='violet' fontWeight='bold' textAlign={'center'} marginBottom='10px' variant='h4'>MyPicz</Typography>
                    </Box>
                    {
                        avatar && (
                            <GravatarContainer>
                                <GravatarImg>
                                    <img src={avatar} alt='Gravatar' />
                                </GravatarImg>
                            </GravatarContainer>
                        )
                    }
                    <FormControl
                        fullWidth
                        style={{ marginTop: '10px' }}
                    >
                        <TextField
                            id='name'
                            label='Name'
                            type='text'
                            color='success'
                            value={name}
                            onChange={e => setUserData({ ...userData, name: e.target.value })}
                            onBlur={() => setUserError({ ...userError, nameE: true })}
                            error={nameE && name === ''}
                            helperText={nameE && name === '' && 'Required field *'}
                        />
                    </FormControl>
                    <FormControl
                        fullWidth
                        style={{ marginTop: '10px' }}
                    >
                        <TextField
                            id='lastName'
                            label='Last Name'
                            type='text'
                            color='success'
                            value={lastName}
                            onChange={e => setUserData({ ...userData, lastName: e.target.value })}
                            onBlur={() => setUserError({ ...userError, lastNameE: true })}
                            error={lastNameE && lastName === ''}
                            helperText={lastNameE && lastName === '' && 'Required field *'}
                        />
                    </FormControl>
                    <FormControl
                        fullWidth
                        style={{ marginTop: '10px' }}
                    >
                        <TextField
                            id='email'
                            label='Email address'
                            type='email'
                            color='success'
                            value={email}
                            onChange={e => setUserData({ ...userData, email: e.target.value })}
                            onBlur={() => setUserError({ ...userError, emailE: true })}
                            error={emailE && email === '' ? true : validEmail }
                            helperText={emailE && email === '' ? 'Required field *' : validEmail && 'Enter a valid email' }
                        />
                    </FormControl>
                    <FormControl
                        fullWidth
                        style={{ marginTop: '10px' }}
                    >
                        <TextField
                            id='password'
                            label='Password'
                            type='password'
                            color='success'
                            value={password}
                            onChange={e => setUserData({ ...userData, password: e.target.value })}
                            onBlur={() => setUserError({ ...userError, passwordE: true })}
                            error={passwordE && password === '' ? true : password !== '' && password.length < 6 }
                            helperText={passwordE && password === '' ? 'Required field *' : password && password.length < 6 && 'Needs to be greater than 6 characters'}
                        />
                    </FormControl>

                    <FormControl
                        fullWidth
                        style={{ marginTop: '15px' }}
                    >
                        <Button
                            variant='contained'
                            size='large'
                            disabled={isDisabled}
                            type='submit'
                        >Create Account</Button>
                    </FormControl>
                    <Box marginTop='25px' flexDirection={'row'} display={'flex'}>
                        <Typography variant='body2' marginRight={'5px'} >Already a member? </Typography>
                        <Link
                            component={'button'}
                            variant='body2'
                            onClick={() => navigation('/')}
                        >Login</Link>
                    </Box>
                </ContentContainer>
            </SignUpContainer>
        </>
    )
}

export default Login;