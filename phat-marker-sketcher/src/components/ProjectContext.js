import { createContext, useState } from "react";

export const ProjectContext = createContext(null);
export const ProjectDispatchContext = createContext(null);

export const UiStateContext = createContext(null);

export const UiStateContextProvider = (props) => {
  const [elementType, setElementType] = useState("box");
  const [selectedElementId, setSelectedElementId] = useState(undefined);
  return (
    <UiStateContext.Provider
      value={{
        elementType,
        setElementType,
        selectedElementId,
        setSelectedElementId,
      }}
    >
      {props.children}
    </UiStateContext.Provider>
  );
};

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

const getGroupedDescriptionBlocks = (visualBlocks, ids) => {
  const { groupedBlocks } = visualBlocks.reduce(
    ({ groupedBlocks, currentId }, block, i) => {
      //console.log({ i, blockId: block.id });
      if (ids.includes(block.id)) {
        currentId = block.id;
        //console.log("New identified id");
        //console.log({ currentId });
      } else {
        (groupedBlocks[currentId] ??= []).push(
          visualBlockToDescriptionElement(block)
        );
        //console.log(`Adding block to description to ${currentId}`);
      }
      return { groupedBlocks, currentId };
    },
    {
      groupedBlocks: {},
      currentId: undefined,
    }
  );
  return groupedBlocks;
};

const visualBlockToDescriptionElement = (visualBlock) => {
  switch (visualBlock.type) {
    case "paragraph": {
      return { type: "text", data: { text: visualBlock.text } };
    }
    case "header": {
      return { type: visualBlock.type, data: { text: visualBlock.text } };
    }
    case "list": {
      return {
        type: visualBlock.type,
        data: { style: visualBlock.style, items: visualBlock.items },
      };
    }
    case "table": {
      return {
        type: visualBlock.type,
        data: {
          withHeadings: visualBlock.withHeadings,
          content: visualBlock.content,
        },
      };
    }
    default:
      //console.log({ visualBlock });
      throw new Error(`Unknown block type: ${visualBlock.type}`);
      break;
  }
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
        //console.log("No rename needed");
        return project;
      }
    }
    case "set-elements": {
      return {
        ...project,
        pages: [{ ...project.pages[0], elements: action.elements }],
      };
    }
    case "editor-change": {
      //console.log({ where: "ProjectDispatch editor-change" });
      const { visualBlocks } = action;
      const ids = [
        "project-name",
        "page-0",
        ...project.pages[0].elements.map(({ id }) => `element-header-${id}`),
      ];
      const descriptionBlocks = getGroupedDescriptionBlocks(visualBlocks, ids);
      //console.log({ descriptionBlocks });
      //console.log({ project });

      const projectName =
        visualBlocks.find(({ id }) => id === "project-name")?.text || "(none)";
      const firstPageName =
        visualBlocks.find(({ id }) => id === "page-0")?.text || "(none)";

      return {
        ...project,
        projectName,
        description: descriptionBlocks["project-name"] ?? [],
        pages: [
          {
            ...project.pages[0],
            pageName: firstPageName,
            description: descriptionBlocks["page-0"] ?? [],
            elements: project.pages[0].elements.map((element) => ({
              ...element,
              name:
                visualBlocks.find(
                  ({ id }) => id === `element-header-${element.id}`
                )?.text || "",
              description:
                descriptionBlocks[`element-header-${element.id}`] ?? [],
            })),
          },
        ],
      };
    }
    default:
      break;
  }
};

export const projectReducer = (project, action) => {
  //console.log(action);
  const newProject = _projectReducer(project, action);
  //console.log(newProject);
  return newProject;
};
