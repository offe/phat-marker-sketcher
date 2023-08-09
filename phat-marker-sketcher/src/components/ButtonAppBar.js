import * as React from "react";
import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton, Typography } from "@mui/material";
import {
  ProjectContext,
  ProjectDispatchContext,
  emptyProject,
} from "./ProjectContext";
import { downloadAsTextFile } from "../utils/downloadAsFile";

export default function ButtonAppBar() {
  const project = useContext(ProjectContext);
  const projectDispatch = useContext(ProjectDispatchContext);

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

  const loadProjectFile = async () => {
    try {
      const contents = await loadFile();
      replaceCurrentProject(contents);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleProjectDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleProjectDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const file = event.dataTransfer.files[0];
      if (file) {
        const contents = await readFileContents(file);
        replaceCurrentProject(contents);
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
            🖊️ Phat Marker Sketcher
          </Typography>
          <Button sx={{ color: "white" }} onClick={startNewProject}>
            New project
          </Button>
          <Button sx={{ color: "white" }} onClick={downloadProjectAsJson}>
            Save project
          </Button>
          <Button
            sx={{ color: "white" }}
            onClick={loadProjectFile}
            onDrop={handleProjectDrop}
            onDragOver={handleProjectDragOver}
          >
            Load project
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
