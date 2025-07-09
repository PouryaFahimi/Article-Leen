import { useRef, useState, useEffect } from "react";
import {
  SimpleEditor,
  SimpleEditorRef,
} from "./tiptap-templates/simple/simple-editor";
import { useNavigate, useParams } from "react-router";
import { useUser } from "../context/UserContext";
import { availableTags } from "./feed/Article";
interface articleSchema {
  title: string;
  content: string;
  tags: string[];
}

const EditorPage = () => {
  const editorRef = useRef<SimpleEditorRef>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  let { articleId } = useParams();
  articleId = articleId ? articleId : "";
  const { user } = useUser();

  const tags = availableTags;

  const [article, setArticle] = useState<articleSchema>();
  const hasFetched = useRef(false);

  const titleLabel = articleId ? "Edit the title:" : "Enter the article title:";
  const buttonText = articleId ? "Update" : "Compose";

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("article-leen-token")}`,
    },
  };

  useEffect(() => {
    if (!articleId) return;

    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/articles/${articleId}`,
          requestOptions
        );
        const data = await res.json();
        if (!user || user.username !== data.username) {
          navigate(-1);
          // here a state can be shared to show an alert on previous page
          return;
        }
        setArticle(data);
        if (titleRef.current) titleRef.current.value = data.title;
        setTags(data.tags);
      } catch (err) {
        console.error("Failed to fetch feed:", err);
      }
    };

    fetchData();
  }, []);

  const setTags = (tags: string[]) => {
    if (!tags) return;
    for (const tag of tags) {
      const tagItem = document.getElementById(tag) as HTMLInputElement;
      tagItem.checked = true;
    }
  };

  const getTags = () => {
    const selectedTags = [];
    const tagItems = document.getElementsByClassName("tag-item");
    for (const tag of tagItems) {
      if ((tag as HTMLInputElement).checked)
        selectedTags.push((tag as HTMLInputElement).value);
    }
    return selectedTags;
  };

  function calculateContentLength(jsonBody: articleSchema) {
    const stringifiedBody = JSON.stringify(jsonBody);
    return new TextEncoder().encode(stringifiedBody).length;
  }

  const onCompose = () => {
    const content = editorRef.current?.getHTML()
      ? editorRef.current.getHTML()
      : "";
    const contBody = {
      title: titleRef.current ? titleRef.current.value : "",
      content: content,
      tags: getTags(),
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
        // console.log("Response from server:", data);
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
        <input
          ref={titleRef}
          id="artitle"
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Select tags related to the content:
        </label>
        <div className="tag-list">
          {tags.map((tag) => (
            <div>
              <input
                id={tag}
                className="tag-item"
                type="checkbox"
                value={tag}
              />
              <label htmlFor={tag}>{tag}</label>
            </div>
          ))}
        </div>
      </div>

      {article && <SimpleEditor ref={editorRef} inContent={article.content} />}
      {!article && <SimpleEditor ref={editorRef} inContent="" />}
      <button className="btn btn-primary" onClick={onCompose}>
        {buttonText}
      </button>
    </>
  );
};

export default EditorPage;
