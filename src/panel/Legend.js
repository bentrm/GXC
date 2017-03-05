/**
 * A simple legend component binding to the injected layer store.
 */
Ext.define('GXC.panel.Legend', {
    extend: 'GeoExt.panel.Legend',
    requires: [
        'GeoExt.container.UrlLegend',
        'GeoExt.container.VectorLegend',
        'GeoExt.container.WmsLegend'
    ],

    alias: 'widget.gxc_panel_legend',

    inject: [
        'layerStore'
    ],

    itemId: 'legend',

    autoScroll: true,

    initComponent: function() {
        Ext.apply(this, {
            layerStore: this.layerStore
        });

        console.log(this);

        this.callParent(arguments);
    }
});
