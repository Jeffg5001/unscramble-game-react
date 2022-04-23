import './App.css';
import GameBoard from './GameBoard';
import './Letter.css';

function App() {
  let word = "hello".toUpperCase().split("")
  console.log(word)
  return (
    <div className="App">
      <header className="App-header">
      SCRAMBLE
      </header>
      <GameBoard/>
    </div>
  );
}

export default App;
