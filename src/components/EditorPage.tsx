import { useRef, useState } from "react";
import {
  SimpleEditor,
  SimpleEditorRef,
} from "./tiptap-templates/simple/simple-editor";

const EditorPage = () => {
  const [article, setArticle] = useState("");
  const editorRef = useRef<SimpleEditorRef>(null);

  const onCompose = () => {
    if (editorRef.current?.getHTML()) setArticle(editorRef.current?.getHTML());
  };

  const showArticle = () => {
    return (
      <div className="simple-editor-content">
        <div
          className="tiptap ProseMirror"
          dangerouslySetInnerHTML={{ __html: article }}
        />
      </div>
    );
  };

  return (
    <div>
      <SimpleEditor ref={editorRef} />
      <button className="btn btn-primary" onClick={onCompose}>
        Compose
      </button>
      {showArticle()}
    </div>
  );
};

export default EditorPage;
