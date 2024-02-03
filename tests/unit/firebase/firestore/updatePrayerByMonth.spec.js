import {
  updatePrayerByMonth,
  getPrayers,
  useFirebaseEmulator,
  clearLocalStorageAndFlushFirestore,
} from "@/infrastructure/firebase/firestore";

describe("updatePrayerByMonth", () => {
  beforeAll(() => {
    useFirebaseEmulator();
  });

  beforeEach(async () => {
    await clearLocalStorageAndFlushFirestore();
  });

  afterEach(async () => {
    await clearLocalStorageAndFlushFirestore();
  });

  it("should add prayers for specified month", async () => {
    // arrange
    const month = 1;
    const prayerData = [{ asar: "03:30" }];

    // act
    await updatePrayerByMonth(month, prayerData);

    // assert
    const data = await getPrayers();
    expect(data).toHaveLength(1);
    expect(data[0][0].asar).toBe(prayerData[0].asar);
  });
});
