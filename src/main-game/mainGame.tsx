import { Character } from '../character/character';
import { ObstacleCreator } from '../obstacle-creator/obstacleCreator';
import { ITEMS, POINT_GROUPS } from '../helpers/gameObjects';
import { ItemCreator } from '../item-creator/itemCreator';
import { GameObject } from '../endpoints/endpoint.game-object';


export function MainGame(props) {

  GameObject.get().then((result) => {

  });

  let obstacleElements = ObstacleCreator({groups: POINT_GROUPS});
  let itemElements = ItemCreator({items: ITEMS});
  return(
    <div className='main-container'>
      <Character/>
      {obstacleElements}
      {itemElements}
    </div>
  );
}
