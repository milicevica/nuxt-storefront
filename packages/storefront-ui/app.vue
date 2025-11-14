<script lang="ts" setup>
function action() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Done!");
    }, 3000);
  });
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <ui-prompt-dialog
      title="Confirm"
      question="Are you sure?"
      label-cancel="No"
      label-confirm="Yes"
    />

    <ui-async-button :promise="action">
      Click Me
    </ui-async-button>
  </div>
</template>
