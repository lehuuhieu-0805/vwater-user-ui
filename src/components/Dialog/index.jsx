import { Box, Dialog, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import './style.css'

function DialogCustom(props) {
    const {
        visible,
        modal,
        isDialogFooter,
        isCloseIcon,
        headerContent = '',
        bodyHeaderFontsize = '17px',
        bodyHeaderColor = '#333',
        bodyHeaderFontWeight = '500',
        bodyFooterFontsize = '17px',
        bodyFooterFontWeight = '500',
        bodyFooterColor = '#333',
        bodyHeaderContent = '',
        bodyContent = '',
        bodyContentFontsize = '17px',
        bodyContentFontweight = '500',
        bodyContentColor = '#333',
        bodyFooterContent = '',
        onClose,
        onConfirmed,
        isCustomContent = false,
    } = props;

    return (
        <Dialog
            open={visible}
            modal={modal.toString()}
        >
            <Box className='dialog-container'>
                <Box className='dialog-header'>
                    <Box className='dialog_header-content'>
                        <Typography sx={{
                            fontSize: '16px',
                            fontWeight: '700'
                        }}>
                            {headerContent}
                        </Typography>
                        {isCloseIcon && <Box onClick={onClose} className='dialog_header-icon'>
                            <CloseIcon sx={{
                                color: '#aaa',
                                width: '100%',
                                height: '100%'
                            }} />
                        </Box>}
                    </Box>
                </Box>
                <Box className='dialog-body'>
                    <Box className='dialog_body-header'>
                        <Typography
                            sx={{
                                fontSize: bodyHeaderFontsize,
                                fontWeight: bodyHeaderFontWeight,
                                color: bodyHeaderColor
                            }}
                        >
                            {bodyHeaderContent}
                        </Typography>
                    </Box>
                    <Box className='dialog_body-content'>
                        {!isCustomContent && <Typography
                            sx={{
                                fontSize: bodyContentFontsize,
                                fontWeight: bodyContentFontweight,
                                color: bodyContentColor
                            }}
                        >
                            {bodyContent}
                        </Typography>}
                    </Box>
                    {isCustomContent && bodyContent}

                    <Box className='dialog_body-footer'>
                        <Typography
                            sx={{
                                fontSize: bodyFooterFontsize,
                                fontWeight: bodyFooterFontWeight,
                                color: bodyFooterColor
                            }}
                        >
                            {bodyFooterContent}
                        </Typography>
                    </Box>
                </Box>
                {isDialogFooter && (
                    <Box className='dialog-footer'>
                        <div onClick={() => onConfirmed(false)} className='btn btn-cancel'>
                            Không
                        </div>
                        <div onClick={() => onConfirmed(true)} className='btn btn-yes'>
                            Đồng ý
                        </div>
                    </Box>
                )}
            </Box>
        </Dialog>
    )
}

export default DialogCustom