import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import "@arcgis/map-components/components/arcgis-feature-table";
import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-map";
import "@esri/calcite-components/components/calcite-shell";
import "./style.css";

const arcgisLayerList = document.getElementById("layer-list");
const arcgisFeatureTable = document.getElementById("feature-table");

arcgisLayerList.listItemCreatedFunction = (event) => {
  event.item.panel = {
    content: "legend"
  };
};

async function handleArcgisLayerListReady() {
  await arcgisLayerList.componentOnReady();
  reactiveUtils.watch(
    () => arcgisLayerList.selectedItems.getItemAt(0),
    (item) => {
      arcgisFeatureTable.layer = item.layer;
    }
  );
}

handleArcgisLayerListReady();
