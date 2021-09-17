export function CustomRadio(props) {

    function getStyle() {
        return 'radio-buttons-container ' + (props.direction ?? 'vertical');
    }

    return(
        <div className={getStyle()}>
            <div className={'radio-button-container'}>
                <input
            </div>
            <div className={'radio-button-container'}>

            </div>
        </div>
    )
}