<template>
  <div class="main-header">
    <div class="main-header__title">{{ title }}</div>
    <div class="main-header__logo" @click="handleClickLogo">
      <img :src="logoSvg" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import logoSvg from 'assets/logo.svg';
import { computed } from 'vue';

export default defineComponent({
  name: 'MainHeader',
  setup() {
    const router = useRouter();
    const route = useRoute();

    const title = computed(() => {
      if (route.path === '/home') {
        return 'Home';
      }
      if (route.path === '/cards') {
        return 'Account balance';
      }
      if (route.path === '/payments') {
        return 'Payments';
      }
      if (route.path === '/credit') {
        return 'Credit';
      }
      if (route.path === '/profile') {
        return 'Profile';
      }
      return '';
    });

    const handleClickLogo = () => {
      router.push('/home');
    };

    return {
      logoSvg,
      title,
      handleClickLogo,
    };
  },
});
</script>

<style lang="scss" scoped>
.main-header {
  height: 56px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #0c365a;
  color: #fff;

  &__title {
    font-weight: 600;
    font-size: 14px;
    height: 48px;
    display: flex;
    align-items: flex-end;
  }
}
</style>
