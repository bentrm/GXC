/**
 * An abstract base class for buttons that handle OpenLayers measurement controls.
 */
Ext.define('GXC.button.Measure', {
    extend: 'GXC.button.OlButton',

    alias: 'widget.gxc_button_measure',

    inject: [
        'mapService'
    ],

    enableToggle: true,

    /**
     * Default toggle group for gxc interactions.
     * @cfg {String}
     */
    toggleGroup: 'gxc_interaction',

    /**
     * The OpenLayers.Handler type this control will use.
     * @type {String}
     */
    handlerType: null,

    /**
     * Title of measurement notifications.
     * @cfg {String}
     */
    txtMeasureTitle: 'Measurement',

    initComponent: function(config) {
        config = config || {};

        if (!this.control && this.handlerType) {
            this.initControl();
        }

        this.map = this.mapService.getMap();

        this.callParent(arguments);
    },

    initControl: function() {
        this.control = new OpenLayers.Control.DynamicMeasure(
            OpenLayers.Handler[this.handlerType], {
            geodesic: true,
            persist: true
        });
    }
});
