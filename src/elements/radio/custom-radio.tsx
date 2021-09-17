
export function CustomRadio(props) {

    function getStyle() {
        return 'radio-buttons-container ' + (props.direction ?? 'vertical');
    }

    function getLabel(index: number) {
      return props.labels[index];
    }

    function getValue(index: number) {
      return props.values[index];
    }

    function isSelected(index: number) {
      return props.value === props.values[index];
    }

    function setNewValue(index: number) {
      return () => {
        props.setValue(props.values[index]);
      }
    }

    function getButtonStyle(index: number) {
      return 'radio-button-container' + (props.value === props.values[index] ? ' selected' : '');

    }

    return(
        <div className={getStyle()}>
            <div className={getButtonStyle(0)}>
                <div className={'radio-button-input'} onClick={setNewValue(0)}>
                  <span className={'radio-button-checkmark'}></span>
                  {isSelected(0) ? <span className={'icon-checkmark'}></span> : ''}
                </div>
                <div className={'radio-button-label'}>
                  <span>{getLabel(0)}</span>
                </div>
            </div>
            <div className={getButtonStyle(1)} onClick={setNewValue(1)}>
              <div className={'radio-button-input'}>
                <span className={'radio-button-checkmark'}></span>
                {isSelected(1) ? <span className={'icon-checkmark'}></span> : ''}
              </div>
              <div className={'radio-button-label'}>
                <span>{getLabel(1)}</span>
              </div>
            </div>
        </div>
    )
}
