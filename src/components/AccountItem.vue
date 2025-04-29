<template>
  <div class="container">
    <n-input
      :status="invalidLabels ? 'error' : undefined"
      v-model:value="labelInput"
      @blur="validateAndEmit"
      placeholder="Метки"
      style="flex: 1"
    />

    <n-select
      v-model:value="entry.type"
      :options="[
        { label: 'Локальная', value: 'Локальная' },
        { label: 'LDAP', value: 'LDAP' },
      ]"
      style="flex: 1"
      @update:value="validateAndEmit"
    />

    <n-input
      :status="invalidLogin ? 'error' : undefined"
      v-model:value="entry.login"
      placeholder="Логин"
      style="flex: 1"
      @blur="validateAndEmit"
    />

    <n-input
      v-if="entry.type === 'Локальная'"
      type="password"
      :status="invalidPassword ? 'error' : undefined"
      v-model:value="entry.password"
      placeholder="Пароль"
      style="flex: 1"
      @blur="validateAndEmit"
    />

    <n-button
      type="error"
      style="
        flex: none !important;
        width: 30px;
        min-width: 30px;
        padding: 0px;
        background-color: transparent;
      "
      quaternary
      @click="$emit('remove', entry.id)"
    >
      <div>
        <img src="@/assets/icons/trashGray.svg" alt="" />
      </div>
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { AccountEntry } from "../stores/accounts";

const props = defineProps<{ entry: AccountEntry }>();
const emit = defineEmits(["update", "remove"]);

const labelInput = ref(props.entry.labels.map((l) => l.text).join("; "));
const invalidLogin = ref(false);
const invalidPassword = ref(false);
const invalidLabels = ref(false);

function validateAndEmit() {
  invalidLogin.value = !props.entry.login || props.entry.login.length > 100;
  invalidPassword.value =
    props.entry.type === "Локальная" &&
    (!props.entry.password || props.entry.password.length > 100);
  invalidLabels.value = labelInput.value.length > 50;

  const labels = labelInput.value
    .split(";")
    .map((text) => text.trim())
    .filter(Boolean)
    .map((text) => ({ text }));

  emit("update", {
    ...props.entry,
    labels,
    login: props.entry.login,
    password: props.entry.type === "LDAP" ? null : props.entry.password,
  });
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.container > * {
  flex: 1;
  min-width: 140px;
}
</style>
