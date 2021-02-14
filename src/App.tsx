import { ACTIONS } from './redux/actions';
import { ObstacleCreator } from './obstacle-creator/obstacleCreator';
import { Character } from './character/character';
import { Dialog } from './dialog/dialog';
import { useDispatch, useSelector } from 'react-redux';

export function App() {
  const dispatch = useDispatch();


  window.addEventListener('keydown', function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false);



  let pointGroups = [
    // {
    //   type: 'line',
    //   points:[{x: 4, y: 15}, {x: 8, y: 3}]
    // },
    // {
    //   type: 'line',
    //   points: [{x: 0, y: 1}, {x: 9, y: 2}]
    // },
    {
      type: 'point',
      isBlocking: true,
      image: '/images/wood_floor_1.png',
      points: [{x: 15, y: 15}],
      onInteract: () => {
        let action = {
          type: ACTIONS.DIALOG_ACTIONS.ENUMS.OPEN_DIALOG,
          payload: {
            header: '<div>Test header new</div>',
            content: '<div>Test content new</div>',
            footer: undefined,
            onSubmit: () => {
              alert("You closed the dialog!");
            }
          }
        };
        dispatch(action);
      }
    },
    {
      type: 'plane',
      isBlocking: true,
      image: '/images/wood_floor_1.png',
      points: [{x: 0, y:5}, {x: 5, y: 5}, {x: 5, y: 10}, {x: 3, y: 12}, {x: 2, y: 12}, {x: 0, y: 10}]
    },
    {
      type: 'plane',
      isBlocking: false,
      image: '/images/wood_floor_1.png',
      points: [{x: 10, y: 0}, {x: 15, y: 0}, {x: 15, y: 1}, {x: 10, y: 1}]
    }
  ];
  let obstacleElements = ObstacleCreator({groups: pointGroups});
  return (
    <div className='main-container'>
      <Character></Character>
      {obstacleElements}
      {/*{generateGrid().map(it => {*/}
      {/*  return <GridSquare key={it.x.toString() + '-' + it.y.toString()} x={it.x} y={it.y}/>*/}
      {/*})}*/}
      <Dialog/>
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
