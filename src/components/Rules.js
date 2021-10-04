export default class Rules{
    validMove(prevX,prevY, newX, newY, type, color, gameState){
        console.log("prev x,y:" + prevX + "," + prevY);
        console.log("new x,y:" + newX + "," + newY);
        console.log("type:" + type);
        console.log("color:" + color);
        if(prevX !== newX || prevY !== newY){
            if(type === "pawn"){
                if(color === "white"){
                    if(prevY > newY){
                        if(newX === prevX && prevY === 6 && (prevY - newY) === 2){
                            if(!occupied(gameState, newX, newY) && !occupied(gameState, newX, newY+1)) {
                                return true;
                            }
                        }
                        if(newX === prevX &&  prevY - newY === 1){
                                if(!occupied(gameState, newX, newY)) {
                                    return true;
                                }
                            }
                        }
                    }
                    if(color === "black"){
                        if(prevY < newY){
                            if(newX === prevX && prevY === 1 && (newY - prevY === 2) ){
                                if(!occupied(gameState, newX, newY) && !occupied(gameState, newX, newY-1)){
                                    return true;
                                }
                            }
                            if(newX === prevX && newY - prevY < 2){
                                if(!occupied(gameState, newX, newY))
                                return true;
                            }
                        }
                    }
                }
        }
        return false;
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