import React, { memo } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './style.css';

function Cart(props) {
    const { count } = props;
    return (
        <>
            <div className='cart'>
                <ShoppingCartIcon sx={{
                    color: '#fff',
                    fontSize: '30px'
                }} />
                <span className='count'>
                    {count}
                </span>
            </div>
        </>
    )
}

export default memo(Cart)