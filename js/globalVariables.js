"use strict";

//#region Scene, Map and Layer Variables

//cont _portalUrl = "https://susz055302/portal/home"; //server name gives "Certificate Common Name Invalid" error 
const _portalUrl = "https://portal1061.ana-technology.com/portal/";

//var mockUpURL = "https://shpr2balsamiq2019.azurewebsites.net"; //<- this is the azure hosted mockup
const _mockUpURL = "https://shrp2mockupwebform2019.azurewebsites.net"; //<- this is the azure hosted mockup - updated with new logo 1/31/19

//#region unused portal scene IDs - legacy
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

        //e1ec66b8a3b947a0bbaa46a3731f684c - 8/18/19 - Test for Ty's 3D webstyle
//#endregion unused portal scene IDs - legacy
//const _sceneId = "ddeeb3cc505440358c8674dead58160b"; //< -  LOCAL EVERYONE Test 3D, NAIP_1m_tif 2D background image and HGAC_Grid5ft Elevation Layer - esri topo background - 7/30/19

//for demo
//const _sceneId = "c0cb4fab23e44865857ba98b9f029cfa"; // 8/23/19 created by Ty (and Chuck) 4 demo
const _sceneId = "b540091e99f64f808b391aeb39988afe"; // 8/23/19 created by Ty (and Chuck) 4 demo


//#endregion Scene, Map and Layer Variables

//#region display widget variables

const _showSearchTool = true;
const _showBaseMapGallery = true;
const _showLayerList = true;
const _showHomeButton = true;
const _showFilter = false;
const _showLegend = true;
const _showUnderground = true;

//use for square or round tube?
let _roundTube = false;


//#endregion show widget variables

//#region Layer Symbology

//SQUARE Tube
//options.profile = "quad",
//options.height = 30,
//options.width = 30,
//options.cap = "square"
//SQUARE Tube

//_line3DRendererBySize - line renderer for all lines by SIZE
//symColor = color for the symbol
const _line3DRendererBySize = (symColor) => {
    return {
        type: "simple",
        symbol: {
            type: "line-3d", // autocasts as new SimpleRenderer()
            symbolLayers: [{
                type: "path",  // autocasts as new PathSymbol3DLayer()
                material: { color: symColor }, 

                //ROUND tube
                profile: "circle",  // creates a round shape
                //width: 20,  // path width will also set the height to the same value
                cap: "round"
                 //ROUND tube

                //SQUARE tube
                //profile: "quad",
                //height: 30,
                //width: 30,
                //cap: "square"
                //SQUARE tube

            }]
        },
        visualVariables: [{
            type: "size",
            field: "D",
            valueUnit: "inches"  //converts and extrudes all data values in inches
            //valueUnit: "feet"  //converts and extrudes all data values in feet
        }]
    };
}

//testing unique value renderer - with 3D
const _createLineSymbol3D = (fieldValue, symColor) => {
    return {
        value: fieldValue,
        symbol: {
            type: "line-3d", // autocasts as new SimpleRenderer()
            symbolLayers: [{
                type: "path",  // autocasts as new PathSymbol3DLayer()
                material: { color: symColor },

                //ROUND tube
                profile: "circle",  // creates a round shape
                width: .5,  // path width will also set the height to the same value
                cap: "round"
                //ROUND tube

                   //SQUARE tube
                //profile: "quad",
                //height: .5,
                //width: .5,
                //cap: "square"
                //SQUARE tube

            }]
        },
        label: fieldValue
    };
}

//testing unique value renderer - hopefully can replace with 3d symbols
const _createLineSymbol2D = (value, color) => {
    return {
        value: value,
        symbol: {
            color: color,
            type: "simple-line",
            width: "1px",
            style: "solid",
            outline: {
                style: "none"
            }
        },
        label: value
    };
}

//unique value renderer for Electric Lines based on FeatType 
const _electricLinesUniqueValRenderer = {
    type: "unique-value", // autocasts as new UniqueValueRenderer()
    legendOptions: {
        title: "Feature type"
    },
    defaultLabel: "Electric Lines",
    field: "FeatType",
    uniqueValueInfos: [
        _createLineSymbol3D("Electric Box Duct Distribution", "rgba(255, 0, 0, 255)"),
        _createLineSymbol3D("Electric Circular Duct Distribution", "rgba(255, 0, 0, 255)"),
        _createLineSymbol3D("Electric Circular Duct Transmission", "rgba(168, 0, 0, 255)"),
        _createLineSymbol3D("Overhead Electric Distribution", "rgba(255, 0, 0, 255)"),
        _createLineSymbol3D("Overhead Electric Transmission", "rgba(168, 0, 0, 255)")
    ]
};

