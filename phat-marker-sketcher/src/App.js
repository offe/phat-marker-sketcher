import * as React from "react";
import ButtonAppBar from "./components/ButtonAppBar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import styles from "./styles.module.css";
import PageList from "./components/PageList";
import SketchArea from "./components/SketchArea";

function App() {
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.AppBar}>
          <ButtonAppBar />
        </div>
        <div className={styles.PanelRowOuter}>
          <PanelGroup
            className={styles.PanelRowInner}
            /*autoSaveId="example"*/
            direction="horizontal"
          >
            <Panel className={styles.Panel} defaultSize={20} minsize={5}>
              <div className={styles.PanelContent}>
                <PageList></PageList>
              </div>
            </Panel>
            <PanelResizeHandle className={styles.ResizeHandleOuter} />
            <Panel className={styles.Panel} defaultSize={45} minsize={20}>
              <div className={styles.PanelContent}>
                <SketchArea></SketchArea>
              </div>
            </Panel>
            <PanelResizeHandle className={styles.ResizeHandleOuter} />
            <Panel className={styles.Panel} defaultSize={35} minsize={20}>
              <div className={styles.PanelContent}>Document</div>
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </>
  );
}

export default App;
