<script setup lang="ts">
const { storefrontUi } = useAppConfig();
</script>

<template>
  <div>
    <h1 class="font-bold text-3xl">
      Hello World!
    </h1>
    <u-button>Example</u-button>
    <pre>{{ storefrontUi }}</pre>
  </div>
</template>
