import * as React from "react";
import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";

export default function MyTextEditor() {
  const ejInstance = useRef();
  useEffect(() => {
    const DEFAULT_INITIAL_DATA = {
      time: new Date().getTime(),
      blocks: [
        {
          type: "header",
          data: {
            text: "My App",
            level: 1,
          },
        },
        {
          type: "header",
          data: {
            text: "Start Page",
            level: 2,
          },
        },
        /*{
          type: "header",
          data: {
            text: "Main Variant",
            level: 3,
          },
        },*/
        {
          type: "header",
          data: {
            text: "An element",
            level: 4,
          },
        },
        {
          type: "paragraph",
          data: {
            text: "What it does",
          },
        },
        {
          type: "header",
          data: {
            text: "Another element",
            level: 4,
          },
        },
        {
          type: "paragraph",
          data: {
            text: "And why it's here",
          },
        },
      ],
    };
    const initEditor = () => {
      const editor = new EditorJS({
        holder: "editorjs",
        onReady: () => {
          ejInstance.current = editor;
        },
        autofocus: false,
        data: DEFAULT_INITIAL_DATA,
        onChange: async () => {
          let content = await editor.saver.save();

          console.log(content);
        },
        tools: {
          header: Header,
        },
      });
    };
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);
  return (
    <>
      <div id="editorjs"></div>
    </>
  );
}
