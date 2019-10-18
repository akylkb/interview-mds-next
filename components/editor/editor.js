import React from 'react';
import MdEditor from "for-editor";
import './editor.css';

const Editor = ({value, onChange}) => {
  return (
    <MdEditor
      value={value}
      onChange={onChange}
      language="en"
      placeholder="Markdown редактор"
      height={300}
      addImg={() => window.alert('Зугрузка файла не доступна')}
      toolbar={{
        h1: true,
        h2: true,
        h3: true,
        h4: true,
        img: true,
        link: true,
        code: true,
        preview: true,
        expand: true,
        /* v0.0.9 */
        undo: true,
        redo: true,
        save: false,
        /* v0.2.3 */
        subfield: true
      }}
    />
  )
};

export default Editor;