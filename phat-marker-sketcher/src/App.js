import * as React from "react";
import { useReducer } from "react";
import ButtonAppBar from "./components/ButtonAppBar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import styles from "./styles.module.css";
import PageList from "./components/PageList";
import SketchArea from "./components/SketchArea";
import { Box } from "@mui/material";
import { ConfirmProvider } from "material-ui-confirm";

import MyTextEditor from "./components/MyTextEditor";
import {
  ProjectContext,
  ProjectDispatchContext,
  UiStateContextProvider,
  projectReducer,
} from "./components/ProjectContext";

const sampleProject = {
  projectName: "Sample Project",
  version: 0,
  description: [
    {
      type: "text",
      data: {
        text: "This is the sample project to give an introduction of <b>Phat Marker Sketcher</b>. If you want to get started with something a bit cleaner, select <i>New Project</i> in the menu.",
      },
    },
    {
      type: "text",
      data: {
        text: "The projects are composed of pages, like the first one here:",
      },
    },
  ],
  pages: [
    {
      pageName: "The first page",
      description: [
        {
          type: "text",
          data: {
            text: "The pages can have descriptive texts just like this one.",
          },
        },
        {
          type: "text",
          data: {
            text: "This one is a very simple start page. The elements on the sketch are linked to the descriptions below:",
          },
        },
      ],
      elements: [
        {
          id: "1",
          type: "box",
          rectangle: [4, 7, 4, 4],
          name: "Logo",
          description: [
            {
              type: "text",
              data: {
                text: "The logo for the app is shown here. If it's too small for you, why don't select it and make it bigger?",
              },
            },
          ],
        },
        {
          id: "2",
          type: "box",
          rectangle: [2, 17, 8, 3],
          name: "Start button",
          description: [
            {
              type: "text",
              data: {
                text: "The start button that takes the user to the next page",
              },
            },
          ],
        },
        {
          id: "3",
          type: "text",
          rectangle: [4, 18, 4, 1],
          name: "Start button text",
          description: [
            {
              type: "text",
              data: {
                text: "Text that says '<i>Let's go!</i>'. Or something else, here's a few ideas:",
              },
            },
            {
              type: "list",
              data: {
                style: "unordered",
                items: [
                  {
                    content: "Classics:",
                    items: [
                      { content: "Start", items: [] },
                      { content: "Begin", items: [] },
                      { content: "Initiate", items: [] },
                    ],
                  },
                  {
                    content: "Fun",
                    items: [
                      { content: "Let's go!", items: [] },
                      { content: "Let's roll!", items: [] },
                      { content: "Launch!", items: [] },
                      { content: "Begin the Journey", items: [] },
                    ],
                  },
                ],
              },
            },
            {
              type: "text",
              data: {
                text: "See what I did there? You've got a couple of formatting options:",
              },
            },
            {
              type: "header",
              data: {
                text: "Formatting",
              },
            },
            {
              type: "list",
              data: {
                style: "ordered",
                items: [
                  {
                    content: "Text formatting",
                    items: [
                      {
                        content: "<b>Bold</b>",
                        items: [],
                      },
                      {
                        content: "<i>Italic</i>",
                        items: [],
                      },
                    ],
                  },
                  {
                    content: "Lists",
                    items: [
                      {
                        content: "Ordered",
                        items: [],
                      },
                      {
                        content: "Unordered",
                        items: [],
                      },
                    ],
                  },
                  {
                    content: "Tables, there's an example below",
                    items: [],
                  },
                  {
                    content:
                      "Headers, like the one above, saying <b>Formatting</b>",
                    items: [],
                  },
                ],
              },
            },
            {
              type: "table",
              data: {
                withHeadings: true,
                content: [
                  ["Headings", "A column", "Another column"],
                  ["First row", "A cell", "And another cell"],
                ],
              },
            },
          ],
        },
        /*
          { id: "3", type: "box", rectangle: [2, 8, 8, 4] }, 
          { id: "4", type: "box", rectangle: [3, 6, 6, 5] },
          { id: "5", type: "box", rectangle: [2, 13, 4, 0] },
          { id: "6", type: "text", rectangle: [2, 1, 8, 1] },
          { id: "8", type: "text", rectangle: [2, 2, 8, 2] },
          { id: "9", type: "box", rectangle: [2, 14, 1, 2] },
          */
      ],
    },
  ],
};
const initialProject = sampleProject;
function App() {
  const [project, projectDispatch] = useReducer(projectReducer, initialProject);
  return (
    <ProjectContext.Provider value={project}>
      <ProjectDispatchContext.Provider value={projectDispatch}>
        <UiStateContextProvider>
          <ConfirmProvider>
            <Box className={styles.Container}>
              <Box className={styles.AppBar}>
                <ButtonAppBar />
              </Box>
              <Box className={styles.FlexMargin}></Box>
              <PanelGroup
                className={styles.PanelRow}
                /*autoSaveId="panel-widths"*/
                direction="horizontal"
              >
                <Box className={styles.FlexMargin}></Box>
                <Panel
                  className={styles.ResizablePanel}
                  defaultSize={20}
                  minsize={5}
                >
                  <Box
                    className={`${styles.PanelInner} ${styles.PageListPanel}`}
                  >
                    <PageList></PageList>
                  </Box>
                </Panel>
                <PanelResizeHandle className={styles.ResizeHandleOuter} />
                <Panel
                  className={styles.ResizablePanel}
                  defaultSize={45}
                  minsize={20}
                >
                  <Box className={styles.PanelInner}>
                    <SketchArea></SketchArea>
                  </Box>
                </Panel>
                <PanelResizeHandle className={styles.ResizeHandleOuter} />
                <Panel
                  className={styles.ResizablePanel}
                  defaultSize={35}
                  minsize={20}
                >
                  <Box className={`${styles.PanelInner} ${styles.EditorPanel}`}>
                    <Box className={styles.EditorPanelInner}>
                      <MyTextEditor />
                    </Box>
                  </Box>
                </Panel>
                <Box className={styles.FlexMargin}></Box>
              </PanelGroup>
              <Box className={styles.FlexMargin}></Box>
            </Box>
          </ConfirmProvider>
        </UiStateContextProvider>
      </ProjectDispatchContext.Provider>
    </ProjectContext.Provider>
  );
}

export default App;
