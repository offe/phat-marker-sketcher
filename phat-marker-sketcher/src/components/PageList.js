import * as React from "react";
import { useContext } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { IconButton, Typography } from "@mui/material";
import {
  ProjectContext,
  ProjectDispatchContext,
  UiStateContext,
} from "./ProjectContext";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import DeleteIcon from "@mui/icons-material/Delete";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function PageList() {
  const project = useContext(ProjectContext);
  const projectDispatch = useContext(ProjectDispatchContext);
  const {
    elementType,
    setElementType,
    selectNextElementId,
    setSelectedElementId,
    setMainState,
    selectedElementId,
  } = useContext(UiStateContext);

  const handleElementTypeChange = (event) => {
    setElementType(event.target.value);
  };

  const handleSelectNextElement = () => {
    selectNextElementId(project.pages[0].elements, 1);
  };
  const handleSelectPreviousElement = () => {
    selectNextElementId(project.pages[0].elements, -1);
  };
  const handleDeleteElement = () => {
    projectDispatch({
      type: "delete-element",
      pageNumber: 0,
      elementId: selectedElementId,
    });
    setSelectedElementId(undefined);
    setMainState("idle");
  };

  const elementTypes = [
    { id: "box", name: "Box" },
    { id: "text", name: "Text" },
  ];
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography /*variant="h5"*/>{`Project pages`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            style={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
          >
            {project.pages.map(({ pageName }, i) => (
              <TreeItem
                key={i}
                nodeId={`page-${i}`}
                label={pageName}
              ></TreeItem>
            ))}
          </TreeView>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography /*variant="h5"*/>{`Element types`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup value={elementType} onChange={handleElementTypeChange}>
              {elementTypes.map(({ id, name }, i) => (
                <FormControlLabel
                  key={id}
                  value={id}
                  control={<Radio size="small" />}
                  label={name}
                  sx={{ fontSize: "6px" }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{`Element details`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <IconButton aria-label="delete" onClick={handleDeleteElement}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="previous element"
            onClick={handleSelectPreviousElement}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            aria-label="next element"
            onClick={handleSelectNextElement}
          >
            <NavigateNextIcon />
          </IconButton>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
