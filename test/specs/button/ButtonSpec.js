describe("An abstract non-togglable button", function() {

  var button;

  beforeEach(function() {
    Ext.syncRequire('GXC.button.Button');
    button = Ext.create('GXC.button.Button', {
      renderTo: document.body
    });
  });

  it("should still be instantiable", function() {
    expect(GXC.button.Button).toBeDefined;
    expect(button).not.toBeNull;
    expect(Ext.getClassName(button)).toEqual('GXC.button.Button');
  });

  it("should not be a toggle button by default", function() {
    expect(button.enableToggle).toEqual(false);
  });

  it("should clean up when being destroyed", function() {
    var controller = button.controller;

    spyOn(button, "destroy").and.callThrough();
    spyOn(controller, "destroyKeymap");

    button.destroy();

    expect(button.destroy).toHaveBeenCalled();
    expect(controller.destroyKeymap).toHaveBeenCalled();
    expect(controller._keymap).toBeNull;
  });

});

describe("An abstract togglable button", function() {

  var button;

  beforeEach(function() {
    Ext.syncRequire('GXC.button.Button');
    button = Ext.create('GXC.button.Button', {
      enableToggle: true
    });
  });

  it("should still be instantiable", function() {
    expect(GXC.button.Button).toBeDefined;
    expect(button).not.toBeNull;
    expect(Ext.getClassName(button)).toEqual('GXC.button.Button');
  });

  it("should have toggle functionality enabled", function() {
    expect(button.enableToggle).toEqual(true);
    expect(button.pressed).toEqual(false);
    button.toggle(true);
    expect(button.pressed).toEqual(true);
  });

  it("should be untogglable by ESC key", function() {
    var controller = button.controller,
      keypressEvent;

    spyOn(controller, "onToggle").and.callThrough();

    expect(button.untoggleByEsc).toEqual(true);
    button.toggle(true);

    expect(button.pressed).toEqual(true);
    expect(controller.onToggle).toHaveBeenCalledWith(button, true, jasmine.any(Object));

    __triggerKeyboardEvent(document.body, Ext.event.Event.ESC);

    expect(button.pressed).toEqual(false);
    expect(controller.onToggle).toHaveBeenCalledWith(button, false, jasmine.any(Object));
    expect(controller._keymap).toBeNull;

  });

  it("should clean up when being destroyed", function() {
    var controller = button.controller;

    spyOn(button, "destroy").and.callThrough();
    spyOn(controller, "destroyKeymap");

    button.destroy();

    expect(button.destroy).toHaveBeenCalled();
    expect(controller.destroyKeymap).toHaveBeenCalled();
    expect(controller._keymap).toBeNull;
  });

  it("should clean up when being destroyed even if in pressed state", function() {
    var controller = button.controller;
  });

});

describe("An abstract button", function() {

  it("should have a text value", function() {
    var button1 = Ext.create("GXC.button.Button", {
        text: "text",
        tooltip: "tooltip"
      }),
      button2 = Ext.create("GXC.button.Button", {
        text: "text",
        overflowText: "overflowText",
        tooltip: "tooltip"
      });

    expect(button1.text).toEqual("text");
    expect(button1.overflowText).toEqual("text");
    expect(button1.tooltip).toEqual("tooltip");

    expect(button2.text).toEqual("text");
    expect(button2.overflowText).toEqual("overflowText");
    expect(button2.tooltip).toEqual("tooltip");
  });

})
