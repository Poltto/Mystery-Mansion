export function GridSquare(props) {

  const x = props.x;
  const y = props.y;

  let [top, setTop] = React.useState(getTop());
  let [left, setLeft] = React.useState(getLeft());

  function getTop() {
    return x * 30;
  }

  function getLeft() {
    return y * 30;
  }

  function getClass() {
    return 'square ' + x + '-' + y;
  }

  function getStyle() {
    return {
      top,
      left
    }
  }

  return (<div style={getStyle()} className={getClass()}></div>);
}
