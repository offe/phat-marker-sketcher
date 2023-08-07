import { createContext } from "react";

export const ProjectContext = createContext(null);
export const ProjectDispatchContext = createContext(null);

export const projectReducer = (project, action) => {
  switch (action.type) {
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
