import * as React from "react";
import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton, Typography, useMediaQuery } from "@mui/material";
import {
  ProjectContext,
  ProjectDispatchContext,
  emptyProject,
} from "./ProjectContext";
import { downloadAsTextFile } from "../utils/downloadAsFile";
import { useConfirm } from "material-ui-confirm";
import { useTheme } from "@emotion/react";

export default function ButtonAppBar() {
  const confirm = useConfirm();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isReallySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const project = useContext(ProjectContext);
  const projectDispatch = useContext(ProjectDispatchContext);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const startNewProject = () => {
    projectDispatch({ type: "set-project", project: emptyProject });
  };

  const downloadProjectAsJson = () => {
    const { projectId, ...projectWithoutId } = project;
    downloadAsTextFile(
      JSON.stringify(projectWithoutId, null, 2),
      `${project.projectName}.phatmask.json`
    );
  };

  const readFileContents = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        resolve(e.target.result);
      };

      reader.onerror = function (e) {
        reject(e.target.error);
      };

      reader.readAsText(file);
    });
  };

  const loadFile = async () => {
    try {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.style.display = "none";

      const file = await new Promise((resolve, reject) => {
        fileInput.addEventListener("change", (event) => {
          const selectedFile = event.target.files[0];
          if (selectedFile) {
            resolve(selectedFile);
          } else {
            reject(new Error("No file selected"));
          }
        });

        document.body.appendChild(fileInput);
        fileInput.click();

        // Remove the file input after use
        fileInput.addEventListener("focusout", () => {
          fileInput.removeEventListener("change", handleFileChange);
          fileInput.remove();
        });

        const handleFileChange = (event) => {
          fileInput.resolve(event.target.files[0]);
        };
      });

      return await readFileContents(file);
    } catch (error) {
      throw new Error("Error loading file: " + error);
    }
  };

  const replaceCurrentProject = (fileContents) => {
    try {
      const project = JSON.parse(fileContents);
      projectDispatch({ type: "set-project", project });
    } catch (error) {
      console.error(error.message);
    }
  };

  const confirmReplaceCurrentProject = async (fileContents) => {
    try {
      await confirm({
        title: "Load and replace current project?",
        description:
          "Loading a project will replace the one you are working on. Any unsaved work will be lost. ",
        confirmationText: "Load and replace",
      });
      replaceCurrentProject(fileContents);
    } catch (error) {
      console.log("Load project cancelled.");
    }
  };

  const loadProjectFile = async () => {
    try {
      const contents = await loadFile();
      confirmReplaceCurrentProject(contents);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleProjectDragOver = (event) => {
    event.preventDefault();
    //event.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleProjectDragEnter = (event) => {
    event.preventDefault();
    //event.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleProjectDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleProjectDrop = async (event) => {
    event.preventDefault();
    //event.stopPropagation();
    setIsDraggingOver(false);

    try {
      const file = event.dataTransfer.files[0];
      if (file) {
        const contents = await readFileContents(file);
        confirmReplaceCurrentProject(contents);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Box style={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ my: 2, mr: 3 }}>
            {isReallySmallScreen ? "🖊️" : "🖊️ P️hat Marker Sketcher"}
          </Typography>
          <Button sx={{ color: "white" }} onClick={startNewProject}>
            {isSmallScreen ? "New" : "New project"}
          </Button>
          <Button sx={{ color: "white" }} onClick={downloadProjectAsJson}>
            {isSmallScreen ? "Save" : "Save project"}
          </Button>
          <Button
            sx={{
              color: "white",
              backgroundColor: `${
                isDraggingOver ? "primary.light" : "primary.main"
              }`,
            }}
            onClick={loadProjectFile}
            onDrop={handleProjectDrop}
            onDragOver={handleProjectDragOver}
            onDragEnter={handleProjectDragEnter}
            onDragLeave={handleProjectDragLeave}
            draggable={false}
          >
            {isSmallScreen ? "Load" : "Load project"}
          </Button>
          <Box sx={{ flexGrow: 1 }} /> {/* Flexible spacer */}
          <a
            href="https://github.com/offe/phat-marker-sketcher"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton edge="end" color="inherit" sx={{ color: "white" }}>
              <GitHubIcon />
            </IconButton>
          </a>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
