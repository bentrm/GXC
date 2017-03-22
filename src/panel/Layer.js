/**
 * A tree panel that allows interaction with layers of the map view.
 */
Ext.define('GXC.panel.Layer', {
    extend: 'GeoExt.tree.Panel',
    requires: [
        'Ext.tree.plugin.TreeViewDragDrop',
        'Ext.grid.column.Action',
        // see: http://www.sencha.com/forum/showthread.php?262124-Missed-(-)-dependency-reference-to-a-Ext.util.Point-in-Ext.EventObjectImpl
        'Ext.util.Point',
        'GXC.panel.LayerViewController'
    ],

    inject: [
        'layerTreeStore',
        'notificationService'
    ],

    controller: 'GXC.panel.LayerViewController',

    alias: 'widget.gxc_panel_layer',

    viewType: 'gx_treeview',

    cls: 'gxc-layer-tree',

    // configuration
    rootVisible: false,
    useArrows: true,
    enableColumnHide: false,
    enableColumnMove: false,
    sortableColumns: false,
    hideHeaders: true,


    txtNoInfoTitle: 'WMS feature info',
    txtNoInfo: 'No WMS feature info available at this position',

    viewConfig: {
        plugins: [{
            ptype: 'treeviewdragdrop'
        }]
    },

    initComponent: function() {
        var me = this;

        this.addEvents(
            /**
             * Fired when a getfeatureinfo control is requested for a layer.
             * @event
             */
            'getfeatureinfo',

            /**
             * Fired when a layer is to be deleted from the tree.
             * @event
             */
            'deletelayer'
        );

        this.store = this.layerTreeStore;

        if (!me.columns) {
            if (me.initialConfig.hideHeaders === undefined) {
                me.hideHeaders = true;
            }
            me.addCls(Ext.baseCSSPrefix + 'autowidth-table');
            me.columns = [{
                xtype    : 'gx_treecolumn',
                text     : 'Name',
                flex: 4,
                dataIndex: me.displayField
            }, {
                itemId: 'actionColumn',
                xtype:'actioncolumn',
                dataIndex: 'layer',
                flex: 1,
                items: [{
                    iconCls: 'gxc-icon-info',
                    tooltip: 'Supports GetFeatureInfo',
                    isDisabled: function(grid, rowIndex, colIndex) {
                      var treeModel = grid.getStore().getAt(rowIndex);
                      var layer = treeModel.get('layer');
                      return !layer || !layer.metadata || !layer.metadata.queryable;
                    },
                    handler: me.getFeatureInfo,
                    scope: me
                }]
            }];
        }

        this.callParent(arguments);
    },

    getFeatureInfo: function (grid, rowIndex, colIndex) {
      var treeModel = grid.getStore().getAt(rowIndex);
      var layer = treeModel.get('layer');
      var map = layer.map;

      this.control = new OpenLayers.Control.WMSGetFeatureInfo({
          layers: [layer],
          infoFormat: 'text/html',
          eventListeners: {
              getfeatureinfo: this.getFeatureInfoHandler,
              scope: this
          }
      });

      map.addControl(this.control);
      map.div.style.cursor = 'help';
      this.control.activate();
    },

    getFeatureInfoHandler: function(e) {
        var map = e.object.map;

        if (this._popup && this._popup.isVisible()) {
            this._popup.close();
        }

        if (e.request.responseText === "") {
            this.notificationService.error(this.txtNoInfoTitle, this.txtNoInfo);
        } else {
            this._popup = Ext.create('GeoExt.window.Popup', {
                title: 'Feature Info',
                width: 400,
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
        }

        this.control.deactivate();
        map.div.style.cursor = '';
        map.removeControl(this.control);
    }
});
