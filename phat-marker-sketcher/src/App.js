import * as React from "react";
import ButtonAppBar from "./components/ButtonAppBar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import styles from "./styles.module.css";
import PageList from "./components/PageList";
import SketchArea from "./components/SketchArea";
import { Box } from "@mui/material";

function App() {
  return (
    <>
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
          <Panel className={styles.ResizablePanel} defaultSize={20} minsize={5}>
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
            <Box className={styles.PanelInner}>Document</Box>
          </Panel>
          <Box className={styles.FlexMargin}></Box>
        </PanelGroup>
        <Box className={styles.FlexMargin}></Box>
      </Box>
    </>
  );
}

export default App;
