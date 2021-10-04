import "./Tile.css";

const Tile = ({num, image}) => {

    if(num % 2 === 0){
        return <div className="tile black-tile">{image && <img draggable={false}  alt="" className="chess-piece" src={image}/>}</div>
    }
    else{
        return <div className="tile white-tile">{image && <img draggable={false}  alt="" className="chess-piece" src={image}/>}</div>
    }
}

export default Tile