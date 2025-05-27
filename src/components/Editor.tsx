import React, { ReactNode, useState } from "react";
import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";

const Editor = () => {
  const [article, setArticle] = useState("");

  const onCompose = () => {
    const contentDiv = document.getElementsByClassName(
      "simple-editor-content"
    )[0];
    const contentSelf = contentDiv.firstChild as HTMLElement;
    if (contentSelf) contentSelf.contentEditable = "false";
    const content = contentDiv.innerHTML;

    console.log(content);
    setArticle(content);
  };

  const showArticle = () => {
    return <div dangerouslySetInnerHTML={{ __html: article }} />;
  };

  return (
    <div>
      <SimpleEditor />
      <button className="btn btn-primary" onClick={onCompose}>
        Compose
      </button>
      {showArticle()}
    </div>
  );
};

export default Editor;
