/**
 * Triggers a OpenLayers WMSGetFeatureInfo control that can be used to query
 * for feature information.
 */
Ext.define('GXC.button.FeatureInfo', {
    extend: 'GXC.button.OlButton',
    requires: [
        'Ext.grid.property.Grid',
        'Ext.layout.container.Accordion',
        'GeoExt.window.Popup',
        'GXC.component.IFrame'
    ],

    alias: 'widget.gxc_button_featureinfo',

    /**
     * Component is injected with mapService and notificationService.
     *
     * @cfg {Array}
     */
    inject: [
        'mapService',
        'notificationService'
    ],

    /**
     * The layer info will be requested for.
     * @type {[type]}
     */
    layer: null,

    /**
     * Allows the toggling of the underlying OL control.
     *
     * cfg {Boolean} enableToggle
     */
    enableToggle: true,

    /**
     * Default toggle group for gxc interactions.
     * @cfg {String}
     */
    toggleGroup: 'gxc_interaction',

    /**
     * The GXC icon class for this button.
     *
     * @cfg {String} iconCls
     */
    iconCls: 'gxc-icon-info',

    /**
     * The tooltip for this button.
     * @type {String}
     */
    tooltip: 'WMS Feature Info',

    txtNoInfoTitle: 'WMS feature info',
    txtNoInfo: 'No WMS feature info available at this position',

    initComponent: function() {
        this.map = this.mapService.getMap();

        this.control = new OpenLayers.Control.WMSGetFeatureInfo({
            drillDown: true,
            queryVisible: true,
            infoFormat: 'text/html',
            eventListeners: {
                nogetfeatureinfo: this.noGetFeatureInfoHandler,
                beforegetfeatureinfo: this.beforeGetFeatureInfoHandler,
                getfeatureinfo: this.getFeatureInfoHandler,
                scope: this
            }
        });

        this.callParent(arguments);
    },


    onEnable: function() {
        var map = this.mapService.getMap();

        map.div.style.cursor = 'help';
        this.callParent(arguments);
    },

    onDisable: function() {
        var map = this.mapService.getMap();
        map.div.style.cursor = 'auto';
        this.callParent(arguments);
    },

    noGetFeatureInfoHandler: function() {
        if (this._popup && this._popup.isVisible()) {
            this._popup.close();
        }
        this.notificationService.error(this.txtNoInfoTitle, this.txtNoInfo);
    },

    beforeGetFeatureInfoHandler: function(e) {
        var map = this.mapService.getMap(),
            layers = map.layers,
            query = [],
            layer;

        if (this.layer) {
            query.push(this.layer);
        } else {
            for (var i = 0; i < layers.length; i++) {
                layer = layers[i];
                if (layer.getVisibility() && layer.metadata.queryable) {
                    query.push(layers[i]);
                }
            }
        }

        this.control.layers = query;
    },

    getFeatureInfoHandler: function(e) {
        if (this._popup && this._popup.isVisible()) {
            this._popup.close();
        }

        this._popup = Ext.create('GeoExt.window.Popup', {
            title: 'Feature Info',
            width: 600,
            height: 300,
            layout: 'fit',
            map: e.object.map,
            location: e.xy,
            autoScroll: true,
            items: {
                xtype: 'gxc_component_iframe',
                src: e.request._object.responseURL,
                style: {
                    background: 'white'
                }
            }
        }).show();

        this.disable();
    }
});
