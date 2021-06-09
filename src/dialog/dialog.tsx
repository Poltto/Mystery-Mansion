import { useDispatch, useSelector } from 'react-redux';
import { ACTIONS } from '../redux/actions';



export function Dialog() {
  const dialog = useSelector(state => {
    return state.DialogReducer.dialog;
  });

  const dispatch = useDispatch();

  function submitDialog() {
    dialog.header = undefined;
    dialog.content = undefined;
    dialog.footer = undefined;
    let action = {
      type: ACTIONS.DIALOG_ACTIONS.ENUMS.CLOSE_DIALOG
    };
    if(dialog.onSubmit) {
      dialog.onSubmit().then(result => {
        dispatch(action);
      });
    } else {
      dispatch(action);
    }
  }

  const defaultContent = {
    header: '',
    content: '',
    footer: ''
  };

  function getClass() {
    let visibleClass = (dialog.header || dialog.content || dialog.footer) ? 'visible' : 'hidden';
    return 'dialog-container ' + visibleClass;
  }

  function getInnerHtml(type: string) {
    return dialog[type] ? {__html: dialog[type]} : {__html: defaultContent[type]};
  }



  return (
    <div className={getClass()}>
      <div className={'dialog-wrapper'}>
        <div className={'dialog-inner'}>
          <div dangerouslySetInnerHTML={getInnerHtml('header')} className={'dialog-header'}/>
          <div dangerouslySetInnerHTML={getInnerHtml('content')} className={'dialog-content'}/>
          <div className={'dialog-footer'}>
            <div className={'button-container'}>
              <button className={'button button-primary'} onClick={submitDialog}>
                <div className={'button-inner'}>
                  <div className={'button-icon icon-check'}/>
                  <div className={'button-content'}>Ok</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
