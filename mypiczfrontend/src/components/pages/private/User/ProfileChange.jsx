import React from 'react';
import { Button, FormControl, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { ActionButtonsContainer, InputContainer, MainContainerForm } from './styles/UserStyles';

const ProfileInputChange = ({value, disabledEdit, onValueChange, onClickValue, onCancelEdit, isEditable, defaultV, submitHandlerEdition, idValue, multiline = false, rows}) => {
    return (
        <>
            <FormControl
                fullWidth
                style={{ display: 'flex', flexDirection: 'row', marginTop: '15px' }}
            >
                <MainContainerForm>
                    <InputContainer>
                        <TextField
                            fullWidth
                            id="filled-read-only-input"
                            label={defaultV}
                            value={value}
                            disabled={disabledEdit}
                            // variant="filled"
                            sx={{marginRight: '15px'}}
                            onChange={onValueChange}
                            size='small'
                            multiline={multiline}
                            rows={rows}
                        />
                    </InputContainer>
                    <ActionButtonsContainer>
                        {
                            disabledEdit && isEditable && (
                                <Button
                                    variant='outlined'
                                    color='secondary'
                                    startIcon={<EditIcon />}
                                    onClick={onClickValue}
                                >Edit</Button>
                            )
                        }
                        {
                            !disabledEdit && (
                                <>
                                    <Button
                                        // fullWidth
                                        variant='outlined'
                                        color='secondary'
                                        endIcon={<CancelIcon />}

                                        onClick={() => { onClickValue();  onCancelEdit()}}
                                    >Cancel</Button>
                                <Button
                                        // fullWidth
                                        variant='contained'
                                        color='secondary'
                                        endIcon={<SaveIcon />}
                                        type='submit'
                                        sx={{marginX: '15px'}}
                                        onClick={() => submitHandlerEdition(value,idValue)}
                                    >Save</Button>
                                </>
                            )
                        }
                    </ActionButtonsContainer>
                </MainContainerForm>
            </FormControl>
        </>
    )
}

export default ProfileInputChange;