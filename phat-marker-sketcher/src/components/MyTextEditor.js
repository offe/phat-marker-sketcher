import * as React from "react";
import { useEffect, useRef, useContext } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { ProjectContext, ProjectDispatchContext } from "./ProjectContext";

// Monkey patch Header to prevent header tune options
/*
  This makes it impossible to change header level. 
  The user can still add headers, with the default level of 5
*/
Header.prototype.renderSettings = () => {
  console.log("renderSettings called");
  return [];
};

export default function MyTextEditor() {
  const project = useContext(ProjectContext);
  const projectDispatch = useContext(ProjectDispatchContext);
  const ejInstance = useRef();
  useEffect(() => {
    const DEFAULT_INITIAL_DATA = {
      time: new Date().getTime(),
      blocks: [
        {
          id: "project-name",
          type: "header",
          data: {
            text: project.projectName,
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
          const projectNameHeader = content.blocks.find(
            ({ id }) => id === "project-name"
          );
          if (projectNameHeader === undefined) {
            console.log("The project name header is gone! ");
            editor.blocks.insert(
              "header",
              { text: "Project name", level: 1 },
              undefined,
              0,
              undefined,
              false,
              "project-name"
            );
          } else {
            const newProjectName = projectNameHeader.data.text;
            projectDispatch({
              type: "rename-project",
              projectName: newProjectName.trim(),
            });
            console.log(`Project name changed to: ${newProjectName}`);
          }
        },
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: "My Heading",
              levels: [1, 2, 3, 4, 5],
              defaultLevel: 5,
            },
          },
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
  }, [projectDispatch]);
  return (
    <>
      <div id="editorjs"></div>
    </>
  );
}
