import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    
    return (
    <div className="card"> 
        <div className={flipped ? "flipped" : ""}>
         <img className="front" src={card.src} alt="front" />
         <img 
            className="back" 
            src="/img/Cover.png" 
            onClick={handleClick}
            alt="back"
            />
        </div>
      </div>     
    )
}

