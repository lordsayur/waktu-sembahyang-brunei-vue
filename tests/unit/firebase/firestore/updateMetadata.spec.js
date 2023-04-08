import {
  updateMetadata,
  getMetadata,
  useFirebaseEmulator,
  clearLocalStorageAndFlushFirestore,
} from "@/infrastructure/firebase/firestore";

describe("updateMetadata", () => {
  beforeAll(() => {
    useFirebaseEmulator();
  });

  beforeEach(async () => {
    await clearLocalStorageAndFlushFirestore();
  });

  afterEach(async () => {
    await clearLocalStorageAndFlushFirestore();
  });

  it("should update version", async () => {
    // arrange
    const version = 1;

    // act
    await updateMetadata(version);

    // assert
    const data = await getMetadata();
    expect(data.version).toBe(version);
  });
});
