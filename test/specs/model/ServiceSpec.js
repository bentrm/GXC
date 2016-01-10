describe("A service model", function() {

  beforeEach(function() {
    Ext.syncRequire("GXC.model.Service");
  })

  it("shoul have the described fields", function() {
    var service = Ext.create("GXC.model.Service", {
        type: "WMS",
        title: "Test",
        version: "1.0.0",
        url: "www.example.com"
      });

    expect(service.getFields().length).toEqual(5);
  });
})
