<script lang="ts" setup>
import type { ModalElement } from "./modal.vue";

const props = withDefaults(defineProps<{
  title: string;
  question: string;
  action?: () => Promise<unknown>;
  labelCancel?: string;
  labelConfirm?: string;
}>(), {
  action: undefined,
  labelCancel: "No",
  labelConfirm: "Yes",
});

const modalEl = useTemplateRef<ModalElement>("modalEl");

function prompt() {
  modalEl.value?.open();
}

async function confirm() {
  if (props.action) {
    await props.action();
  }

  modalEl.value?.close();
}
</script>

<template>
  <div>
    <u-button @click="prompt">
      Open Dialog
    </u-button>

    <ui-modal id="prompt-dialog" ref="modalEl">
      <template #title>
        <h3>{{ title }}</h3>
      </template>

      <template #body>
        <p>{{ question }}</p>
      </template>

      <template #footer>
        <u-button variant="outline" @click="modalEl?.close">
          {{ labelCancel }}
        </u-button>
        <u-button @click="confirm">
          {{ labelConfirm }}
        </u-button>
      </template>
    </ui-modal>
  </div>
</template>
