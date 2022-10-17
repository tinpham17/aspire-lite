<template>
  <div class="cards-page">
    <CardList />
    <CardActionBar />
    <CardProfile />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardList from 'components/CardList.vue';
import CardProfile from 'components/CardProfile.vue';
import CardActionBar from '../components/CardActionBar.vue';

export default defineComponent({
  name: 'CardsPage',
  setup() {
    return {};
  },
  components: { CardList, CardProfile, CardActionBar },
});
</script>

<style lang="scss" scoped></style>
