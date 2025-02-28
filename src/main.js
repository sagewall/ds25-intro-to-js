import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import "@arcgis/map-components/components/arcgis-feature-table";
import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-map";
import "@esri/calcite-components/components/calcite-shell";
import "./style.css";

const arcgisLayerList = document.querySelector("#layer-list");
const arcgisFeatureTable = document.querySelector("#feature-table");

arcgisLayerList.listItemCreatedFunction = (event) => {
  event.item.panel = {
    content: "legend",
    open: true,
  };
};

handleArcgisLayerListReady();

async function handleArcgisLayerListReady() {
  await arcgisLayerList.componentOnReady();
  reactiveUtils.watch(
    () => arcgisLayerList.selectedItems.getItemAt(0),
    (item) => {
      arcgisFeatureTable.layer = item.layer;
    }
  );
}
