import { ACTIONS } from './redux/actions';
import { ObstacleCreator } from './obstacle-creator/obstacleCreator';
import { Character } from './character/character';
import { useDispatch, useSelector } from 'react-redux';
import { OBSTACLE_CREATOR_TYPES, OBSTACLE_TEXTURES } from 'Types/obstacleTypes';
import { IItem } from 'Types/item';
import { ItemCreator } from './item-creator/itemCreator';
import { ITEMS, POINT_GROUPS } from './helpers/gameObjects';

export function App() {
  const dispatch = useDispatch();

  window.addEventListener('keydown', function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false);

  let obstacleElements = ObstacleCreator({groups: POINT_GROUPS});
  let itemElements = ItemCreator({items: ITEMS});
  return (
    <div className='main-container'>
      <Character/>
      {obstacleElements}
      {itemElements}
    </div>
    // <Router>
    //   <Switch>
    //     <Route exact path="/" component={Opening}/>
    //     <Route path="/blueprint" component={Blueprint}/>
    //   </Switch>
    // </Router>
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
