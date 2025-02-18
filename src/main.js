import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import "@arcgis/map-components/components/arcgis-feature-table";
import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-map";
import "@esri/calcite-components/components/calcite-shell";
import "./style.css";

const arcgisLayerList = document.querySelector("arcgis-layer-list");
const arcgisFeatureTable = document.querySelector("arcgis-feature-table");

handleArcgisLayerListReady();

async function handleArcgisLayerListReady() {
  await arcgisLayerList.componentOnReady();
  arcgisLayerList.listItemCreatedFunction = (event) => {
    event.item.panel = {
      content: "legend",
      open: true,
    };
  };

  reactiveUtils.watch(
    () => arcgisLayerList.selectedItems.getItemAt(0),
    (item) => {
      arcgisFeatureTable.layer = item.layer;
    }
  );
}
