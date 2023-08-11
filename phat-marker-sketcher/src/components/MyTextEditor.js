import * as React from "react";
import { useState, useEffect, useRef, useContext, useMemo } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import NestedList from "@editorjs/nested-list";
import Table from "@editorjs/table";
import {
  ProjectContext,
  ProjectDispatchContext,
  UiStateContext,
} from "./ProjectContext";

class MyHeader extends Header {
  // Prevent header tune options to change header level
  renderSettings() {
    //console.log("renderSettings called");
    return [];
  }
  // Replace placeholder with level specific ones
  getTag() {
    const tag = super.getTag();
    const newPlaceholder = {
      1: "Project name",
      2: "Page name",
      3: "Page variant name",
      4: "Element name",
      5: "Heading",
    }[this._data.level];
    if (newPlaceholder !== undefined) {
      tag.dataset.placeholder = newPlaceholder;
    }
    return tag;
  }
  /*
  removed() {
    console.log("MyHeader.removed called");
    console.log(this);
    //super.removed(); // doesn't exist in current version of Header
  }
  */
}

class MyParagraph extends Paragraph {
  getTag() {
    const tag = super.getTag();
    tag.dataset.placeholder = "Description";
    return tag;
  }
}

export default function MyTextEditor() {
  const project = useContext(ProjectContext);
  const projectDispatch = useContext(ProjectDispatchContext);
  const { selectedElementId /*setSelectedElementId*/ } =
    useContext(UiStateContext);
  const ejInstance = useRef(null);

  const getVisualBlocks = (editor, content) => {
    const blockCount = editor.blocks.getBlocksCount();
    const blocks = content ? content.blocks : editor.configuration.data.blocks;
    //console.log({ blocks });

    const visualBlocks = [...new Array(blockCount)].map((_, i) => {
      const block = editor.blocks.getBlockByIndex(i);
      const { id, isEmpty, name: type, selected, holder } = block;
      //console.log(editor);
      const actualBlock = blocks.find(({ id: cid }) => cid === id);
      const {
        text = undefined,
        level = undefined,
        style = undefined,
        items = undefined,
        withHeadings = undefined,
        content = undefined,
      } = actualBlock?.data || {};
      return {
        id,
        holder,
        isEmpty,
        type,
        selected,
        text,
        level,
        style,
        items,
        withHeadings,
        content,
      };
    });
    return visualBlocks;
  };

  const projectSingleDescriptionToEditorBlock = (description) => {
    const { type, data } = description;
    switch (type) {
      case "text":
        return { type: "paragraph", data: { text: data.text } };
      case "list":
        return { type: "list", data };
      case "header":
        return { type: "header", data: { text: data.text } };
      case "table":
        return {
          type: "table",
          data: { withHeadings: data.withHeadings, content: data.content },
        };
      default:
        break;
    }
  };

  const projectDescriptionToEditorBlocks = (description) =>
    description
      .map((e) => [
        //{ type: "paragraph", data: { text: JSON.stringify(e) } },
        projectSingleDescriptionToEditorBlock(e),
      ])
      .flat();

  const createEditorDataFromProject = (project) => {
    return {
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
        ...projectDescriptionToEditorBlocks(project.description),
        ...project.pages
          .map(({ pageName, description, elements }, i) => [
            {
              id: `page-${i}`,
              type: "header",
              data: { text: pageName, level: 2 },
            },
            ...projectDescriptionToEditorBlocks(description),
            ...elements
              .map(({ id, name: elementName, description }, j) => [
                {
                  id: `element-header-${id}`, //: `element-${i}-${j}`,
                  type: "header",
                  data: { text: elementName, level: 4 },
                },
                ...projectDescriptionToEditorBlocks(description),
              ])
              .flat(),
          ])
          .flat(),
        /*{
          type: "header",
          data: {
            text: "Main Variant",
            level: 3,
          },
        },
        {
          id: "1",
          type: "header",
          data: {
            text: "The first box",
            level: 4,
          },
        },
        {
          type: "paragraph",
          data: {
            text: "This is just a nice little frame",
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
        */
      ],
    };
  };

  const INITIAL_EDITOR_DATA = useMemo(
    () => createEditorDataFromProject(project),
    // I can't figure out how to only initalize the editor once, and then make changes in the created editor
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [projectId, setProjectId] = useState(undefined);
  useEffect(() => {
    const initEditor = () => {
      const editor = new EditorJS({
        holder: "editorjs",
        onReady: () => {
          ejInstance.current = editor;
        },
        autofocus: false,
        data: INITIAL_EDITOR_DATA,
        onChange: async () => {
          const editor = ejInstance.current;
          if (editor === null) {
            //console.log("editor not ready in onChange");
            return;
          }
          const content = await editor.saver.save();

          //console.log(content.blocks);

          const visualBlocks = getVisualBlocks(editor, content);
          projectDispatch({ type: "editor-change", visualBlocks });
          //console.log(visualBlocks);
          //handleEditorChange(visualBlocks);
          //console.log({ visualBlocks });
          //console.log({ elements: project.pages[0].elements });

          const recreateIfRemoved = (id, insertParams) => {
            const element = visualBlocks.find(({ id: cid }) => cid === id);
            if (element === undefined) {
              //console.log( `The block with id ${id} is missing, recreating it! `);
              editor.blocks.insert(...insertParams, id);
            }
          };

          recreateIfRemoved("project-name", [
            "header",
            { text: "Untitled project", level: 1 },
            {},
            0,
            undefined,
            false,
          ]);

          recreateIfRemoved("page-0", [
            "header",
            { text: "Untitled page", level: 2 },
            {},
            1,
            undefined,
            false,
          ]);
        },
        tools: {
          paragraph: {
            class: MyParagraph,
            config: {
              placeholder: "Description",
              preserveBlank: true,
            },
          },
          header: {
            class: MyHeader,
            config: {
              levels: [1, 2, 3, 4, 5],
              defaultLevel: 5,
            },
          },
          list: {
            class: NestedList,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
              withHeadings: true,
            },
          },
        },
        defaultBlock: "paragraph",
        logLevel: "ERROR",
      });
    };
    if (ejInstance.current === null) {
      //console.log(`Initializing editor`);
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectDispatch]);

  useEffect(() => {
    const editor = ejInstance.current;
    if (!editor) {
      //console.log("editor not ready yet");
      return;
    }
    if (project.projectId !== projectId) {
      editor.render(createEditorDataFromProject(project));
      setProjectId(project.projectId);
      return;
    }
    const { elements } = project.pages[0];
    //console.log("MyTextEditor", elements.length);
    /*
    console.log("All elements on first page: ");
    for (const element of elements) {
      console.log(element);
    }
    */
    //console.log("trying to log editor");
    //console.log({ editor });
    const visualBlocks = getVisualBlocks(editor);

    // Can't easily see level of empty headers (visible, but not in contents)
    const elementHeaderIds = visualBlocks
      .filter(
        ({ type, id }) => type === "header" && id.startsWith("element-header")
      )
      .map(({ id }) => id);
    //console.log({ elementHeaderIds });
    const elementsWithoutHeaders = elements.filter(
      ({ id }) => !elementHeaderIds.includes(`element-header-${id}`)
    );
    //console.log({ elementsWithoutHeaders });
    for (const element of elementsWithoutHeaders) {
      const { id } = element;
      //console.log({ id, editor });
      //console.log({ blocks: editor.blocks });
      editor.blocks.insert(
        "header",
        { text: "", level: 4 },
        {},
        editor.blocks.getBlocksCount(),
        undefined,
        false,
        `element-header-${id}`
      );
      editor.blocks.insert(
        "paragraph",
        { text: "" },
        {},
        editor.blocks.getBlocksCount(),
        undefined,
        false,
        undefined
      );
    }
    // eslint-disable-next-line
  }, [project]);

  useEffect(() => {
    const editor = ejInstance.current;
    if (!editor) {
      //console.log("editor not ready yet");
      return;
    }
    const visualBlocks = getVisualBlocks(editor);
    /*
    const matchingHeader = visualBlocks.find(
      ({ id }) => id === `element-header-${selectedElementId}`
    );
    if (matchingHeader !== undefined) {
      matchingHeader.holder.classList.add("highlighted-block");
    }
    */
    for (const block of visualBlocks) {
      if (block.id === `element-header-${selectedElementId}`) {
        block.holder.firstChild.classList.add("highlighted-block");
      } else {
        block.holder.firstChild.classList.remove("highlighted-block");
      }
    }
  }, [selectedElementId]);

  return <div id="editorjs"></div>;
}
