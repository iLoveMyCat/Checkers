import { useEffect, useRef, useState } from 'react';
import './Checkerboard.css';
import Tile from './Tile';
import Rules from './Rules';

const horizontalAxis = ["a","b","c","d","e","f","g","h"];
const verticalAxis = ["1","2","3","4","5","6","7","8"];

const rules = new Rules();

class Piece {
    constructor(image, x, y, type, color) {
      this.image = image;
      this.x = x;
      this.y = y;
      this.type = type;
      this.color = color;
    }
}

const initialBoardState = [];

for(let y = 0; y<8; y++){
    for(let x = 0; x<8; x++){
        if((y === 0 || y === 2) && (x % 2 !== 0)){
            initialBoardState.push(new Piece("assets/images/regular-black-piece.png", x, y, "regular", "black"));
        }
        if((y === 1) &&  (x === 0 || x % 2 === 0)){
            initialBoardState.push(new Piece("assets/images/regular-black-piece.png", x, y, "regular", "black"));
        }
        if((y === 5 || y === 7) && (x === 0 || x % 2 === 0)){
            initialBoardState.push(new Piece("assets/images/regular-white-piece.png", x, y, "regular", "white"));
        }
        if((y === 6) && (x % 2 !== 0) ){
            initialBoardState.push(new Piece("assets/images/regular-white-piece.png", x, y, "regular", "white"));
        }
    }
}
        
const Checkerboard = () => {
    const [checkerboardLeft, setCheckerboardLeft] = useState(0);
    const [checkerboardTop, setCheckerboardTop] = useState(0);
    const [pieces, setPieces] = useState(initialBoardState);
    const [grabX, setGrabX] = useState(0);
    const [grabY, setGrabY] = useState(0);
    const [activePiece, setActivePiece] = useState(null);
    const checkerboardRef = useRef(null);

    useEffect(()=>{
        handleResize();
    }, []) 
    
    function handleResize() {
        let checkerboard = checkerboardRef.current;
        if(checkerboard){
            setCheckerboardLeft(checkerboard.getBoundingClientRect().left);
            setCheckerboardTop(checkerboard.getBoundingClientRect().top);
        }
    }
    
    window.addEventListener('resize', handleResize)

    function dropPiece(e){
        if(activePiece){
            const dropX = Math.floor((e.clientX - checkerboardLeft)/80);
            const dropY = Math.floor((e.clientY - checkerboardTop)/80);
            
            setPieces((val) => {
                let pieces = val.map(p=>{
                    if(p.x === grabX && p.y === grabY){
                        if(true){
                            p.x = dropX;
                            p.y = dropY;
                        }
                    }
                    return p;
                });

                return pieces;
            })

            e.target.classList.remove("picked-up");
            setActivePiece(null);
        }
    }
    
    function grabPiece(e){
        let checkerboard = checkerboardRef.current;
        console.log("grabPiece func");
        if(e.target.classList.contains("chess-piece") && checkerboard){
            console.log("grabbed:" + e.target.classList);
            e.target.classList.add("picked-up");
            setActivePiece(e.target);
            var grabX = Math.floor((e.clientX - checkerboard.getBoundingClientRect().left)/80);
            var grabY = Math.floor((e.clientY-checkerboard.getBoundingClientRect().top)/80);
            setGrabX(grabX);
            setGrabY(grabY);
        }
        console.log("grab x,y: ",grabX,grabY);   
    }

    function movePiece(e){
        const checkerboard = checkerboardRef.current;
        const boardRect = checkerboard.getBoundingClientRect();
        if(activePiece && checkerboard){
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            activePiece.style.position = 'absolute';
            activePiece.style.left = `${x}px`;
            activePiece.style.top = `${y}px`;
            
            
            const minX = parseInt(boardRect.x-30);
            const maxX = parseInt(boardRect.right - 67);
            const absDiffMaxX = Math.abs(maxX - x);
            const absDiffMinX = Math.abs(minX - x);
            if(absDiffMaxX > absDiffMinX){
                if(x < minX){
                    activePiece.style.left = `${minX}px`;
                }
                else{
                    activePiece.style.left =  `${x}px`;
                }
            } else {
                if(x > maxX){
                    activePiece.style.left = `${maxX}px`;
                }
                else{
                    activePiece.style.left =  `${x}px`;
                }
            }            
            
            const minY = boardRect.y -25;
            const maxY = boardRect.bottom-75;
            const absDiffMaxY = Math.abs(maxY - y);
            const absDiffMinY = Math.abs(minY - y);
            if(absDiffMaxY > absDiffMinY){
                if(y < minY){
                    activePiece.style.top = `${minY}px`;
                }
                else{
                    activePiece.style.top =  `${y}px`;
                }
            } else {
                if(y > maxY){
                    activePiece.style.top = `${maxY}px`;
                }
                else{
                    activePiece.style.top =  `${y}px`;
                }
            }
        }
    }

    let board = [];
    for(let x = 0; verticalAxis.length > x; x++){
        for(let j = 0; horizontalAxis.length > j; j++){
            const idxSum = x+j+2;
            let image = undefined;
            pieces.forEach(p=>{
                if(j === p.x && x === p.y){
                    image = p.image;
                }
            })
            board.push(<Tile key={x+","+j} num={idxSum} image={image}/>);     
        } 
    }
    return (
        <div 
            onMouseMove={e => movePiece(e)} 
            onMouseDown={e => grabPiece(e)} 
            onMouseUp={e=> dropPiece(e)} 
            id="checkerboard" 
            ref={checkerboardRef}
        >
            {board}
        </div>
    )
}

export default Checkerboard