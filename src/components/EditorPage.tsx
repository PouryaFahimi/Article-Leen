import { useRef, useState, useEffect } from "react";
import {
  SimpleEditor,
  SimpleEditorRef,
} from "./tiptap-templates/simple/simple-editor";
import { useNavigate, useParams } from "react-router";
import { useUser } from "../context/UserContext";
interface articleSchema {
  title: string;
  content: string;
}

const EditorPage = () => {
  const editorRef = useRef<SimpleEditorRef>(null);
  const navigate = useNavigate();
  const { articleId } = useParams();
  const { user } = useUser();

  const [article, setArticle] = useState<articleSchema>();
  const hasFetched = useRef(false);

  const titleLabel = articleId ? "Edit the title:" : "Enter the article title:";
  const buttonText = articleId ? "Update" : "Compose";

  useEffect(() => {
    if (!articleId) return;

    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/articles/${articleId}`
        );
        const data = await res.json();
        if (!user || user.username !== data.username) {
          navigate(-1);
          // here a state can be shared to show an alert on previous page
          return;
        }
        setArticle(data);
      } catch (err) {
        console.error("Failed to fetch feed:", err);
      }
    };

    fetchData();

    setTitle();
  }, []);

  function calculateContentLength(jsonBody: articleSchema) {
    const stringifiedBody = JSON.stringify(jsonBody);
    return new TextEncoder().encode(stringifiedBody).length;
  }

  const getTitle = () => {
    const temp = document.getElementById("artitle") as HTMLInputElement;
    return temp.value;
  };

  const setTitle = () => {
    const temp = document.getElementById("artitle") as HTMLInputElement;
    temp.value = article ? article.title : "";
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
      method: articleId ? "PUT" : "POST",
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
        navigate("/feed");
      })
      .catch((error) => {
        console.error("Request failed:", error);
      });
  };

  return (
    <>
      <div className="mb-3">
        <label htmlFor="artitle" className="form-label">
          {titleLabel}
        </label>
        <input id="artitle" type="text" className="form-control" />
      </div>
      {article && <SimpleEditor ref={editorRef} inContent={article.content} />}
      {!article && <SimpleEditor ref={editorRef} />}
      <button className="btn btn-primary" onClick={onCompose}>
        {buttonText}
      </button>
    </>
  );
};

export default EditorPage;
