import {
  seedData,
  getPrayers,
  useFirebaseEmulator,
  clearLocalStorageAndFlushFirestore,
} from "@/infrastructure/firebase/firestore";

describe("getPrayers", () => {
  beforeAll(() => {
    useFirebaseEmulator();
  });

  beforeEach(async () => {
    await clearLocalStorageAndFlushFirestore();
  });

  afterEach(async () => {
    await clearLocalStorageAndFlushFirestore();
  });

  it("should get all prayers", async () => {
    // arrange
    await seedData();

    // act
    const data = await getPrayers();

    // assert
    expect(data).toHaveLength(12);
  });
});
