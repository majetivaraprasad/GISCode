"use strict";

require([
    "esri/WebScene",
    "esri/views/SceneView",
    "esri/config",
    "esri/widgets/Home",
    "esri/widgets/Search",
    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery",
    "esri/widgets/LayerList",
    "esri/widgets/Editor"
], (WebScene, SceneView, esriConfig, Home, Search, Expand, BasemapGallery, LayerList) => {

        //point to the correct portal
        esriConfig.portalUrl = _portalUrl;
   
        // load webscene from ArcGIS Enteprise
        const map = new WebScene({
            portalItem: {
                id: _sceneId
            }
        });

        //add the web scene to the web page (View)
        const view = new SceneView({
            container: "viewDiv",
            map: map
        });

        //set all properties and do all functions after map is finished loading
        map.when( () => {

            //set the ability to navigate underground
            map.ground.navigationConstraint = {
                type: "none"
            };
            map.ground.surfaceColor = "#fff";
            //initial basemap set to not transparent (1)
            map.ground.opacity = 1;

            //load 3d line styles
            loadGasLine3dStyles(map);
        });

        //do all functions after the view is fully loaded
        view.when(() => {
            var camera = view.camera.clone();

            // Set new values for heading and tilt
            camera.heading = 0;

            // Set the new properties on the view's camera
            view.camera = camera;

            //wire underground items
            loadUnderGroundMenu(view, map);

            //wire SHRP2 items
            loadShrp2MockUp(view);

            //load non-custom widgets
            loadStandardWidgetsToView(view, Home, Search, Expand, BasemapGallery, LayerList);

            ////load 3d line styles
            //loadGasLine3dStyles(map);
        });
    
    });