import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';

export function BlueprintUpperFloor() {
  let template =
    <div className="blueprint-upper-container">

      <Link to="/blueprint/upper/master-bedroom" className="building-section master-bedroom">
        <div className="hover-overlay"></div>
      </Link>
      <Link to="/blueprint/upper/bedroom2" className="building-section guest-bedroom">
        <div className="hover-overlay"></div>
      </Link>
      <Link to="/blueprint/upper/balcony" className="building-section balcony">
        <div className="hover-overlay"></div>
      </Link>
      <Link to="/blueprint/upper/hallway" className="building-section hallway">
        <div className="hover-overlay"></div>
      </Link>
      <Link to="/blueprint/upper/bathroom" className="building-section bathroom">Bathroom</Link>
      <Link to="/blueprint/upper/storage" className="building-section storage">Storage</Link>
      <Link to="/blueprint/upper" className="building-section downstairs">Downstairs</Link>
      <div className="empty 1"></div>
      <div className="empty 2"></div>
      <div className="empty 3"></div>

      <Link className="back-button" to="/blueprint">Go back</Link>
    </div>

  return template;
}
