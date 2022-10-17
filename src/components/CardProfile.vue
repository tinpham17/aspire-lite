<template>
  <div v-if="activeCard" class="card-profile">
    <div class="card-profile__section">
      <div class="card-profile__section-header" @click="toggleExpandedDetails">
        <div class="card-profile__section-header-title">
          <img :src="cardDetailsSvg" />
          <span>Card details</span>
        </div>
        <div class="card-profile_section-expand-toggle">
          <img v-if="expandedDetails" :src="upArrowSvg" />
          <img v-else :src="downArrowSvg" />
        </div>
      </div>
      <div v-if="expandedDetails" class="card-profile__section-body">
        <div class="card-profile__details">N/A</div>
      </div>
    </div>

    <div class="card-profile__section">
      <div
        class="card-profile__section-header"
        @click="toggleExpandedTransactions"
      >
        <div class="card-profile__section-header-title">
          <img :src="cardTransactionsSvg" />
          <span>Card transactions</span>
        </div>
        <div class="card-profile_section-expand-toggle">
          <img v-if="expandedTransactions" :src="upArrowSvg" />
          <img v-else :src="downArrowSvg" />
        </div>
      </div>
      <div v-if="expandedTransactions" class="card-profile__section-body">
        <ul class="card-profile__transaction-list">
          <li
            v-for="transaction of activeCard.transactions"
            :key="transaction.id"
            class="card-profile__transaction-item"
          >
            <div class="card-profile__transaction-group">
              <div
                class="card-profile__transaction-service"
                :class="`--${transaction.service}`"
              >
                <img
                  v-if="transaction.service === 'storage'"
                  :src="storageSvg"
                />
                <img v-if="transaction.service === 'flight'" :src="flightSvg" />
                <img v-if="transaction.service === 'phone'" :src="phoneSvg" />
              </div>
              <div>
                <div class="card-profile__transaction-message">
                  {{ transaction.message }}
                </div>
                <div class="card-profile__transaction-date">
                  {{ transaction.date }}
                </div>
                <div class="card-profile__transaction-refund">
                  <div>
                    <img :src="financeSvg" />
                  </div>
                  <span>Refund on debit card</span>
                </div>
              </div>
            </div>
            <div class="card-profile__transaction-group">
              <div class="card-profile__transaction-amount">
                S$ {{ transaction.amount }}
              </div>
              <div class="card-profile__transaction-view-details">
                <img :src="nextSvg" />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="expandedTransactions" class="card-profile__section-footer">
        <button>View all card transactions</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useCardStore } from 'src/stores/card';
import { storeToRefs } from 'pinia';
import cardDetailsSvg from 'assets/card-details.svg';
import cardTransactionsSvg from 'assets/card-transactions.svg';
import downArrowSvg from 'assets/down-arrow.svg';
import upArrowSvg from 'assets/up-arrow.svg';
import nextSvg from 'assets/next.svg';
import financeSvg from 'assets/finance.svg';
import storageSvg from 'assets/file-storage.svg';
import flightSvg from 'assets/flights.svg';
import phoneSvg from 'assets/megaphone.svg';

export default defineComponent({
  name: 'CardProfile',
  setup() {
    const store = useCardStore();
    const { activeCard } = storeToRefs(store);
    const expandedDetails = ref(false);
    const expandedTransactions = ref(false);

    const toggleExpandedDetails = () => {
      expandedDetails.value = !expandedDetails.value;
    };

    const toggleExpandedTransactions = () => {
      expandedTransactions.value = !expandedTransactions.value;
    };

    return {
      storageSvg,
      flightSvg,
      phoneSvg,
      nextSvg,
      financeSvg,
      cardDetailsSvg,
      cardTransactionsSvg,
      downArrowSvg,
      upArrowSvg,
      expandedDetails,
      expandedTransactions,
      activeCard,
      toggleExpandedDetails,
      toggleExpandedTransactions,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-profile {
  background: #fff;
  padding: 24px;

  &__section {
    margin-bottom: 24px;
    background: #edfff5;
    border-radius: 8px;
  }

  &__section-header {
    padding: 0 24px;
    background: #fafcff;
    border: 1px solid #f5f5f5;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 0 8px 0 #0000000a;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__section-header-title {
    display: flex;
    align-items: center;
    span {
      margin-left: 12px;
    }
  }

  &__section-body {
    padding: 0 24px;
    background: #fff;
    border-radius: 0 0 8px 8px;
    border: 1px solid #f0f0f0;
    border-top: none;
  }

  &__section-footer {
    text-align: center;
    padding: 16px;
    button {
      background: none;
      border: none;
      color: #01d167;
      font-size: 13px;
      font-weight: 600;
    }
  }

  &__details {
    padding: 24px 0;
  }

  &__transaction-item {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-bottom: 1px solid #f5f5f5;
    padding: 24px 0;
    &:last-of-type {
      border-bottom: none;
    }
  }

  &__transaction-service {
    height: 48px;
    width: 48px;
    flex: 0 0 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: 12px;
    &.--storage {
      background: #009dff1a;
    }
    &.--flight {
      background: #00d6b51a;
    }
    &.--phone {
      background: #f251951a;
    }
  }

  &__transaction-message {
    font-size: 14px;
    font-weight: 600;
    padding-top: 4px;
  }

  &__transaction-date {
    font-size: 13px;
    color: #aaaaaa;
  }

  &__transaction-refund {
    display: flex;
    align-items: center;
    margin-top: 14px;
    div {
      width: 24px;
      height: 20px;
      background: #325baf;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    span {
      margin-left: 8px;
      color: #325baf;
      font-size: 12px;
      font-weight: 600;
    }
  }

  &__transaction-amount {
    font-size: 14px;
    font-weight: 700;
    padding-top: 4px;
  }

  &__transaction-view-details {
    padding-top: 5px;
    padding-left: 10px;
  }

  &__transaction-group {
    display: flex;
    align-items: center;
  }
}
</style>
