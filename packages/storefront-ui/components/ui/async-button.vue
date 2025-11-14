<script lang="ts" setup>
import type { $Transition, VariantType } from "motion-v";

import { LayoutGroup, motion } from "motion-v";

const props = defineProps<{
  leadingIcon?: string;
  awaiting?: boolean;
  type?: "submit" | "reset" | "button";
  color?: "neutral" | "primary" | "error" | "success" | "warning" | "info";
  variant?: "solid" | "outline" | "soft" | "subtle" | "ghost" | "link";
  disabled?: boolean;
  promise?: () => Promise<unknown>;
}>();

const emits = defineEmits<{ (e: "click", ev: MouseEvent): void }>();

const iconVariants: { [k: string]: VariantType } = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1 },
};

const loadingIconVariant: { [k: string]: VariantType } = {
  hidden: { opacity: 1, scale: 1 },
  show: { opacity: 1, scale: 1 },
};

const layoutTransistion: $Transition = { type: "spring", bounce: 0.25, duration: 0.4 };
const iconTransition: $Transition = { type: "spring", bounce: 0.4, duration: 0.3, opacity: { delay: 0 } };

const awaitingPromise = ref(false);
const isAwaiting = computed(() => awaitingPromise.value);

function onClick(ev: MouseEvent) {
  if (isAwaiting.value || props.disabled)
    return;

  emits("click", ev);

  if (!props.promise)
    return;

  awaitingPromise.value = true;

  props.promise().finally(() => (awaitingPromise.value = false));
}
</script>

<template>
  <LayoutGroup>
    <motion.div layout :transition="layoutTransistion">
      <u-button
        :disabled="isAwaiting || disabled"
        :type="type"
        :variant="variant"
        :color="color"
        class="flex items-center"
        @click="onClick"
      >
        <template #leading>
          <motion.div
            v-if="isAwaiting"
            key="loading-icon"
            layout
            :variants="loadingIconVariant"
            initial="hidden"
            :animate="{ rotate: 360, opacity: 1, scale: 1 }"
            :transition="{ repeat: Infinity, duration: 1, ease: 'linear' }"
            class="flex items-center"
          >
            <u-icon name="lucide:loader-circle" />
          </motion.div>

          <motion.div
            v-else-if="leadingIcon"
            key="icon"
            layout
            :variants="iconVariants"
            initial="hidden"
            animate="show"
            :transition="iconTransition"
            class="flex items-center"
          >
            <u-icon :name="leadingIcon" />
          </motion.div>
        </template>

        <template #default>
          <motion.div
            v-if="$slots.default"
            key="content"
            layout
            :transition="layoutTransistion"
          >
            <slot />
          </motion.div>
        </template>
      </u-button>
    </motion.div>
  </LayoutGroup>
</template>
