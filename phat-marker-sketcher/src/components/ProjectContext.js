import { createContext } from "react";

export const ProjectContext = createContext(null);
export const ProjectDispatchContext = createContext(null);

export const emptyProject = {
  projectName: "Untitled Project",
  version: 0,
  description: [],
  pages: [
    {
      pageName: "Page 1",
      description: [],
      elements: [],
    },
  ],
};

export const _projectReducer = (project, action) => {
  switch (action.type) {
    case "set-project": {
      return { ...action.project, projectId: (project.projectId || 1) + 1 };
    }
    case "rename-project": {
      if (project.projectName !== action.projectName) {
        return {
          ...project,
          projectName: action.projectName,
        };
      } else {
        return project;
      }
    }

    case "rename-page": {
      if (project.pages[action.pageNumber].pageName !== action.pageName) {
        return {
          ...project,
          pages: [{ ...project.pages[0], pageName: action.pageName }],
        };
      } else {
        console.log("No rename needed");
        return project;
      }
    }
    case "set-elements": {
      return {
        ...project,
        pages: [{ ...project.pages[0], elements: action.elements }],
      };
    }
    default:
      break;
  }
};

export const projectReducer = (project, action) => {
  console.log(action);
  const newProject = _projectReducer(project, action);
  console.log(newProject);
  return newProject;
};
