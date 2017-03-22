/**
 * @class GXC.Viewport
 *
 * The main application viewport, which displays the whole application rendered
 * to a provided target dom node. The viewport is *not* extended from the
 * Ext.Viewport but is actually a plan Ext.panel.Panel which allows to render
 * the application in a child div container of a website.
 *
 *
 */
Ext.define('GXC.Viewport', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.Border',
        'Ext.tab.Panel',
        'Deft.mixin.Injectable',
        'Deft.mixin.Controllable',
        'GXC.component.*',
        'GXC.button.*',
        'GXC.form.*',
        'GXC.toolbar.*',
        'GXC.panel.*'
    ],

    alias: 'widget.gxc_viewport',

    inject: [
        'appConfig'
    ],

    listeners: {
        beforerender: function() {
            var that = this,
                container = this.appConfig.getContainer();

            this.setHeight(container.getHeight());
            this.doLayout();

            Ext.EventManager.onWindowResize(function() {
                that.setHeight(container.getHeight());
                that.doLayout();
            });
        }
    },

    layout: 'border',

    cls: 'gxc-viewport',

    defaults: {
        border: 0,
        hideCollapseTool: true
    },

    initComponent: function() {
        Ext.apply(this, {
            renderTo: this.appConfig.getContainer(),
            items: this.appConfig.get('viewportItems')
        });

        this.callParent(arguments);
    }
});
