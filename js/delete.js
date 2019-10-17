"use strict";
require([
    "esri/WebScene",
    "esri/views/SceneView",
    "esri/config",
    "esri/widgets/Home",
    "esri/widgets/Popup",
    "esri/widgets/Search",
    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery",
    "esri/widgets/LayerList",
    "esri/core/Collection",
    "esri/core/promiseUtils",
    "esri/tasks/support/Query",
    "esri/geometry/Circle",
    "esri/widgets/Legend",
    "esri/layers/FeatureLayer"
], function (WebScene, SceneView, esriConfig, Home, Popup, Search, Expand, BasemapGallery, LayerList, Collection, promiseUtils, Query, Circle, Legend, FeatureLayer) {

    //esriConfig.portalUrl = "https://myHostName.esri.com/arcgis";
    //esriConfig.portalUrl = "https://portal1061.ana-technology.com/portal/home";
    //esriConfig.defaults.io.corsEnabledServers.push("portal1061.ana-technology.com");
    //esriConfig.defaults.io.corsEnabledServers;
    //esriConfig.portalUrl = "https://portal1061.ana-technology.com/arcgis";
    esriConfig.portalUrl = "https://portal1061.ana-technology.com/portal/";
    //esriConfig.portalUrl = "https://susz055302/portal/home"; //server name gives "Certificate Common Name Invalid" error

    let showSearchTool = true;
    let showBaseMapGallery = true;
    let showLayerList = true;
    let showIdentifyTool = false; //refactor for Popup on individual layers - cwc 7/30/19
    let showHomeButton = true;
    let showFilter = false;
    let showLegend = true;

    //new button 1/29/19
    //var mockUpURL = "https://shpr2balsamiq2019.azurewebsites.net"; //<- this is the azure hosted mockup
    var mockUpURL = "https://shrp2mockupwebform2019.azurewebsites.net"; //<- this is the azure hosted mockup - updated with new logo 1/31/19

    // load webscene from ArcGIS Online
    const map = new WebScene({
        //portalItem: {
        //    id: "0359bb9202614d7ca2bd0acc278422d6" //<- esri scene
        //}
        //portalItem: {
        //    id: "c31086aaba654002a6863be2efbc0744" //< - public Public Elec SUDA
        //}

        // portalItem: {
        //     id: "82c12c56f5284ab4913f4f6c7a4a02d8" //< - public Global All SUDA -public enterprise permisssions
        //}
        //    portalItem: {
        //  id: "870cf18c2fcc4613b3d676725be20870" //local TXDOT group permissions only
        //}
        // portalItem: {
        //     id: "4b21acc89d61413a81927be7d98a3332" //< - public Global All SUDA -public enterprise permisssions - NEW 1/30/19
        //}

        //portalItem: {
        //    id: "959e787ba9854f17b94425e7b2474b83" //< -  LOCAL EVERYONE All SUDA -Ty - 2/13/
        //}

        //   portalItem: {
        //    id: "d34418308cf94432ad0cc66e9af12aa7" //< -  LOCAL EVERYONE Test 3D, 2D background image and NO Eleveantion Surface - 7/24/19
        //}

        //  portalItem: {
        //      id: "5eaad8236def4aa6bca3eef86cf958dc" //< -  LOCAL EVERYONE Test 3D, 2D background image and  New Eleveantion Surface - 7/24/19
        //}

        //created with pro 7/30/19
        //portalItem: {
        //    id: "c29c3f7640244d7e839e468358ed0538" //< -  LOCAL EVERYONE Test 3D,  NAIP_1m_tif 2D background image and HGAC_Grid5ft Elevation Layer - NO esri background - 7/30/19
        //}

        //created with pro 7/30/19 - looks better with esri basemap (see through undgeround works and user doesn't have to wait on the NAIP)
        //portalItem: {
        //    id: "6e898ab4b42245499d00cf70e45c4eaf" //< -  LOCAL EVERYONE Test 3D, NAIP_1m_tif 2D background image and HGAC_Grid5ft Elevation Layer - esri topo background - 7/30/19
        //}

        portalItem: {
            id: "ddeeb3cc505440358c8674dead58160b" //< -  LOCAL EVERYONE Test 3D, NAIP_1m_tif 2D background image and HGAC_Grid5ft Elevation Layer - esri topo background - 7/30/19
        }

    });


    const view = new SceneView({
        container: "viewDiv",
        map: map
    });

    if (showFilter) {
        view.ui.add(document.getElementById("optionsDiv"), {
            position: "top-left",
            index: 0
        });
    }

    //testing
    //var query = sceneLayer.createQuery();
    //query.outFields = ["GASTYPE"];
    //sceneLayer.queryFeatures(query).then(function (result) {
    //    console.log(result.features); // print the features to the console
    //});

    //view.when(function () {
    //    // when the scene and view resolve, 
    //    console.log("starting");
    //    map.layers.forEach((l) => {
    //        console.log("inside");
    //    });
    //    console.log('middle');
    //    map.layers.forEach(function (layer) {
    //        console.log(layer.title);
    //        if (layer.title !== "NAIP_1m_tif") {
    //            //layer.definitionExpression = "GASTYPE = 'Controllable Fitting'";
    //            layer.definitionExpression = "GASTYPE = 'Valve Isolation'";
    //        }
    //        console.log(layer.definitionExpression);
    //    });
    //    console.log("ended");
    //});

    //load 3D lines styles
    view.when(function () {
        // when the scene and view resolve, 
        //console.log("starting");
        //map.layers.forEach((l) => {
        //    console.log("inside");
        //    console.log(l.title);
        //    console.log(l);
        //});
        //console.log('middle');
        map.layers.forEach(function (groupLayer) {
            //console.log("title " + groupLayer.title);
            //testing
            if (groupLayer.title === 'Gas_Lines 3D Pro') {
                try {
                    //console.log("title " + groupLayer.title);

                    //var pipePath = {
                    //    type: "line-3d",  // autocasts as new LineSymbol3D()
                    //    symbolLayers: [{
                    //        type: "path",  // autocasts as new PathSymbol3DLayer()
                    //        profile: "circle",  // creates a rectangular shape
                    //        width: 20,  // path width will also set the height to the same value
                    //        material: { color: "purple" },
                    //        cap: "round"
                    //    }]
                    //};


                    //const hwyRenderer = {
                    //    type: "simple", // autocasts as new SimpleRenderer()
                    //    symbol: {
                    //        type: "line-3d", // autocasts as new SimpleLineSymbol()
                    //        width: 10,
                    //        material: { color: "purple" }
                    //    }
                    //};

                    //const newRenderer = {
                    //    type: "simple",
                    //    symbol: {
                    //        type: "line-3d", // autocasts as new SimpleRenderer()
                    //        symbolLayers: [{
                    //            type: "path",  // autocasts as new PathSymbol3DLayer()
                    //            profile: "circle",  // creates a rectangular shape
                    //            width: 20,  // path width will also set the height to the same value
                    //            material: { color: "purple" },
                    //            cap: "round"
                    //        }]
                    //    },
                    //    visualVariables: [{
                    //        type: "size",
                    //        field: "D",
                    //        valueUnit: "feet"  //converts and extrudes all data values in inches
                    //    }]
                    //    //},
                    //    //    visualVariables: [{
                    //    //        type: "size",
                    //    //        field: "D",
                    //    //        valueUnit: "inches"  //converts and extrudes all data values in inches
                    //    //    }]
                    //};

                    //let newRenderer = new SimpleRenderer({
                    //    symbol: new LineSymbol3D({
                    //        symbolLayers: [new PathSymbol3DLayer({
                    //            material: { color: "purple" }
                    //        })]
                    //    }),
                    //    visualVariables: [{
                    //        type: "size",
                    //        field: "D",
                    //        valueUnit: "inches"  //converts and extrudes all data values in inches
                    //    }]
                    //});
                    //console.log("layer.renderer before " + groupLayer.renderer);
                    groupLayer.renderer = _line3DRenderer;
                    //console.log("layer.renderer AFTER" + groupLayer.renderer);
                }
                catch (error) {
                    console.log("error!")
                    console.error(error);
                    // expected output: ReferenceError: nonExistentFunction is not defined
                    // Note - error messages will vary depending on browser
                }
            }
            //testing
            //if (groupLayer.title === "Gas") {
            //    console.log(("LayerTitle 0 " + groupLayer.layers[0].title));
            //    console.log(("LayerTitle 1 " + groupLayer.layers[1].title));
            //    groupLayer.layers.forEach((l) => {
            //        console.log("inside");
            //        //console.log(l);
            //        if (l.title === Gas_Lines) {
            //            console.log("Gas Lines!");
            //            //});
            //        //    let newRenderer = new SimpleRenderer({
            //        //        symbol: new LineSymbol3D({
            //        //            symbolLayers: [new PathSymbol3DLayer({
            //        //                material: { color: "purple" }
            //        //            })]
            //        //        }),
            //        //        visualVariables: [{
            //        //            type: "size",
            //        //            field: "D",
            //        //            valueUnit: "inches"  //converts and extrudes all data values in inches
            //        //        }]
            //        //    });
            //        //    console.log("layer.renderer before " + layer.renderer);
            //        //    layer.renderer = newRenderer;
            //        //    console.log("layer.renderer AFTER" + layer.renderer);
            //        }
            //    });
            //}

        });
        // console.log("ended");
    });





    //testing

    if (showSearchTool) {
        const searchWidget = new Search({
            view: view
        });
    }

    if (showBaseMapGallery) {
        const basemapGallery = new BasemapGallery({
            view: view,
            container: document.createElement("div")
        });

        const bgExpand = new Expand({
            view: view,
            content: basemapGallery
        });
    }

    if (showLayerList && !showLegend) {
        console.log("ShowlayerList && NOTshowLegend");
        const layerList = new LayerList({
            view: view,
            container: document.createElement("div")
        });

        const lListExpand = new Expand({
            view: view,
            content: layerList
        });
    }

    if (showLayerList && showLegend) {
        const layerList = new LayerList({
            view: view,
            container: document.createElement("div"),
            listItemCreatedFunction: function (event) {
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

        const lListExpand = new Expand({
            view: view,
            content: layerList
        });
    }

    //if (_showLegend) {
    //    //view.when(function () {
    //        var legend = new Legend({
    //            view: view,
    //            container: document.createElement("div")
    //        });
    //        //view.ui.add(legend, "top-right");
    //        var lLegendExpand = new Expand({
    //            view: view,
    //            content: legend
    //        });
    //    //});
    //}

    if (showHomeButton) {
        const homeBtn = new Home({
            view: view
        });

        view.ui.add(homeBtn, "top-left");
    }

    var queryResults = [];

    map.when(function () {
        map.ground.navigationConstraint = {
            type: "none"
        };
        map.ground.surfaceColor = "#fff";
        map.ground.opacity = 1;

        if (showSearchTool) {
            view.ui.add(searchWidget, { position: "top-right", index: 0 });
        }
        if (showBaseMapGallery && showLayerList) {
            view.ui.add([bgExpand, lListExpand], "top-left");
        }
        else if (showBaseMapGallery == true && showLayerList == false) {
            view.ui.add([bgExpand], "top-left");
        }
        else if (showBaseMapGallery == false && showLayerList == true) {
            view.ui.add([lListExpand], "top-left");
        }


        //#region refactor for Popup on individual layers - cwc 7 / 30 / 19
        //if (showIdentifyTool) {
        //    var sceneLayerViews = [];
        //    promiseUtils.eachAlways(map.layers.items.map(function (sceneLayer) {
        //        return view.whenLayerView(sceneLayer);
        //    })).then(function (sceneLayerViewPromises) {
        //        sceneLayerViews = sceneLayerViewPromises.map(function (sceneLayerViewPromise) {
        //            if (!sceneLayerViewPromise.error)
        //                return sceneLayerViewPromise.value;
        //        });
        //        view.on("click", function (event) {
        //            view.hitTest(event).then(function (response) {
        //                //console.log("response.results.length: " + response.results.length);
        //                //console.log("response.results[0]: " + response.results[0]);
        //                if (response.results[0].graphic) {
        //                    var query = new Query({
        //                        objectIds: [response.results[0].graphic.attributes.OBJECTID],
        //                        outFields: ["*"]
        //                    });

        //                    var sceneLayerViewQueries = [];
        //                    sceneLayerViews.forEach(function (sceneLayerView) {
        //                        sceneLayerView.queryFeatures && sceneLayerViewQueries.push(sceneLayerView.queryFeatures(query));
        //                    });
        //                    var queryResults = [];
        //                    promiseUtils.eachAlways(sceneLayerViewQueries).then(function (eachAlwaysResults) {
        //                        eachAlwaysResults.forEach(function (result) {
        //                            if (result.error) {
        //                                console.log("There was an error in your query.", result.error);
        //                            }
        //                            else {
        //                                if (result.value.features.length > 0) {
        //                                    queryResults = queryResults.concat(result.value.features);
        //                                }
        //                            }
        //                        });
        //                        showInfo(queryResults, event);
        //                    });


        //                }
        //            });
        //        });
        //    });
        //}


    });

    //function showInfo(features, event) {

    //    features.forEach(function (feature) {
    //        feature.popupTemplate = feature.getEffectivePopupTemplate();
    //    });
    //    view.popup.open({
    //        title: "Info Details",
    //        location: event.mapPoint,
    //        features: features
    //    });
    //};
    //#endregion refactor for Popup on individual layers - cwc 7 / 30 / 19



    document.getElementById("undergroundBtn").addEventListener("click", function () {
        view.goTo(map.presentation.slides.getItemAt(0).viewpoint, { duration: 1000 });
    });

    document.getElementById("opacityInput").addEventListener("change", function (event) {
        map.ground.opacity = event.target.checked ? 0.4 : 1;
    });

    view.ui.add("menu", "top-right");

    //new button 1/29/19
    document.getElementById("LaunchMockUpBtn").addEventListener("click", function () {
        window.open(_mockUpURL, '_blank');
    });

    //new button 1/29/19
    view.ui.add("balsamiq", "top-right");

    //new selector for setting query filter 601/200
    if (showFilter) {
        document
            .getElementById("floorSelect")
            .addEventListener("change", showFloors);

        // function that will filter by the selected floor
        function showFloors(event) {
            // retrieve the query stored in the selected value
            var floorQuery = event.target.value;
            console.log(floorQuery);

            //// update the definition expression of all layers except the wireframe layer
            //map.layers.forEach(function (layer) {
            //    if (layer.title !== "NAIP_1m_tif") {
            //        layer.definitionExpression = floorQuery;
            //    }
            //});

            //go to view?
            view.goTo(map.presentation.slides.getItemAt(0).viewpoint, { duration: 1000 });
        };
    }

});
