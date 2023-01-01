import { useState } from 'react';
import './App.css';
import Card from './components/Card.jsx'
import shuffle from './utilities/shuffle';
import { useEffect } from 'react';
import Header from './components/Header.jsx'
import useAppBadge from './hooks/useAppBadge';

function App() {

  const [cards, setCards] = useState(shuffle); // Cards array from Shuffle
  const [pickOne, setPickOne] = useState(null); // 1st Pick
  const [pickTwo, setPickTwo] = useState(null); // 2nd Pick
  const [disabled, setDisabled] = useState(false); // delay handler
  const [wins, setWins] = useState(0);
  const [setBadge, clearBadge] = useAppBadge();

  const handleClick = (card) => {
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  const HandleNewGame = () => {
    clearBadge();
    setWins(0);
    handleTurn();
    setCards(shuffle);
  };

  useEffect(() => {

    let pickTimer;
    if (pickOne && pickTwo) {
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              return { ...card, matched: true };
            } else {
              return card;
            } 
          }); 
        });
        handleTurn();
      }
      else {
        setDisabled(true);
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000)
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };

  }, [cards, pickOne, pickTwo])

  useEffect(() =>{

    const checkWin = cards.filter((card) => !card.matched);
    if(cards.length && checkWin.length < 1 ){
      console.log("You Won");
      setWins(wins + 1);
      setCards(shuffle);
      setBadge();
    }

  },[cards,wins, setBadge]);

  return (
    <>

      <Header HandleNewGame={HandleNewGame} wins={wins} />
      <div className="grid">
        {cards.map((card) => {
          const { image, id, matched } = card;

          return (

            <Card
              key={id}
              image={image}
              onClick={() => handleClick(card)}
              selected={card === pickOne || card === pickTwo || matched}
            />
          );
        })
        }

      </div>
    </>
  );
}

export default App;
