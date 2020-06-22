import { shallowMount } from "@vue/test-utils";
import DisplayInfo from "../../src/components/Home/DisplayInfo";

let wrapper = null;

beforeEach(() => {});

afterEach(() => {
  wrapper.destroy();
});

describe("DisplayCount", () => {
  it("renders prayer time", () => {
    wrapper = shallowMount(DisplayInfo, {
      propsData: {
        Texts: {
          left: "Zuhur",
          right: "12:30 a.m.",
        },
        textSeparator: ":",
        isActive: true,
      },
    });

    expect(wrapper.find(".left").text()).toBe("Zuhur");
    expect(wrapper.find(".divider").text()).toBe(":");
    expect(wrapper.find(".right").text()).toBe("12:30 a.m.");
    expect(wrapper.find("div").classes()).toContain("active");
  });

  it("renders prayer time", () => {
    wrapper = shallowMount(DisplayInfo, {
      propsData: {
        Texts: {
          left: "Zuhur",
          right: "12:30 a.m.",
        },
        textSeparator: ":",
        isActive: false,
      },
    });

    expect(wrapper.find(".left").text()).toBe("Zuhur");
    expect(wrapper.find(".divider").text()).toBe(":");
    expect(wrapper.find(".right").text()).toBe("12:30 a.m.");
    expect(wrapper.find("div").classes()).not.toContain("active");
  });
});
