import React, { useState } from "react";
import CursorPosition from "react-cursor-position";
import shortid from "shortid";
import useUndo from "use-undo";

import Canvas from "./canvas";

const newItem = ({ x, y }) => ({
  id: shortid.generate(),
  width: 200,
  height: 200,
  x,
  y,
  text: "new item"
});

export default () => {
  const [
    items,
    { set: setItems, undo: undoItems, redo: redoItems, canUndo, canRedo, }
  ] = useUndo([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [cursorPosActive, setCursorPosActive] = useState(false);
  const { present: presentItems } = items;

  const addNewItem = position => {
    if (cursorPosActive) {
      const item = newItem(position);
      setItems([...presentItems, item]);
      setCursorPosActive(false);
      setSelectedItemId(item.id);
      return;
    }
    setSelectedItemId("");
  };

  const updateItems = (items, id) => {
    setItems([...items]);
    setSelectedItemId(id);
  };

  const setSelectedItem = id => {
    setSelectedItemId(id);
    setCursorPosActive(false);
  };

  const canvasProps = {
    items,
    selectedItemId,
    cursorPosActive,
    addNewItem,
    updateItems,
    setSelectedItem
  };

  return (
    <div>
      cursorPosActive, <div>{`${cursorPosActive}`}</div>
      <button onClick={() => setCursorPosActive(true)}>Add Item</button>
      <button onClick={undoItems} disabled={!canUndo}>Undo</button>
      <button onClick={redoItems} disabled={!canRedo}>Redo</button>
      <CursorPosition
        isEnabled={cursorPosActive}
        mapChildProps={({ position }) => ({ point: position })}
      >
        <Canvas {...canvasProps} />
      </CursorPosition>
    </div>
  );
};
