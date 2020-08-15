/**
 * Boilerplate map initialization code starts below:
 */

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
    apikey: api_key
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map - this map is centered over Taiwan
var map = new H.Map(document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map, {
        center: { lat: 23.6502594, lng: 121.0386293 },
        zoom: 7.5,
        pixelRatio: window.devicePixelRatio || 1
    });
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);


/**
 * Add markers showing the position of all factories.
 * Clicking on a marker opens an infobubble which holds HTML content related to the marker.
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function addInfoBubble() {
    window.group = new H.map.Group();

    map.addObject(group);

    // add 'tap' event listener, that opens info bubble, to the group
    group.addEventListener('tap', function(evt) {

        // event target is the marker itself, group is a parent event target
        // for all objects that it contains
        var dataJson = evt.target.getData();
        var bubbleInfo = '<div>' + dataJson.廠區 + '<br>地址：' + dataJson.地址 + '</div>';
        var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
            // read custom data
            content: bubbleInfo
        });
        // show info bubble
        ui.addBubble(bubble);

        showFactoryMainData(dataJson);
        showFactoryImpact(dataJson);

    }, false);

    for (x of jsonObj) {
        var lat = x.經度;
        var lng = x.緯度;
        var data = x;
        addMarkerToGroup(group, { lat: lat, lng: lng }, data);
    }

}


/**
 * Creates a new marker and adds it to a group
 * @param {H.map.Group} group       The group holding the new marker
 * @param {H.geo.Point} coordinate  The location of the marker
 * @param {String} html             Data associated with the marker
 */

var factory_icon = new H.map.Icon('img/factory.svg');

function addMarkerToGroup(group, coordinate, html) {
    var marker = new H.map.Marker(coordinate, {icon:factory_icon});
    // add custom data to the marker
    marker.setData(html);
    group.addObject(marker);
}