/**
 * Handles lifecycle events of the abstract GXC.button.Button component.
 * @param  {[type]} "GXC.button.ButtonController" [description]
 */
Ext.define("GXC.button.ButtonController", {
  extend: "Ext.app.ViewController",
  alias: "controller.button",

  /**
   * @private
   */
  _keymap: null,

  /**
   * Called when the button is toggled.
   * If the setting untoggleByEsc is set to true, a keymap is initialized
   * that listens to ESC-keystrokes untoggling the button.
   * @param  {GXC.button.Button} btn  The button itself.
   * @param  {boolean} pressed        Status of the button.
   */
  onToggle: function(btn, pressed) {
    if (pressed && btn.untoggleByEsc) {
      this._keymap = new Ext.util.KeyMap(Ext.getBody(), [{
        key: Ext.event.Event.ESC,
        defaultEventAction: 'preventDefault',
        scope: this,
        fn: this.onEscKey
      }]);
    } else {
      this.destroyKeymap();
    }
  },

  /**
   * Removes left event listeners.
   */
  destroy: function() {
    this.destroyKeymap();
    this.callParent(arguments);
  },

  /**
   * Event handler to toggle button to pressed: false state.
   */
  onEscKey: function() {
    this.getView().toggle(false);
  },

  destroyKeymap: function() {
    if (this._keymap) {
      this._keymap.destroy();
      this._keymap = null;
    }
  }
});
