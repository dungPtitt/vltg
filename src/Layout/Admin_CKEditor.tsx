// Admin_CKEditor.jsx / Admin_CKEditor.tsx
"use client";
import styles from "@/Css/adminPage.module.css";
import React, { useEffect, useRef } from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Admin_CKEditor = ({
  mainContent,
  setMainContent,
  secondContent,
  setSecondContent,
}: any) => {
  const editorRef: any = useRef();
  const { CKEditor, ClassicEditor }: any = editorRef.current || {};
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("ckeditor5-custom-build/build/ckeditor"),
    };
  }, []);
  return (
    <div className={styles.ckeditor}>
      <div className="editor">
        <CKEditor
          config={{
            heading: {
              options: [
                {
                  model: "paragraph",
                  title: "Paragraph",
                  class: "ck-heading_paragraph",
                },
                {
                  model: "heading1",
                  view: "h1",
                  title: "Heading 1",
                  class: "ck-heading_heading1",
                },
                {
                  model: "heading2",
                  view: "h2",
                  title: "Heading 2",
                  class: "ck-heading_heading2",
                },
                {
                  model: "heading3",
                  view: "h3",
                  title: "Heading 3",
                  class: "ck-heading_heading3",
                },
                {
                  model: "heading4",
                  view: "h4",
                  title: "Heading 4",
                  class: "ck-heading_heading4",
                },
                {
                  model: "heading5",
                  view: "h5",
                  title: "Heading 5",
                  class: "ck-heading_heading5",
                },
                {
                  model: "heading6",
                  view: "h6",
                  title: "Heading 6",
                  class: "ck-heading_heading6",
                },
              ],
            },
          }}
          editor={ClassicEditor}
          data={mainContent}
          onChange={(event: any, editor: any) => {
            setMainContent(editor.getData());
          }}
        />
      </div>
      <div>
        <CKEditor
          config={{
            heading: {
              options: [
                {
                  model: "paragraph",
                  title: "Paragraph",
                  class: "ck-heading_paragraph",
                },
                {
                  model: "heading1",
                  view: "h1",
                  title: "Heading 1",
                  class: "ck-heading_heading1",
                },
                {
                  model: "heading2",
                  view: "h2",
                  title: "Heading 2",
                  class: "ck-heading_heading2",
                },
                {
                  model: "heading3",
                  view: "h3",
                  title: "Heading 3",
                  class: "ck-heading_heading3",
                },
                {
                  model: "heading4",
                  view: "h4",
                  title: "Heading 4",
                  class: "ck-heading_heading4",
                },
                {
                  model: "heading5",
                  view: "h5",
                  title: "Heading 5",
                  class: "ck-heading_heading5",
                },
                {
                  model: "heading6",
                  view: "h6",
                  title: "Heading 6",
                  class: "ck-heading_heading6",
                },
              ],
            },
          }}
          editor={ClassicEditor}
          data={secondContent}
          onChange={(event: any, editor: any) => {
            setSecondContent(editor.getData());
          }}
        />
      </div>
    </div>
  );
};

export default Admin_CKEditor;
