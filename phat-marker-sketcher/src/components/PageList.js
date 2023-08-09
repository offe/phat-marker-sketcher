import * as React from "react";
import { useContext } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { Typography } from "@mui/material";
import { ProjectContext, UiStateContext } from "./ProjectContext";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function PageList() {
  const project = useContext(ProjectContext);
  const { elementType, setElementType } = useContext(UiStateContext);

  const handleElementTypeChange = (event) => {
    setElementType(event.target.value);
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
        <AccordionDetails>Nothing here yet</AccordionDetails>
      </Accordion>
    </>
  );
}
