export default class Rules{
    validMove(prevX,prevY, newX, newY, type, color, gameState){
        // console.log("prev x,y:" + prevX + "," + prevY + " new x,y:" + newX + "," + newY);
        // console.log("type:" + type + " color:" + color);
        //Movement rule
        if(Math.abs(prevX - newX) === 1 && Math.abs(prevY - newY) === 1){
            if(!occupied(gameState, newX, newY) && ((color === "black" && prevY < newY)||(color === "white" && prevY > newY))){
                console.log("valid move");
                return [true, -1, -1];
            }
        }
        //Attack rule
        if(Math.abs(prevX - newX) === 2 && Math.abs(prevY - newY) === 2){
            if(occupied(gameState, newX, newY) || ((color === "black" && prevY > newY)||(color === "white" && prevY < newY))){
                return [false, -1, -1];
            }
            let x;
            let y;
            if(prevX > newX){
                x = prevX-1;
            }
            else {
                x = prevX+1;
            }
            if(prevY > newY){
                y = prevY-1;
            }
            else {
                y = prevY+1;
            }
            if(occupiedByEnemy(gameState,x,y))
            {
                console.log("checked enemy!");
                console.log("valid move");
                return [true, x, y];            
            }
        }
        console.log("invalid move");
        return [false , -1, -1];
    }

}

function occupied(pieces, x, y){
    let occ = false;
    pieces.forEach(p => {
        if(p.x === x && p.y === y){
            occ = true;
        }
    });

    return occ;
}

function occupiedByEnemy(pieces, x, y, myColor){
    let occ = false;
    pieces.forEach(p => {
        if(p.x === x && p.y === y && p.color !== myColor){
            occ = true;
        }
    });

    return occ;
}