<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    id?: string;
    title?: string | ((arg: unknown | undefined) => string | undefined);
    description?: string | ((arg: unknown | undefined) => string | undefined);
    uiSheetVariants?: { [key: string]: unknown };
    uiBoxVariants?: { [key: string]: unknown };
    dismissible?: boolean;
  }>(),
  {
    id: undefined,
    title: undefined,
    description: undefined,
    uiSheetVariants: undefined,
    uiBoxVariants: undefined,
    dismissible: true,
  },
);

const emit = defineEmits<{ (e: "close"): void; (e: "open", arg: unknown): unknown }>();

export type ModalElement = {
  getArg: () => unknown | undefined;
  open: (arg?: unknown | undefined) => void;
  close: () => void;
};

const bp = useBreakpoints(breakpointsTailwind);

const currentArg = ref<unknown | undefined>();
const isOpen = ref(false);
const isMobile = computed(() => bp.smallerOrEqual("md").value);

const metaVariants = computed(() => ({
  description: typeof props.description === "string" ? props.description : props.description?.(currentArg.value),
  title: typeof props.title === "string" ? props.title : props.title?.(currentArg.value),
  dismissible: props.dismissible,
}));

watch(isOpen, (val: any) => {
  if (!val) {
    emit("close");
  }
  else {
    emit("open", currentArg.value);
  }
});

function open(arg: unknown | undefined) {
  currentArg.value = arg;
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
}

defineExpose<ModalElement>({
  getArg: () => currentArg.value,
  open,
  close,
});
</script>

<template>
  <u-drawer
    v-if="isMobile"
    v-bind="metaVariants"
    v-model:open="isOpen"
    :ui="{ body: 'w-full', footer: 'items-end', ...uiSheetVariants }"
  >
    <template v-if="$slots.title" #title>
      <slot name="title" :arg="currentArg" />
    </template>

    <template v-if="$slots.body" #body>
      <slot name="body" :arg="currentArg" />
    </template>

    <template v-if="$slots.footer" #footer>
      <div class="flex justify-end w-full gap-2">
        <slot name="footer" :arg="currentArg" />
      </div>
    </template>
  </u-drawer>
  <u-modal
    v-else
    v-bind="metaVariants"
    v-model:open="isOpen"
    :ui="{ footer: 'justify-end', ...uiBoxVariants }"
  >
    <template v-if="$slots.title" #title>
      <slot name="title" :arg="currentArg" />
    </template>

    <template v-if="$slots.body" #body>
      <slot name="body" :arg="currentArg" />
    </template>

    <template v-if="$slots.footer" #footer>
      <div class="flex justify-end w-full gap-2">
        <slot name="footer" :arg="currentArg" />
      </div>
    </template>
  </u-modal>
</template>
