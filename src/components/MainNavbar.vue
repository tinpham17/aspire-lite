<template>
  <div class="main-navbar">
    <ul class="main-navbar__list">
      <li
        class="main-navbar__list-item"
        v-for="item of items"
        :key="item.key"
        :class="route.path === `/${item.key}` ? '-active' : ''"
        @click="handleClickItem(item)"
      >
        <img :src="item.icon" />{{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { NavItem } from 'src/models/NavItem';
import { defineComponent } from 'vue';

import homeSvg from 'assets/home.svg';
import cardSvg from 'assets/card.svg';
import paymentSvg from 'assets/payment.svg';
import creditSvg from 'assets/credit.svg';
import accountSvg from 'assets/account.svg';
import { useRoute, useRouter } from 'vue-router';

const items: NavItem[] = [
  {
    key: 'home',
    label: 'Home',
    icon: homeSvg,
  },
  {
    key: 'cards',
    label: 'Cards',
    icon: cardSvg,
  },
  {
    key: 'payments',
    label: 'Payments',
    icon: paymentSvg,
  },
  {
    key: 'credit',
    label: 'Credit',
    icon: creditSvg,
  },
  {
    key: 'profile',
    label: 'Profile',
    icon: accountSvg,
  },
];

export default defineComponent({
  name: 'MainNavbar',
  setup() {
    const router = useRouter();
    const route = useRoute();

    const handleClickItem = (item: NavItem) => {
      router.push(item.key);
    };

    return {
      items,
      handleClickItem,
      route,
    };
  },
});
</script>

<style lang="scss" scoped>
.main-navbar {
  background: #fff;
  &__list {
    display: flex;
    box-shadow: 0 -3px 6px 0 #00000014;
    height: 56px;
  }
  &__list-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    font-weight: 500;
    color: #dddddd;
    img {
      height: 24px;
      width: 24px;
      margin-bottom: 4px;
    }
    &.-active {
      color: #01d167;
      font-weight: 700;
      img {
        filter: invert(40%) sepia(100%) saturate(1000%) hue-rotate(100deg)
          brightness(95%) contrast(85%);
      }
    }
  }
}
</style>
