import React from 'react';

function Square({chooseSquare, val, pos}) {

    return( 
        <div className='square' style={
            {backgroundColor: val === "" ? "white" : (val === "X" ? "green" : "red")}}>
            {val === "" ? <button className="square" onClick={chooseSquare} style={{backgroundColor:"white"}}>{pos}</button> :
            val}    
        </div>
    )
}

export default Square;