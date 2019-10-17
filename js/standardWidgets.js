"use strict";

//#region load standard widgets
/**
 * loadStandardWidgets - Load All Non Custom esri JS widgets
 * @param {any} view
 */
const loadStandardWidgetsToView = (view, Home, Search, Expand, BasemapGallery, LayerList) => {

    try {

        //LoadHomeButton
        if (_showHomeButton) {
            const homeBtn = createHomeButton(view, Home);
            view.ui.add(homeBtn, "top-left");
        }

        //Load Basemap Gallery
        let basemapExpand;
        if (_showBaseMapGallery) {
            const basemapGallery = createBasemapGallery(view, BasemapGallery);
            basemapExpand = createBasemapExpand(basemapGallery, view, Expand);
        }

        //Load LayerList without Legend
        let layerListExpand;
        if (_showLayerList && !_showLegend) {
            const layerList = createLayerList(view, LayerList);

            //create Expand for LayerList
            layerListExpand = createLayerListExpand(layerList, view, Expand);
        }

        //Load LayerList and Legend combined
        if (_showLayerList && _showLegend) {
            const layerList = createLayerListWithLegend(view, LayerList);

            //Create Expand for LayerList
            layerListExpand = createLayerListExpand(layerList, view, Expand);
        }

        //load underground
        let undergroundExpand;         
        if(_showUnderground){
            const underground = document.getElementById("underGroundMenu");
            undergroundExpand = createUndergroundExpand(underground, view, Expand);
        }

        //load basemap, layerlist and underground expands to view
        loadExpandsToViewUi(view, basemapExpand, layerListExpand, undergroundExpand);

        //Load Search Tool
        if (_showSearchTool) {
            const searchWidget = createSearchWidget(view, Search);
            view.ui.add(searchWidget, { position: "top-right", index: 0 });
        }
    }
    catch (error) {
        console.error("error!: " + error);
    }
}

/**
 * createHomeButton - place Home Button in View
 * @param {any} view
 */
const createHomeButton = (view, Home) => {
    return new Home({
        view: view
    });
}


/**
 * loadSearchToolToView - place Search Tool in View
 * @param {any} view
 */
const createSearchWidget = (view, Search) => {
    return new Search({
        view: view
    });
}


/**
 * loadBaseMapGallery - put basemap gallery in view in an expand
 * @param {any} view
 */
const createBasemapGallery = (view, BasemapGallery) => {
    return new BasemapGallery({
        view: view,
        container: document.createElement("div")
    });
    
}

/**
 * createBasemapExpand - create expand for basemap gallery
 * @param {any} basemapGallery
 * @param {any} view
 */
const createBasemapExpand = (basemapGallery, view, Expand) => {
    return new Expand({
        view: view,
        content: basemapGallery
    });

}

const createUndergroundExpand = (undergroundContent, view, Expand) => {
    return new Expand({
        view: view,
        content: undergroundContent,
        expandIconClass: 'esri-icon-down-arrow-circled'
    });
}

/**
 * createLayerListExpand - create expand for layer list
 * @param {any} layerList
 * @param {any} view
 */
const createLayerListExpand = (layerList, view, Expand) => {
    return new Expand({
        view: view,
        content: layerList
    });
}

/**
 * createLayerList - Create LayerList without Legend
 * @param {any} view
 */
const createLayerList = (view, LayerList) => {
        return new LayerList({
        view: view,
        container: document.createElement("div")
    });
}

/**
 * createLayerListWithLegend - create LayerList with Legend under each later
 * @param {any} view
 */
const createLayerListWithLegend = (view, LayerList) => {
    return new LayerList({
        view: view,
        container: document.createElement("div"),
        listItemCreatedFunction: (event) => {
            const item = event.item;
            if (item.layer.type != "group") {
                // don't show legend twice
                item.panel = {
                    content: "legend",
                    open: true
                };
            }
        }
    });
}


/**
 * loadExpandsToViewUi - Loads all Expands together
 * @param {any} view
 */
const loadExpandsToViewUi = (view, basemapExpand, layerListExpand, undergroundExpand) => {
    if (_showBaseMapGallery && _showLayerList) {
        if (basemapExpand && layerListExpand) {
            view.ui.add([basemapExpand, layerListExpand], "top-left");
        }
    }
    else if (_showBaseMapGallery && !_showLayerList) {
        if (basemapExpand) {
            view.ui.add([basemapExpand], "top-left");
        }
    }
    else if (!_showBaseMapGallery && _showLayerList) {
        if (layerListExpand) {
            view.ui.add([layerListExpand], "top-left");
        }
    }
    if(_showUnderground){
        view.ui.add(undergroundExpand, "top-left");
    }    
}



//#endregion load standard widgets
   
       