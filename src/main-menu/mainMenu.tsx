import { useHistory } from 'react-router-dom';

export function MainMenu(props) {
  const history = useHistory();

  function newGame() {
    history.push('/opening');
  }

  function loadGame() {

  }

  return(
    <div className={'main-menu-container'}>
      <div className={'main-menu-wrapper'}>
        <button className={'main-menu-button'} onClick={newGame}>
          New Game
        </button>
        <button className={'main-menu-button'} onClick={loadGame}>
          Load Game
        </button>
      </div>
    </div>
  );
}