//unique value renderer for TeleComm Lines based on FeatType 
const _teleCommLinesUniqueValRenderer = {
    type: "unique-value", // autocasts as new UniqueValueRenderer()
    legendOptions: {
        title: "Feature type"
    },
    defaultLabel: "TeleComm Lines",
    field: "FeatType",
    uniqueValueInfos: [
        _createLineSymbol3D("Bridge Attachment Box Duct", "rgba(230, 152, 0, 255)"),
        _createLineSymbol3D("Bridge Attachment Circular Duct", "rgba(230, 152, 0, 255)"),
        _createLineSymbol3D("Communications Circular Duct", "rgba(168, 112, 0, 255)"),
        _createLineSymbol3D("Communications Duct", "rgba(168, 112, 0, 255)"),
        _createLineSymbol3D("Direct Buried Cable Communications", "rgba(255, 170, 0, 255)"),
        _createLineSymbol3D("Overhead Telecommunications", "rgba(255, 211, 127, 255)")
    ]
};

//unique value renderer for Electric Lines based on FeatType and Size
const _electricLinesUniqueValRendererAndSize = {
    type: "unique-value", // autocasts as new UniqueValueRenderer()
    legendOptions: {
        title: "Feature type"
    },
    defaultLabel: "Electric Lines",
    field: "FeatType",
    uniqueValueInfos: [
        _createLineSymbol3D("Electric Box Duct Distribution", "rgba(255, 0, 0, 255)"),
        _createLineSymbol3D("Electric Circular Duct Distribution", "rgba(255, 0, 0, 255)"),
        _createLineSymbol3D("Electric Circular Duct Transmission", "rgba(168, 0, 0, 255)"),
        _createLineSymbol3D("Overhead Electric Distribution", "rgba(255, 0, 0, 255)"),
        _createLineSymbol3D("Overhead Electric Transmission", "rgba(168, 0, 0, 255)")
    ],
    visualVariables: [{
        type: "size",
        field: "D",
        valueUnit: "inches"  //converts and extrudes all data values in inches
        //valueUnit: "feet"  //converts and extrudes all data values in feet
    }]
};

//unique value renderer for TeleComm Lines based on FeatType and Size
const _teleCommLinesUniqueValRendererAndSize = {
    type: "unique-value", // autocasts as new UniqueValueRenderer()
    legendOptions: {
        title: "Feature type"
    },
    defaultLabel: "TeleComm Lines",
    field: "FeatType",
    uniqueValueInfos: [
        _createLineSymbol3D("Bridge Attachment Box Duct", "rgba(230, 152, 0, 255)"),
        _createLineSymbol3D("Bridge Attachment Circular Duct", "rgba(230, 152, 0, 255)"),
        _createLineSymbol3D("Communications Circular Duct", "rgba(168, 112, 0, 255)"),
        _createLineSymbol3D("Communications Duct", "rgba(168, 112, 0, 255)"),
        _createLineSymbol3D("Direct Buried Cable Communications", "rgba(255, 170, 0, 255)"),
        _createLineSymbol3D("Overhead Telecommunications", "rgba(255, 211, 127, 255)")
    ],
    visualVariables: [{
        type: "size",
        field: "D",
        valueUnit: "inches"  //converts and extrudes all data values in inches
        //valueUnit: "feet"  //converts and extrudes all data values in feet
    }]
};



//sample
//const trailsRenderer = {
//    type: "simple",
//    symbol: {
//        color: "#BA55D3",
//        type: "simple-line",
//        style: "solid"
//    },
//    visualVariables: [
//        {
//            type: "size",
//            field: "ELEV_GAIN",
//            minDataValue: 0,
//            maxDataValue: 2300,
//            minSize: "3px",
//            maxSize: "7px"
//        }
//    ]
//};

//sample
//function createLineSymbol(value, color) {
//    return {
//        value: value,
//        symbol: {
//            color: color,
//            type: "simple-line",
//            style: "solid",
//            outline: {
//                style: "none"
//            }
//        },
//        label: value
//    };
//}

// Symbol for U.S. Highways
//const hwySym = {
//    type: "simple-line", // autocasts as new SimpleLineSymbol()
//    color: "#ff6207",
//    width: "0.5px",
//    style: "solid"
//};
//function createFillSymbol(value, color) {
//    return {
//        value: value,
//        symbol: {
//            color: color,
//            type: "simple-fill",
//            style: "solid",
//            outline: {
//                style: "none"
//            }
//        },
//        label: value
//    };
//}

//value: "Electric Box Duct Distribution",
//    symbol: elecBoxDuctDistSymbol,
//        label: "Electric Box Duct Distribution"

//var openSpacesRenderer = {
//    type: "unique-value",
//    field: "TYPE",
//    uniqueValueInfos: [
//        createFillSymbol("Natural Areas", "#9E559C"),
//        createFillSymbol("Regional Open Space", "#A7C636"),
//        createFillSymbol("Local Park", "#149ECE"),
//        createFillSymbol("Regional Recreation Park", "#ED5151")
//    ]
//};


//second example
//const hwyRenderer = {
//    type: "unique-value", // autocasts as new UniqueValueRenderer()
//    legendOptions: {
//        title: "Freeway type"
//    },
//    defaultSymbol: otherSym,
//    defaultLabel: "State Highway",
//    field: "CLASS",
//    uniqueValueInfos: [
//        {
//            value: "I", // code for interstates/freeways
//            symbol: fwySym,
//            label: "Interstate"
//        },
//        {
//            value: "U", // code for U.S. highways
//            symbol: hwySym,
//            label: "US Highway"
//        }
//    ]
//};
//#endregion Layer Symbology