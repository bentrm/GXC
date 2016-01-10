/**
 * A simple button component wrapper that adds minor functionality.
 * Most importantly this class is used to trigger SASS compilation of GXC specific
 * icon classes that are defined in sass/src/GXC/button/Button.scss and may be
 * overriden in derieved projects.
 *
 * Generally, this component would not be instantiated in a GXC application directly.
 */
Ext.define('GXC.button.Button', {
    extend: 'Ext.button.Button',
    requires: [
      "GXC.button.ButtonController"
    ],

    alias: 'widget.gxc_button',
    controller: "button",

    listeners: {
        toggle: "onToggle",
        scope: "controller"
    },

    /**
     * Allows to untoggle the button by pressing the ESC key.
     * @cfg {Boolean}
     */
    untoggleByEsc: true,

    /**
     * If no overflowText is set is mirroring the text or tooltip attribute if
     * not provided seperatly.
     */
    initComponent: function() {
        this.overflowText = this.overflowText || this.text || this.tooltip;
        this.callParent(arguments);
    }
});
