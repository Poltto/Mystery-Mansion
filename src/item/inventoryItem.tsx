import { useDrag } from 'react-dnd';
import { useRef } from 'react';


export function InventoryItem(props) {
  const [collected, dragRef] = useDrag(
    () => ({
      type: 'InventoryItem',
      item: props,
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })

    }),
    []
  );

  function getImage() {
    return props.item?.image;
  }

  return (
    <div className={'inventory-item' + (collected.isDragging ? ' dragging' : '')} ref={dragRef}>
      <img src={getImage()}/>
    </div>
  );
}
