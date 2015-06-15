/**
 * Created by aaroncody on 6/13/15.
 */

var CardDeck = function(){
  var suits = [
    {name: 'spades', symbol: '♠', color: 'black'},
    {name: 'hearts', symbol: '♥', color: 'red'},
    {name: 'diamonds', symbol: '♦', color: 'red'},
    {name: 'clubs', symbol: '♣', color: 'black'}
  ],
  numbers = [
    {name: 'Two', symbol: '2'},
    {name: 'Three', symbol: '3'},
    {name: 'Four', symbol: '4'},
    {name: 'Five', symbol: '5'},
    {name: 'Six', symbol: '6'},
    {name: 'Seven', symbol: '7'},
    {name: 'Eight', symbol: '8'},
    {name: 'Nine', symbol: '9'},
    {name: 'Ten', symbol: '10'},
    {name: 'Jack', symbol: 'J'},
    {name: 'Queen', symbol: 'Q'},
    {name: 'King', symbol: 'K'},
    {name: 'Ace', symbol: 'A'}
  ],
  sortedDeck = [],
  mainDeck = [];

  function generate52CardDeck(){
    var cards = [],
        suit = [],
        currentSuit,
        currentNumberl

    for(var s = 0; s < suits.length; s++){
      currentSuit = suits[s];
      for(var n = 0; n < numbers.length; n++){
        currentNumber = numbers[n];
        cards.push({
          name: currentNumber.name + " of " + currentSuit.name,
          value: n + (s * 13) + 2,
          suitValue: n + 1,
          symbol: currentNumber.symbol + currentSuit.symbol,
          verticalSymbol: currentNumber.symbol + "<br>" + currentSuit.symbol,
          color: currentSuit.color
        });
      }
    }
    return cards;
  };

  sortedDeck = generate52CardDeck();
  mainDeck = generate52CardDeck();

  function shuffleCards(deck){
    //I'm not sure how important randomness is in this case, so I'm just going to use lodash.
    mainDeck = _.shuffle(deck);
    return mainDeck;
  }

  function sortCards(deck){
    //I would implement quicksort if I didn't have a handy library like lodash
    mainDeck = _.sortBy(deck, function(card){ return card.value; });
    return mainDeck;
  }

  function sorted52CardDeck(){
    //let's just return something we already know the order and state of
    mainDeck = sortedDeck;
    return mainDeck;
  }

  function getDeck(){
    return mainDeck;
  }

  return {
    getDeck: getDeck,
    shuffleCards: shuffleCards,
    sortCards: sortCards,
    sorted52CardDeck: sorted52CardDeck
  }
};

var cardDeck = CardDeck();
var data = cardDeck.getDeck();

var CardView = function(){
  // tutorial1.js
  var CardTable = React.createClass({
    getInitialState: function() {
      return {data: []};
    },
    handleUpdateData: function(data){
      this.setState({data: data});
    },
    render: function() {
      return (
        <div className="cardTable">
          <Dealer updateData={this.handleUpdateData}/>
          <CardList data={this.state.data} />
        </div>
      );
    }
  }),
  CardList = React.createClass({
    render: function() {
      var cardNodes = this.props.data.map(function (cardData) {
        return (
          <Card key={cardData.value} data={cardData} />
        );
      });
      return (
        <div id="cardtable">
          {cardNodes}
        </div>
      );
    }
  }),
  Card = React.createClass({
    render: function() {
      var spanStyle = {
        color: this.props.data.color
      };
      return (
        <span style={spanStyle} dangerouslySetInnerHTML={{__html: this.props.data.verticalSymbol}}/>
      );
    }
  }),
  Dealer = React.createClass({
    handleDeal: function(){
      this.props.updateData(cardDeck.getDeck());
    },
    handleSort: function(){
      this.props.updateData(cardDeck.sorted52CardDeck());
    },
    handleShuffle: function(){
      this.props.updateData(cardDeck.shuffleCards(cardDeck.getDeck()));
    },
    render: function() {
      return (
        <div id="dealer">
          <button onClick={this.handleDeal}>Deal</button>
          <button onClick={this.handleSort}>Sort</button>
          <button onClick={this.handleShuffle}>Shuffle</button>
        </div>
      );
    }
  });

  React.render(
    <CardTable data={data} />,
    document.getElementById('content')
  );
};


var cardView = CardView();