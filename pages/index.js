import React, { Fragment, useState } from "react";
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
    {
      set: setItems,
      undo: undoItems,
      redo: redoItems,
      canUndo: canUndoItems,
      canRedo: canRedoItems
    }
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

  const updateItems = (items, index, newProps = {}) => {
    const newItems = [...items];
    const newItem = { ...newItems[index], ...newProps };
    newItems[index] = newItem;
    setItems(newItems);
    setSelectedItemId(newItem.id);
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
    <Fragment>
      <button onClick={() => setCursorPosActive(true)}>Add Item</button>
      <button onClick={undoItems} disabled={!canUndoItems}>
        Undo
      </button>
      <button onClick={redoItems} disabled={!canRedoItems}>
        Redo
      </button>
      <CursorPosition
        isEnabled={cursorPosActive}
        mapChildProps={({ position }) => ({ point: position })}
      >
        <Canvas {...canvasProps} />
      </CursorPosition>
    </Fragment>
  );
};
