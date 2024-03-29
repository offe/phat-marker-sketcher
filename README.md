# phat-marker-sketcher

A web tool for actual design using fat marker sketches

> “Design is not just what it looks like and feels like. Design is how it works.” – Steve Jobs.

Impatient? [Try the app.](https://offe.github.io/phat-marker-sketcher)

## Introduction

There is a technique in early software development stages where focus is on the big picture. What screens do we have? What kind of information is presented there? How do you navigate between these pages? Starting digging into more details that early will slow down the progress and may cause the team to get stuck in early ideas before the great ideas are reached.

Read more about Fat marker sketches:

- [Basecamp](https://basecamp.com/shapeup/1.3-chapter-04#fat-marker-sketches)
- [Dom Habersack](https://domhabersack.com/fat-marker-sketches)

![Sketch of UI for Phat Marker Sketcher](images/phamask1.png)

Phat Marker Sketcher is a tool to encourage this way of working. The focus is on simple sketches, without graphical details and styles. The sketches comes with a text document describing the different elements of the design. A project in Phat Marker Sketcher is a collection of these one page sketches that can describe a full application or a new feature in an existing product.

The style should be like quickly hand drawn pictures with a fat tipped marker. More like the word squiggles in the picture above, and not like the super straight boxes.

### The parts

There are four main parts in the app:

1. The menu. For loading and saving projects initially. May contain settings, login, sharing etc.
2. A list of pages in the project. Each page has a name. There is an "Add page" button at the bottom
3. The drawing area. A screen (that you can draw outside) with the drawn elements. There is a visible grid that everything snaps to default. The drawing is completely monochrone, but controls have colors (like draggable corners, the menu)
4. Document pane. H1 is the project name. H2 are the page names. H3 are elements on the page. These headings are created when pages or elements are created. The project and page names are set by editing the headers in the document.

The space given to the three panes (pages, sketch, documentation) can be adjusted by dragging the separators between them.

### The graphical elements

All elements are defined by their top-left and bottom-right positions and a type, like button or text. The position can be changed by dragging entire elements, and size can be changed by draggin corners or sides.
The elements can links to pages. Editing the type of element is done by opening a modal using a menu button that is shown when an element is selected (or perhaps it's a floating mini menu like in Apple Freeform?).

## Roadmap

It would be neat with a figma style web application where multiple people can collaborate in real time and share documents as previews and so on. But to get somewhere we start with something that can be used by one user, and that does not require any backend.

The first step is a simple frontend only app, where you can load and save JSON-files with a project.

### Limitations, first version

- No "variants" of pages (used later to show same page on different devices, like desktop, landscape phone or tablet).
- No backend, files loaded and saved
- Few basic elements, perhaps only boxes and text
- Desktop only, fairly wide screens assumed
- Not handling touch events
- No links to pages from elements

## Implementation

The app is written in javascript (and possibly soon typescript). It uses the React framework. The drawing feature is implemented using a Canvas.

The document editor includes the possibility to change to bold, italic and so on. It supports lists and tables. The document editor part is using editorjs.

The undo feature is central in these types of apps, so all interactions are soon to be modelled using the Command Pattern. The last couple of hundred actions will also saved in the JSON export.

## Future

### Element types

- Box
- Text button
- Empty Button
- Label
- Multi line text
- Image
- Icon
- Avatar
- Hamburger button
- Close button (X)
- Left button
- Right button
- Dropdown
- Line
- Checklist
- Input field

### Devices / Screens

- Desktop
  - Small
  - Medium
  - Large
- Small phone
  - Portrait
  - Landscape
- Large phone
  - Portrait
  - Landscape
- Tablet
  - Portrait
  - Landscape

Or perhaps a couple of named devices? A device would only be width and height of the screen in the sketch.

## Todo

- Indicate the element of the active block (go up in the blocks until an element header is found, stop at page headers)

- Make it possible to add new pages
- Add new actions (add-element) to project reducer (everything is using set-elements)
- Have a look at undo/redo
- iPad support
- Change paper size
- Change grid size
- Add sub grid
- Have a look on how often stuff is redrawn for no reason
- Expand mainState into dict
- Add lasso (when shiftKey is true for mousemove when otherwise draw would start)
- Add multiselect - drag and delete should work (not resize)
- Set minimum size for elements to 1, 1 - no more weird inverted lines

## Questions

How to simplify adding a bunch of dynamic, hand drawn looking elements? https://github.com/LingDong-/skeleton-tracing perhaps? Or thinning using imagemagick and then trace bitmap in Inkscape?
