import {
  seedData,
  getMetadata,
  useFirebaseEmulator,
  clearLocalStorageAndFlushFirestore,
} from "@/infrastructure/firebase/firestore";

describe("getMetadata", () => {
  beforeAll(() => {
    useFirebaseEmulator();
  });

  beforeEach(async () => {
    await clearLocalStorageAndFlushFirestore();
  });

  afterEach(async () => {
    await clearLocalStorageAndFlushFirestore();
  });

  it("should get metadata", async () => {
    // arrange
    await seedData();

    // act
    const data = await getMetadata();

    // assert
    expect(data.version).toBe(1);
  });
});
