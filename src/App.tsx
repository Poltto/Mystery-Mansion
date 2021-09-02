import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { Opening } from './opening/opening';
import { MainGame } from './main-game/mainGame';
import { MainMenu } from './main-menu/mainMenu';

export function App() {
  const dispatch = useDispatch();

  window.addEventListener('keydown', function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false);


  return (
    <Router>
      <Switch>
        <Route exact={true} path='/' component={MainMenu}/>
        <Route exact={true} path='/opening' component={Opening}/>
        <Route path='/main' component={MainGame}/>
      </Switch>
    </Router>
  );

  function generateGrid() {
    let grid = [];
    for(let i = 0; i < 100; i++) {
      for(let j = 0; j < 100; j++) {
        grid.push({x: i, y: j});
      }
    }
    return grid;
  }
}
