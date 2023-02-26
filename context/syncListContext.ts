import { create } from "zustand";

interface ISyncListContextStore {
	syncCount: number;
	sync: () => void;
}

const useSyncListContextStore = create<ISyncListContextStore>((set) => ({
	syncCount: 0,
	sync: () => set((state) => ({ syncCount: state.syncCount + 1 })),
}));

export default useSyncListContextStore;
