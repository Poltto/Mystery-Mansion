import { ACTIONS } from './redux/actions';
import { ObstacleCreator } from './obstacle-creator/obstacleCreator';
import { Character } from './character/character';
import { useDispatch, useSelector } from 'react-redux';
import { OBSTACLE_CREATOR_TYPES, OBSTACLE_TEXTURES } from 'Types/obstacleTypes';
import { IItem } from 'Types/item';
import { ItemCreator } from './item-creator/itemCreator';

export function App() {
  const dispatch = useDispatch();

  window.addEventListener('keydown', function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false);

  let items: IItem[] = [
    {
      id: 1,
      name: 'First Item',
      isInInventory: false,
      onInteract: (interactedItems: IItem[]) => {
        let action = ACTIONS.ITEM_ACTIONS.PICK_UP_ITEM(interactedItems.map(item => item.id));
        dispatch(action);
      },
      position: {
        x: 2,
        y: 2
      },
      image: '/images/grandma_walking_up_1.png'
    },
    {
      id: 2,
      name: 'Second Item',
      isInInventory: false,
      onInteract: (interactedItems: IItem[]) => {
        let action = ACTIONS.ITEM_ACTIONS.PICK_UP_ITEM(interactedItems.map(item => item.id));
        dispatch(action);
      },
      position: {
        x: 3,
        y: 3
      },
      image: '/images/grandma_walking_down_1.png'
    },
    {
      id: 3,
      name: 'Third item',
      isInInventory: false,
      onInteract: (interactedItems: IItem[]) => {
        return;
      },
      position: {
        x: 9999,
        y: 9999
      },
      image: '/images/grandma_walking_left_1.png'
    }
  ];

  let pointGroups = [
    // {
    //   type: 'line',
    //   points:[{x: 4, y: 15}, {x: 8, y: 3}]
    // },
    // {
    //   type: 'line',
    //   points: [{x: 0, y: 1}, {x: 9, y: 2}]
    // },
    // {
    //   type: OBSTACLE_TYPES.Point,
    //   isBlocking: true,
    //   image: '/images/wood_floor_1.png',
    //   points: [{x: 15, y: 15}],
    //   onInteract: () => {
    //     let action = {
    //       type: ACTIONS.DIALOG_ACTIONS.ENUMS.OPEN_DIALOG,
    //       payload: {
    //         header: '<div>Test header new</div>',
    //         content: '<div>Test content new</div>',
    //         footer: undefined,
    //         onSubmit: () => {
    //           return new Promise((resolve, reject) => {
    //             console.log("You closed the dialog!");
    //             resolve('OK');
    //           });
    //         }
    //       }
    //     };
    //     dispatch(action);
    //   }
    // },
    // {
    //   type: OBSTACLE_TYPES.Plane,
    //   isBlocking: true,
    //   image: '/images/wood_floor_1.png',
    //   points: [{x: 0, y:5}, {x: 5, y: 5}, {x: 5, y: 10}, {x: 3, y: 12}, {x: 2, y: 12}, {x: 0, y: 10}]
    // },
    // {
    //   type: OBSTACLE_TYPES.Plane,
    //   isBlocking: false,
    //   image: '/images/wood_floor_1.png',
    //   points: [{x: 10, y: 0}, {x: 15, y: 0}, {x: 15, y: 1}, {x: 10, y: 1}]
    // },
    {
      type: OBSTACLE_CREATOR_TYPES.Polygon,
      isBlocking: true,
      image: OBSTACLE_TEXTURES.WALL_1,
      points: [{x: 10, y: 2}, {x: 20, y: 2}, {x: 20, y: 8}, {x: 10, y: 8}],
      specialPoints: [{x: 15, y: 8, image: OBSTACLE_TEXTURES.WOOD_FLOOR_1, isBlocking: false}]
    }
  ];
  let obstacleElements = ObstacleCreator({groups: pointGroups});
  let itemElements = ItemCreator({items: items});
  return (
    <div className='main-container'>

      <Character/>
      {obstacleElements}
      {itemElements}
      {/*{generateGrid().map(it => {*/}
      {/*  return <GridSquare key={it.x.toString() + '-' + it.y.toString()} x={it.x} y={it.y}/>*/}
      {/*})}*/}
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
