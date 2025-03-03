import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import "@arcgis/map-components/components/arcgis-feature-table";
import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-map";
import "@esri/calcite-components/components/calcite-shell";
import "./style.css";

const layerList = document.getElementById("layer-list");
const featureTable = document.getElementById("feature-table");

layerList.listItemCreatedFunction = (event) => {
  event.item.panel = {
    content: "legend"
  };
};

async function handlelLayerListReady() {
  await layerList.componentOnReady();
  reactiveUtils.watch(
    () => layerList.selectedItems.getItemAt(0),
    (item) => {
      featureTable.layer = item.layer;
    }
  );
}

handlelLayerListReady();
