<template>
  <div class="card-list">
    <div class="card-list__header">
      <div class="card-list__balance">
        <div class="card-list__balance-currency">S$</div>
        <div class="card-list__balance-value">3000</div>
      </div>
      <div class="card-list__add-new-btn" @click="handleClickNewCard">
        <img :src="plusSvg" />
        <span>New card</span>
      </div>
    </div>
    <div class="card-list__body">
      <ul class="card-list__filter-tabs">
        <li
          class="card-list__filter-item"
          v-for="item of filterOptions"
          :class="filterBy === item.key ? '--active' : ''"
          :key="item.key"
          @click="changeFilter(item.key)"
        >
          {{ item.label }}
        </li>
      </ul>
      <div class="card-list__carousel">
        <div
          v-for="card of cards"
          :key="card.id"
          class="card-list__carousel-item"
          :class="{
            '--frozen': card.frozen,
            '--active': activeCard?.id === card.id,
          }"
          @click="selectCard(card)"
        >
          <div
            class="card-list__carousel-item-btn"
            v-if="activeCard?.id === card.id"
          >
            <img :src="eyeSvg" />
            <span>Show card number</span>
          </div>
          <div class="card-list__carousel-item-body">
            <div class="card-list__carousel-item-aspire">
              <img :src="aspireSvg" />
            </div>
            <div class="card-list__carousel-item-name">
              {{ card.name }}
            </div>
            <div class="card-list__carousel-item-number">
              <div>
                <span>&#x2022;</span>
                <span>&#x2022;</span>
                <span>&#x2022;</span>
                <span>&#x2022;</span>
              </div>
              <div>
                <span>&#x2022;</span>
                <span>&#x2022;</span>
                <span>&#x2022;</span>
                <span>&#x2022;</span>
              </div>
              <div>
                <span>&#x2022;</span>
                <span>&#x2022;</span>
                <span>&#x2022;</span>
                <span>&#x2022;</span>
              </div>
              <span>{{ card.number }}</span>
            </div>
            <div class="card-list__carousel-item-thru">
              <label>Thru:</label> {{ card.thru }}
            </div>
            <div class="card-list__carousel-item-cvv">
              <label>CVV: * * *</label>
            </div>
            <div class="card-list__carousel-item-visa">
              <img :src="visaSvg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useCardStore } from 'stores/card';
import { defineComponent, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import plusSvg from 'assets/plus-circle.svg';
import aspireSvg from 'assets/aspire.svg';
import visaSvg from 'assets/visa.svg';
import eyeSvg from 'assets/eye.svg';
import { CardInfo } from 'src/models/CardInfo';

export default defineComponent({
  name: 'CardList',
  setup() {
    const store = useCardStore();
    const { cards, filterOptions, filterBy, activeCard } = storeToRefs(store);

    const changeFilter = (value: string) => {
      store.setFilterValue(value);
    };

    const handleClickNewCard = () => {
      const name = prompt('Please enter card name');
      if (name) {
        store.addCard({
          name,
        });
      }
    };

    const selectCard = (card: CardInfo) => {
      store.setActiveCard(card.id);
    };

    onMounted(() => {
      store.fetchCards();
    });

    return {
      eyeSvg,
      aspireSvg,
      visaSvg,
      plusSvg,
      cards,
      filterOptions,
      filterBy,
      activeCard,
      changeFilter,
      handleClickNewCard,
      selectCard,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-list {
  &__header {
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__balance {
    display: flex;
    align-items: center;
  }
  &__balance-currency {
    height: 22px;
    width: 40px;
    background: #01d167;
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__balance-value {
    margin-left: 10px;
    color: #fff;
    font-size: 24px;
    font-weight: 700;
  }
  &__add-new-btn {
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 700;
    color: #23cefd;
    span {
      margin-left: 6px;
    }
  }
  &__filter-tabs {
    padding: 24px;
    display: flex;
  }
  &__filter-item {
    margin-right: 16px;
    font-size: 13px;
    color: #ffffff;
    opacity: 0.5;
    line-height: 20px;
    &:last-of-type {
      margin-right: 0;
    }
    &.--active {
      opacity: 100%;
      font-weight: 700;
      border-bottom: 2px solid #23cefd;
    }
  }

  &__carousel {
    display: flex;
    scroll-behavior: smooth;
    overflow: hidden;
    padding: 0 24px;
    padding-bottom: 24px;
    overflow-x: auto;
  }

  &__carousel-item {
    width: 95%;
    flex-shrink: 0;
    max-width: 358px;
    position: relative;
    &.--frozen {
      opacity: 0.5;
    }
  }
  &__carousel-item.--active &__carousel-item-body {
    background: #01d167;
  }
  &__carousel-item-btn {
    position: absolute;
    right: 0;
    margin-right: 16px;
    height: 40px;
    background: #ffffff;
    border-radius: 6px 6px 0 0;
    padding: 0 10px;
    color: #01d167;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 10px;
    line-height: 30px;
    img {
      position: relative;
      top: 4px;
    }
    span {
      margin-left: 6px;
    }
  }
  &__carousel-item-body {
    margin-top: 30px;
    height: 220px;
    background: #536dff;
    box-shadow: 0 2px 6px 0 #00000014;
    margin-right: 16px;
    border-radius: 12px;
    position: relative;
    padding: 70px 24px;
  }
  &__carousel-item-aspire {
    position: absolute;
    top: 24px;
    right: 24px;
  }
  &__carousel-item-visa {
    position: absolute;
    bottom: 24px;
    right: 24px;
  }
  &__carousel-item-name {
    color: #ffffff;
    font-size: 22px;
    font-weight: 700;
  }
  &__carousel-item-number {
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
    margin-top: 16px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 24px;
    max-width: 220px;
    div {
      display: flex;
      justify-content: space-evenly;
      text-align: justify;
      width: 100%;
    }
  }
  &__carousel-item-thru,
  &__carousel-item-cvv {
    margin-top: 10px;
    display: inline-flex;
    font-size: 13px;
    font-weight: 700;
    color: #ffffff;
  }
  &__carousel-item-cvv {
    margin-left: 30px;
  }
}
</style>
