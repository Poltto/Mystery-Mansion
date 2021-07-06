import { BrowserRouter } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';
import { BlueprintUpperFloor } from './upper/blueprint-upper-floor';
import { BlueprintLowerFloor } from './lower/blueprint-lower-floor';
import { BlueprintLowerFloorSection } from './lower/blueprint-lower-floor-section';
import { BlueprintUpperFloorSection } from './upper/blueprint-upper-floor-section';

export function Blueprint({match}) {
  let template =
    <div className='blueprint-container'>
      <Switch>
        <Route exact={true} path='/blueprint'>
          <div className='blueprint-manor-container'>
            <Link to='/blueprint/lower' className='blueprint-manor-single-container'>Lower</Link>
            <Link to='/blueprint/upper' className='blueprint-manor-single-container'>Upper</Link>
          </div>
        </Route>
        <Route exact={true} path='/blueprint/lower' component={BlueprintLowerFloor}/>
        <Route exact={true} path='/blueprint/upper' component={BlueprintUpperFloor}/>
        <Route path='/blueprint/lower/:section' component={BlueprintLowerFloorSection}/>
        <Route path='/blueprint/upper/:section' component={BlueprintUpperFloorSection}/>
      </Switch>
    </div>;

  return template;
}
