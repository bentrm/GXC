/**
 * Button that triggers a Geolocation control that allows to find ones
 * own position on the map. Uses the Html5 Geolocation API.
 */
Ext.define('GXC.button.Pan', {
    extend: 'GXC.button.OlButton',

    alias: 'widget.gxc_button_pan',

    /**
     * Component is injected with
     * * appConfig - to decorate the mouse control with a waiting icon
     * * mapService - to have access to the actual map
     * * notificationService - to proclaim errors
     * @cfg {Array}
     */
    inject: [
        'appConfig',
        'mapService',
        'notificationService'
    ],

    /**
     * The icon class of the button.
     * @cfg {String}
     */
    iconCls: 'gxc-icon-pan',

    /**
     * The buttons tooltip on mouseover.
     * @cfg {String}
     */
    tooltip: 'Pan map by dragging',

    /**
     * Geolocation can be toggled.
     *
     * @inheritDoc
     */
    enableToggle: true,

    /**
     * Allows to untoggle the button by pressing the ESC key.
     * @cfg {Boolean}
     */
    untoggleByEsc: false,

    /**
     * @inheritdoc
     */
    initComponent: function(config) {
        var control;

        config = config || {};
        this.map = config.map || this.mapService.getMap();
        this.control = config.control || new OpenLayers.Control.DragPan({
            documentDrag: true,
            enableKinetic: true
        });
        this.map.addControl(this.control);
        this.callParent(arguments);
    }
});
