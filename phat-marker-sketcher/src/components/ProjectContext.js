import { createContext } from "react";

export const ProjectContext = createContext(null);
export const ProjectDispatchContext = createContext(null);

export const projectReducer = (project, action) => {
  switch (action.type) {
    case "rename-project": {
      return { ...project, projectName: action.projectName };
    }
    default:
      break;
  }
};
