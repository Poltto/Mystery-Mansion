import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';

export function BottomFloor() {
  let template =
    <div className='blueprint-lower-container'>
    <Link to='/blueprint/lower/living-room' className='building-section living-room'>Living room</Link>
    <Link to='/blueprint/lower/hallway' className='building-section hallway'>Hallway</Link>
    <Link to='/blueprint/lower/entrance' className='building-section entrance'>Entrance</Link>
    <Link to='/blueprint/lower/kitchen' className='building-section kitchen'>Kitchen</Link>
    <Link to='/blueprint/lower/office' className='building-section office'>Office</Link>
    <Link to='/blueprint/lower/bathroom' className='building-section bathroom'>Bathroom</Link>
    <Link to='/blueprint/upper' className='building-section upstairs'>Upstairs</Link>
    <div className='empty 1'/>
    <div className='empty 2'/>
    <div className='empty 3'/>

    <Link className='back-button' to='/blueprint'>Go back</Link>

  </div>;



  return template;
}
