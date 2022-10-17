<template>
  <div v-if="activeCard" class="card-action-bar">
    <ul class="card-action-bar__list">
      <li
        v-for="item of items"
        :key="item.key"
        class="card-action-bar__list-item"
        @click="handleAction(item)"
      >
        <img :src="item.icon" />
        <span>{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { NavItem } from 'src/models/NavItem';
import { defineComponent } from 'vue';
import freezeSvg from 'assets/freeze-card.svg';
import setSpendLimitSvg from 'assets/set-spend-limit.svg';
import gpaySvg from 'assets/gpay.svg';
import replaceSvg from 'assets/replace-card.svg';
import deactivateSvg from 'assets/deactivate-card.svg';
import { useCardStore } from 'src/stores/card';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

export default defineComponent({
  name: 'CardActionBar',
  setup() {
    const store = useCardStore();
    const { activeCard } = storeToRefs(store);

    const items = computed<NavItem[]>(() => [
      {
        key: activeCard.value?.frozen ? 'unfreeze' : 'freeze',
        label: activeCard.value?.frozen ? 'Unfreeze card' : 'Freeze card',
        icon: freezeSvg,
      },
      {
        key: 'set-spend-limit',
        label: 'Set spend limit',
        icon: setSpendLimitSvg,
      },
      {
        key: 'add-to-gpay',
        label: 'Add to GPay',
        icon: gpaySvg,
      },
      {
        key: 'replace',
        label: 'Replace card',
        icon: replaceSvg,
      },
      {
        key: 'cancel',
        label: 'Cancel card',
        icon: deactivateSvg,
      },
    ]);

    const handleAction = (item: NavItem) => {
      if (!activeCard.value) {
        return;
      }
      if (item.key === 'freeze') {
        store.setFrozen(activeCard.value.id, true);
      } else if (item.key === 'unfreeze') {
        store.setFrozen(activeCard.value.id, false);
      }
    };

    return {
      items,
      activeCard,
      handleAction,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-action-bar {
  background: #edf3ff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 116px;
  &__list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
  &__list-item {
    display: flex;
    flex-direction: column;
    padding: 0 8px;
    width: 100%;
    img {
      height: 32px;
    }
    span {
      font-size: 13px;
      color: #0c365a;
      margin-top: 8px;
      text-align: center;
    }
  }
}
</style>
