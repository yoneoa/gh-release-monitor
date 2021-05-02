import React from 'react'
import PropTypes from 'prop-types'

const Button = ({color, text, onClick}) => {
    return (
        <button onClick={onClick} style={{backgroundColor: color}} className='btn'> {text} </button>
    )
}

Button.defaultProps = {
    color: 'red',
    text: 'DEFAULT TEXT'

}

Button.propTypes = {
    onClick: PropTypes.func,
    color: PropTypes.string,
    text: PropTypes.string
}

export default Button
