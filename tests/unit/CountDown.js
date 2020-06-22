import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import CountDown from "../../src/components/Home/CountDown";

const localVue = createLocalVue();

localVue.use(Vuex);

describe.skip("CountDown.vue", () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      getTodayDateTime: () => "2020-03-15 20:14:01",
    };

    store = new Vuex.Store({
      getters,
    });
  });

  it("renders count down text to Assalamualaikum", () => {
    const prayersData = [
      { name: "Imsak", time: "Moment", state: "am" },
      { name: "Subuh", time: "Moment", state: "am" },
      { name: "Syuruk", time: "Moment", state: "am" },
      { name: "Duha", time: "Moment", state: "am" },
      { name: "Zuhur", time: "Moment", state: "pm" },
      { name: "Asar", time: "Moment", state: "pm" },
      { name: "Maghrib", time: "Moment", state: "pm" },
      { name: "Isya", time: "Moment", state: "pm" },
      { name: "Imsak", time: "Moment", state: "am" },
      { name: "Subuh", time: "Moment", state: "am" },
    ];
    const wrapper = shallowMount(CountDown, store, localVue, {
      propsData: { prayersData },
    });
    const p = wrapper.find("p");
    expect(p.text()).toBe("Assalamualaikum");
  });
});
