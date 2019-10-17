"use strict";

//#region Load view UI

/**
 * loadUnderGroundMenu - adds underground items to the view
 * @param {any} view
 * @param {any} map
 */
const loadUnderGroundMenu = (view, map) => {
    //Add html menu to the view
    view.ui.add("underGroundMenu", "top-right"); 

    //set click event handler on underground button
    document.getElementById("undergroundBtn").addEventListener("click", () => {
        view.goTo(map.presentation.slides.getItemAt(0).viewpoint, { duration: 1000 });
    });

    //set click event handler on view underground checkbox
    document.getElementById("opacityInput").addEventListener("click", (event) => {
        if(event.currentTarget.className == 'esri-icon-checkbox-checked'){
            event.currentTarget.checked = true;
            event.currentTarget.className = 'esri-icon-checkbox-unchecked';
        }
        else{
            event.currentTarget.checked = false;
            event.currentTarget.className = 'esri-icon-checkbox-checked';
        }
        map.ground.opacity = event.currentTarget.checked ? 0.4 : 1;
    });
}

/**
 * loadShrp2MockUp - Loads SHRP2 mockup items to the view
 * @param {any} view
 */
const loadShrp2MockUp = (view) => {

    //new button 1/29/19
    view.ui.add("balsamiq", "top-right");

    //new button 1/29/19
    document.getElementById("LaunchMockUpBtn").addEventListener("click", () => {
        window.open(_mockUpURL, '_blank');
    });

}

//#endregion Load View UI

//#region Load 3D styles

/**
 * loadGasLine3dStyles - load 3D line styles to each line layer
 * @param {any} map - current map (webscene)
 */
const loadGasLine3dStyles = map => {
    //grab top layers
    map.layers.forEach( (groupLayer) => {
        if (groupLayer.type === 'group') {
            groupLayer.layers.forEach((layer) => { 

                //#region geometryType broken see esri
            //drill inside each group layer - find line (geometryType is BROKEN - comes in null for lines!!) - speak to esri about this
                //console.log("before Geometry Type");
                //if (layer.type !== 'group' && layer.geometryType === 'polyline') {
                //    try {
                //        console.log("Geometry Type polyline!");
                //        layer.renderer = _line3DRenderer;
                //    }
                //    catch (error) {
                //        console.error("loadGasLine3dStyles error!: " + error);
                //    }
                //}
                //#endregion geometryTypebroken see esri

                //using layer name as work around for null geometryType
                if (layer.type !== 'group' && layer.title.toLowerCase().includes('line')) {
                    try {
                        switch (layer.title.toLowerCase()) {
                            case "electric_lines": {
                                layer.renderer = _electricLinesUniqueValRenderer;
                            }
                                break;
                            case "telecomm_lines": {
                                layer.renderer = _teleCommLinesUniqueValRenderer;
                            }
                                break;
                            default: {
                                //set new renderers color based on the original renderers color - gives Pro and Portal SceneViewer color control!
                                //_line3DRenderer.symbol.symbolLayers[0].material.color = layer.renderer.symbol.symbolLayers.items[0].material.color;
                                let symbolColor = layer.renderer.symbol.symbolLayers.items[0].material.color;
                                layer.renderer = _line3DRendererBySize(symbolColor);
                            }
                        }
                        //try {
                        //    //set new renderers color based on the original renderers color - gives Pro and Portal SceneViewer color control!
                        //    _line3DRenderer.symbol.symbolLayers[0].material.color = layer.renderer.symbol.symbolLayers.items[0].material.color;
                        //    layer.renderer = _line3DRenderer;
                        //}
                    }
                    catch (error) {
                        console.error("loadGasLine3dStyles error!: " + error);
                    }
                }
            });
        }
    });
}


//#endregion Load 3D styles