import { useDispatch, useSelector } from 'react-redux';



export function Dialog() {
  const dialog = useSelector(state => {
    return state.DialogReducer.dialog;
  });

  const dispatch = useDispatch();

  function submitDialog() {
    dialog.header = undefined;
    dialog.content = undefined;
    dialog.footer = undefined;
    if(dialog.onSubmit) {
      dialog.onSubmit();
    }
  }

  const defaultContent = {
    header: '',
    content: '',
    footer: '<div class="button-container"><button class="button button-primary" onClick="{submitDialog}"><div class="button-inner"><div class="button-icon icon-check"></div><div class="button-content">Ok</div></div></button></div>'
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
          <div dangerouslySetInnerHTML={getInnerHtml('footer')} className={'dialog-footer'}/>
        </div>
      </div>
    </div>
  );
}
