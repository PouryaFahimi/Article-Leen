import { useRef, useState } from "react";
import {
  SimpleEditor,
  SimpleEditorRef,
} from "./tiptap-templates/simple/simple-editor";

interface articleSchema {
  title: string;
  content: string;
}

interface Props {
  title?: string;
  content?: string;
  updater?: boolean;
  articleId?: string;
}

const EditorPage = ({ title, content, updater, articleId = "" }: Props) => {
  const [article, setArticle] = useState("");
  const editorRef = useRef<SimpleEditorRef>(null);
  const titleLabel = updater ? "Edit the title:" : "Enter the article title:";
  const buttonText = updater ? "Update" : "Compose";

  function calculateContentLength(jsonBody: articleSchema) {
    const stringifiedBody = JSON.stringify(jsonBody);
    return new TextEncoder().encode(stringifiedBody).length;
  }

  const getTitle = () => {
    const temp = document.getElementById("artitle") as HTMLInputElement;
    return temp.value;
  };

  const onCompose = () => {
    const content = editorRef.current?.getHTML()
      ? editorRef.current.getHTML()
      : "";
    const contBody = {
      title: getTitle(),
      content: content,
    };
    const contentLength = calculateContentLength(contBody);
    console.log(contentLength);

    const requestOptions = {
      method: updater ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": contentLength.toString(),
        Authorization: `Bearer ${localStorage.getItem("article-leen-token")}`,
      },
      body: JSON.stringify(contBody),
    };

    fetch(`http://localhost:3000/api/articles/${articleId}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response from server:", data);
      })
      .catch((error) => {
        console.error("Request failed:", error);
      });

    // if (editorRef.current?.getHTML()) setArticle(editorRef.current?.getHTML());
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
    <>
      <div className="mb-3">
        <label htmlFor="artitle" className="form-label">
          {titleLabel}
        </label>
        <input
          id="artitle"
          type="text"
          className="form-control"
          value={title}
        />
      </div>
      <SimpleEditor ref={editorRef} inContent={content} />
      <button className="btn btn-primary" onClick={onCompose}>
        {buttonText}
      </button>
      {showArticle()}
    </>
  );
};

export default EditorPage;
