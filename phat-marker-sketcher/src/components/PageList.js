import * as React from "react";
import { useContext } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { Typography } from "@mui/material";
import { ProjectContext } from "./ProjectContext";

export default function PageList() {
  const project = useContext(ProjectContext);
  return (
    <>
      <Typography variant="h5">{`Pages in ${project.projectName}`}</Typography>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        style={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        <TreeItem nodeId="1" label="Login">
          <TreeItem nodeId="2" label="Phone, landscape" />
        </TreeItem>
        <TreeItem nodeId="3" label="Start">
          <TreeItem nodeId="4" label="Phone, landscape" />
        </TreeItem>
        <TreeItem nodeId="5" label="Settings">
          <TreeItem nodeId="6" label="Phone, landscape" />
        </TreeItem>
        <TreeItem nodeId="1" label="Login">
          <TreeItem nodeId="2" label="Phone, landscape" />
        </TreeItem>
        <TreeItem nodeId="3" label="Start">
          <TreeItem nodeId="4" label="Phone, landscape" />
        </TreeItem>
        <TreeItem nodeId="5" label="Settings">
          <TreeItem nodeId="6" label="Phone, landscape" />
        </TreeItem>
        <TreeItem nodeId="1" label="Login">
          <TreeItem nodeId="2" label="Phone, landscape" />
        </TreeItem>
        <TreeItem nodeId="3" label="Start">
          <TreeItem nodeId="4" label="Phone, landscape" />
        </TreeItem>
        <TreeItem nodeId="5" label="Settings">
          <TreeItem nodeId="6" label="Phone, landscape" />
        </TreeItem>
        <TreeItem nodeId="1" label="Login">
          <TreeItem nodeId="2" label="Phone, landscape" />
        </TreeItem>
        <TreeItem nodeId="3" label="Start">
          <TreeItem nodeId="4" label="Phone, landscape" />
        </TreeItem>
        <TreeItem nodeId="5" label="Settings">
          <TreeItem nodeId="6" label="Phone, landscape" />
        </TreeItem>
      </TreeView>
    </>
  );
}
