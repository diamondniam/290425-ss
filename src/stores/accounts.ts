import { defineStore } from "pinia";

export interface AccountEntry {
  id: number;
  labels: { text: string }[];
  type: "Локальная" | "LDAP";
  login: string;
  password: string | null;
}

export const useAccountStore = defineStore("accounts", {
  state: () => ({
    entries: [] as AccountEntry[],
    nextId: 1,
  }),
  actions: {
    addEntry() {
      this.entries.push({
        id: this.nextId++,
        labels: [],
        type: "Локальная",
        login: "",
        password: "",
      });
    },
    removeEntry(id: number) {
      this.entries = this.entries.filter((e) => e.id !== id);
    },
    updateEntry(updated: AccountEntry) {
      const index = this.entries.findIndex((e) => e.id === updated.id);
      if (index !== -1) this.entries[index] = updated;
    },
  },
});
