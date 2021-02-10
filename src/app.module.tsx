import { BrowserRouter } from 'react-router-dom';
import './_app.scss';
import { Character } from './character/character';
import { GridSquare } from './square/square';
require.context('./assets', true, /\.(png|jpeg|jpg|gif)/);
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Obstacle } from './obstacle/obstacle';
import { ObstacleCreator } from './obstacle-creator/obstacleCreator';

function App() {


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
        alert('Hello world! You have interacted with obstacle at position x = 15 and y = 15');
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

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {App()}
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

