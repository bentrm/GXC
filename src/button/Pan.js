/**
 * Allows to pan the map while active.
 * This removes the default Navigation control from the map to make activation
 * of panning explicit by using a tool in the taskbar.
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

        var nav = this.map.getControlsByClass('OpenLayers.Control.Navigation')[0];
        nav.deactivate();
        this.map.removeControl(nav);

        this.callParent(arguments);
    }
});
