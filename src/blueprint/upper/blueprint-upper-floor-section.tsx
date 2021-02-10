import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';
import { BlueprintUpperFloorSectionBathroom } from './blueprint-Upper-floor-section.bathroom';
import { BlueprintUpperFloorSectionBedroom2 } from './blueprint-Upper-floor-section.bedroom2';
import { BlueprintUpperFloorSectionStorage } from './blueprint-upper-floor-section.storage';
import {
  BlueprintUpperFloorSectionMasterBedroom
} from './blueprint-upper-floor-section.master-bedroom';
import { BlueprintUpperFloorSectionHallway } from './blueprint-Upper-floor-section.hallway';
import { BlueprintUpperFloorSectionBalcony } from './blueprint-Upper-floor-section.balcony';

export function BlueprintUpperFloorSection({match}) {
  let section = match.params.section;
  let SECTIONS = {
    bedroom2: BlueprintUpperFloorSectionBedroom2,
    storage: BlueprintUpperFloorSectionStorage,
    'master-bedroom': BlueprintUpperFloorSectionMasterBedroom,
    bathroom: BlueprintUpperFloorSectionBathroom,
    hallway: BlueprintUpperFloorSectionHallway,
    balcony: BlueprintUpperFloorSectionBalcony,
  }
  let sectionComponent = SECTIONS[section];
  let template =
    <div className="blueprint-upper-section-container">
      {createComponent(sectionComponent)}

      <Link className="back-button" to="/blueprint/Upper">Go back</Link>

    </div>

  function createComponent(component) {
    return React.createElement(component);
  }
  return template;

}
