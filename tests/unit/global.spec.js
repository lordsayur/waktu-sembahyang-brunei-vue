import { shallowMount } from "@vue/test-utils";
import global from "@/mixins/global.js";

describe("wsbPrint", () => {
  jest.spyOn(console, "log");
  const Component = {
    render() {},
    mixins: [global],
  };
  const wrapper = shallowMount(Component);

  wrapper.vm.wsbPrint("title", "message");
  it("should display title and message", () => {
    expect(console.log).toHaveBeenCalledWith("title", "message");
  });

  wrapper.vm.wsbPrint("title", { name: "nama" });
  it("should display title and object", () => {
    expect(console.log).toHaveBeenCalledWith(
      "title",
      `{
    "name": "nama"
}`
    );
  });

  wrapper.vm.wsbPrint("message");
  it("should display message", () => {
    expect(console.log).toHaveBeenCalledWith("message", "");
  });

  wrapper.vm.wsbPrint({ name: "nama" });
  it("should display object", () => {
    expect(console.log).toHaveBeenCalledWith(
      `{
    "name": "nama"
}`
    );
  });
});
