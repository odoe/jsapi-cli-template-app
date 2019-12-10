import ResizeObserver from "resize-observer-polyfill";

// Widgets
import LayerList from "esri/widgets/LayerList";
import Legend from "esri/widgets/Legend";

import esri = __esri;

export function initWidgets(view: esri.MapView | esri.SceneView) {
  const legend = new Legend({ view });
  const layerList = new LayerList({ view });

  // interactions
  const legendContainer = document.getElementById(
    "widget-legend"
  ) as HTMLElement;
  const layerListContainer = document.getElementById(
    "widget-layerlist"
  ) as HTMLElement;
  const widgetPanel = document.getElementById(
    "widget-panel"
  ) as HTMLCalciteShellPanelElement;

  view.padding = {
    ...view.padding,
    left: widgetPanel.offsetWidth
  };

  if (legendContainer) {
    legend.container = legendContainer;
  }
  if (layerListContainer) {
    layerList.container = layerListContainer;
  }

  // toggle widgets
  const actions = Array.from(document.querySelectorAll("calcite-action"));
  for (const action of actions) {
    action.addEventListener("click", () => {
      if (action.text === "Layers") {
        layerListContainer.classList.toggle("hidden");
        legendContainer.classList.add("hidden");
      } else {
        layerListContainer.classList.add("hidden");
        legendContainer.classList.toggle("hidden");
      }
      widgetPanel.collapsed =
        layerListContainer.classList.contains("hidden") &&
        legendContainer.classList.contains("hidden");
    });
  }

  // listen for widget panel to be to be resized
  const rObserver = new ResizeObserver(() => {
    view.padding = {
      ...view.padding,
      left: widgetPanel.offsetWidth
    };
  });

  rObserver.observe(widgetPanel);
}
