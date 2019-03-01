import React, { Fragment } from "react";
import { Rnd } from "react-rnd";

const resizeHandleClassName = "handle";
const resizeHandleStyle = {
  width: "10px",
  height: "10px"
};
const posLength = "-12px";

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
        className={`rnd ${selectedItemId === item.id ? "rnd-selected" : ""}`}
        size={{ width: item.width, height: item.height }}
        position={{ x: item.x, y: item.y }}
        onDragStop={(e, { x, y }) => updateItems(presentItems, index, { x, y })}
        onResize={(e, dir, { style: { width, height } }, delta, pos) => {
          updateItems(presentItems, index, { width, height, ...pos });
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
            .rnd {
              background: #fff;
            }
            .rnd.rnd-selected,
            .rnd:hover {
              border: 1px dashed #333;
            }
            .rnd-selected .handle,
            .rnd:hover .handle {
              border: 1px solid #333;
            }
          `}
        </style>
      </Rnd>
    ))}
  </Fragment>
);
