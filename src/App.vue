<template>
  <div style="max-width: 800px; margin: 0 auto; padding: 20px">
    <n-space vertical>
      <n-h2>Учётные записи</n-h2>
      <n-button @click="addEntry" type="primary" icon="+">Добавить</n-button>
      <n-alert type="info">Для указания нескольких меток используйте ;</n-alert>

      <AccountItem
        v-for="entry in accounts.entries"
        :key="entry.id"
        :entry="entry"
        @update="accounts.updateEntry"
        @remove="accounts.removeEntry"
      />
    </n-space>

    <div style="margin-top: 20px">
      <p>Accounts:</p>
      {{ accounts.entries }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from "./stores/accounts";
import AccountItem from "@/components/AccountItem.vue";

const accounts = useAccountStore();
const addEntry = () => accounts.addEntry();
</script>
