import React, { Fragment } from "react";
import { Rnd } from "react-rnd";

const style = {
  background: "#fff"
};

const styleSelected = {
  border: '1px dashed #333',
  background: '#fff'
};

const resizeHandleClassName = 'handle';
const resizeHandleStyle = {
  width: '10px',
  height: '10px',
};
const posLength = '-12px';

export default ({
  items: { present: presentItems },
  point,
  selectedItemId,
  cursorPosActive,
  addNewItem,
  updateItems,
  setSelectedItem
}) => (
  <Fragment>
    <div
      style={{
        height: "700px",
        backgroundColor: "#eee",
        cursor: cursorPosActive ? "copy" : "default"
      }}
      onClick={() => addNewItem(point)}
    />
    {presentItems.map((item, index) => (
      <Rnd
        key={item.id}
        className={`rnd ${selectedItemId === item.id ? 'rnd-selected' : ''}`}
        style={selectedItemId === item.id ? styleSelected : style}
        size={{ width: item.width, height: item.height }}
        default={{ x: item.x, y: item.y }}
        onDragStop={(e, d) => {
          const newItems = presentItems;
          newItems[index].x = d.x;
          newItems[index].y = d.y;
          updateItems(newItems, newItems[index].id);
        }}
        onResize={(e, dir, ref, delta, pos) => {
          const newItems = presentItems;
          newItems[index].width = ref.style.width;
          newItems[index].height = ref.style.height;
          updateItems(newItems, newItems[index].id);
        }}
        bounds="parent"
        resizeHandleClasses={{
          topLeft: resizeHandleClassName,
          topRight: resizeHandleClassName,
          bottomLeft: resizeHandleClassName,
          bottomRight: resizeHandleClassName
        }}
        resizeHandleStyles={{
          topLeft: {
            ...resizeHandleStyle,
            top: posLength,
            left: posLength
          },
          topRight: {
            ...resizeHandleStyle,
            top: posLength,
            right: posLength
          },
          bottomLeft: {
            ...resizeHandleStyle,
            bottom: posLength,
            left: posLength
          },
          bottomRight: {
            ...resizeHandleStyle,
            bottom: posLength,
            right: posLength
          }
        }}
      >
        <div
          style={{
            background: "transparent",
            height: item.height,
            width: item.width
          }}
          onClick={() => setSelectedItem(item.id)}
        >
          {item.text}
        </div>
        <style global jsx>
          {`
            .rnd:hover {
              border: 1px dashed #333;
              background: #fff;
            }
            .rnd:hover .handle {
              border: 1px solid #333;
            }
            .rnd-selected .handle {
              border: 1px solid #333;
            }
          `}
        </style>
      </Rnd>
    ))}
  </Fragment>
);
