import React from 'react';
import {useSpeechSynthesis} from "react-speech-kit";

function Square({chooseSquare, val, pos}) {
    const {speak} = useSpeechSynthesis();

    return( 
        <div className='square' style={
            {backgroundColor: val === "" ? "white" : (val === "X" ? "green" : "red")}}>
            {val === "" ? <button className="square" onClick={() => {chooseSquare();
            speak({text: `${val} placed on ${pos}`})}} style={{backgroundColor:"white"}}>{pos}</button> :
            val}    
        </div>
    )
}

export default Square;