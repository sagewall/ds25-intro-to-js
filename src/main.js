import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import "@arcgis/map-components/components/arcgis-feature-table";
import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-map";
import "@esri/calcite-components/components/calcite-shell";
import "./style.css";

// Get a reference to the layer list element
const layerList = document.getElementById("layer-list");

// Get a reference to the feature table element
const featureTable = document.getElementById("feature-table");

// Set the listItemCreatedFunction to add a legend to each item in the layer list
// This function is called each time a new item is created in the layer list
layerList.listItemCreatedFunction = (event) => {
  // Set the list item panel's content to be a legend
  event.item.panel = {
    content: "legend"
  };
};

// A function to watch the selected layer in the layer list
// and set the layer of the feature table to the selected layer
async function initLayerWatch() {
  // Wait for the layer list component to be ready
  await layerList.componentOnReady();
  reactiveUtils.watch(
    // A function that returns the value to watch
    // In this case, the first selected item in the layer list
    () => layerList.selectedItems.getItemAt(0),

    // A function that runs when the value above changes
    // In this case, set the layer of the feature table to the selected item's layer
    (item) => {
      featureTable.layer = item.layer;
    }
  );
}

// Call the initLayerWatch function to watch the selected layer in the layer list
initLayerWatch();
