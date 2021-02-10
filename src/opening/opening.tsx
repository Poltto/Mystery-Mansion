import { useHistory } from 'react-router-dom';
import { OPENING_TEXTS } from './opening-texts';
export function Opening() {
  const history = useHistory();
  let openingTexts = OPENING_TEXTS;
  let [index, setIndex] = React.useState(0);

  function getOpeningText() {
    return openingTexts[index];
  }


  function goForward(event) {
    if((index + 1) >= openingTexts.length) {
      history.push('/blueprint');
    } else {
      setIndex(index + 1);
    }
  }
  let template =
    <div className="opening-container" onClick={goForward}>
      <span className="opening-text">{getOpeningText()}</span>
    </div>
  return template;
}
