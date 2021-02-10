import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';
import { BlueprintLowerFloorSectionBathroom } from './blueprint-lower-floor-section.bathroom';
import { BlueprintLowerFloorSectionKitchen } from './blueprint-lower-floor-section.kitchen';
import { BlueprintLowerFloorSectionOffice } from './blueprint-lower-floor-section.office';
import { BlueprintLowerFloorSectionLivingRoom } from './blueprint-lower-floor-section.living-room';
import { BlueprintLowerFloorSectionHallway } from './blueprint-lower-floor-section.hallway';
import { BlueprintLowerFloorSectionEntrance } from './blueprint-lower-floor-section.entrance';

export function BlueprintLowerFloorSection({match}) {
  let section = match.params.section;
  let SECTIONS = {
    kitchen: BlueprintLowerFloorSectionKitchen,
    office: BlueprintLowerFloorSectionOffice,
    livingRoom: BlueprintLowerFloorSectionLivingRoom,
    bathroom: BlueprintLowerFloorSectionBathroom,
    hallway: BlueprintLowerFloorSectionHallway,
    entrance: BlueprintLowerFloorSectionEntrance,
  }
  let sectionComponent = SECTIONS[section];
  let template =
    <div className="blueprint-lower-section-container">
      {createComponent(sectionComponent)}

      <Link className="back-button" to="/blueprint/lower">Go back</Link>

    </div>

  function createComponent(component) {
    return React.createElement(component);
  }
  return template;

}
