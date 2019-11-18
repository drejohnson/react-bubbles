import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = async e => {
    e.preventDefault();
    try {
      const res = await axiosWithAuth().put(
        `/api/colors/${colorToEdit.id}`,
        colorToEdit
      );
      const data = await res.data;
      const newColors = colors.filter(color => color.id !== colorToEdit.id);
      updateColors([...newColors, data]);
      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteColor = async color => {
    try {
      const res = await axiosWithAuth().delete(
        `/api/colors/${color.id}`,
        color
      );
      const data = await res.data;
      const newColors = colors.filter(color => color.id !== data);
      updateColors(newColors);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddColor = async e => {
    e.preventDefault();
    try {
      const res = await axiosWithAuth().post("/api/colors", addColor);
      const data = await res.data;
      updateColors(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = e => {
    e.preventDefault();
    setAddColor({
      ...addColor,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={handleAddColor}>
        <input
          type="text"
          name="color"
          placeholder="Color"
          value={addColor.color}
          onChange={e =>
            setAddColor({
              ...addColor,
              [e.target.name]: e.target.value
            })
          }
        />
        <input
          type="text"
          name="code"
          placeholder="Hex Code"
          value={addColor.code.hex}
          onChange={e =>
            setAddColor({ ...addColor, code: { hex: e.target.value } })
          }
        />
        <button type="submit">Add Color</button>
      </form>
    </div>
  );
};

export default ColorList;
