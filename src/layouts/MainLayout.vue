<template>
  <div class="main-layout">
    <div class="main-layout__header">
      <MainHeader />
    </div>
    <div class="main-layout__body">
      <router-view />
    </div>
    <div class="main-layout__footer">
      <MainNavbar />
    </div>
  </div>
</template>

<style type="scoped"></style>

<script lang="ts">
import { defineComponent } from 'vue';
import MainNavbar from 'components/MainNavbar.vue';
import MainHeader from 'components/MainHeader.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    MainNavbar,
    MainHeader,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #0c365a;
  &__body {
    flex: 1;
    overflow: auto;
  }
  &__header,
  &__footer {
    flex-shrink: 0;
  }
}
</style>
