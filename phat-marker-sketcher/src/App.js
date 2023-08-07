import * as React from "react";
import { useReducer } from "react";
import ButtonAppBar from "./components/ButtonAppBar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import styles from "./styles.module.css";
import PageList from "./components/PageList";
import SketchArea from "./components/SketchArea";
import { Box } from "@mui/material";
import MyTextEditor from "./components/MyTextEditor";
import {
  ProjectContext,
  ProjectDispatchContext,
  projectReducer,
} from "./components/ProjectContext";

function App() {
  const initialProject = {
    projectName: "My Project Name",
    version: 0,
    pages: [
      {
        pageName: "Pagina Primus",
        elements: [
          { id: "1", type: "box", rectangle: [2, 4, 8, 4] },
          { id: "3", type: "box", rectangle: [2, 8, 8, 4] } /*
          { id: "4", type: "box", rectangle: [3, 6, 6, 5] },
          { id: "5", type: "box", rectangle: [2, 13, 4, 0] },
          { id: "6", type: "text", rectangle: [2, 1, 8, 1] },
          { id: "8", type: "text", rectangle: [2, 2, 8, 2] },
          { id: "9", type: "box", rectangle: [2, 14, 1, 2] },*/,
        ],
      },
    ],
  };
  const [project, projectDispatch] = useReducer(projectReducer, initialProject);
  return (
    <ProjectContext.Provider value={project}>
      <ProjectDispatchContext.Provider value={projectDispatch}>
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
              <Box className={`${styles.PanelInner} ${styles.PageListPanel}`}>
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
              <Box className={styles.PanelInner}>
                <MyTextEditor />
              </Box>
            </Panel>
            <Box className={styles.FlexMargin}></Box>
          </PanelGroup>
          <Box className={styles.FlexMargin}></Box>
        </Box>
      </ProjectDispatchContext.Provider>
    </ProjectContext.Provider>
  );
}

export default App;
