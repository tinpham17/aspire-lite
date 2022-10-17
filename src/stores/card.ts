import axios from 'axios';
import { CardFilterOption } from 'src/models/CardFilterOption';
import { CardInfo } from 'src/models/CardInfo';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCardStore = defineStore('card', () => {
  const cards = ref<CardInfo[]>([]);
  const activeCard = ref<CardInfo | null>(null);

  const filterOptions = ref<CardFilterOption[]>([
    {
      key: 'debit',
      label: 'My debit cards',
    },
    {
      key: 'company',
      label: 'All company cards',
    },
  ]);

  const filterBy = ref<string>(filterOptions.value[0].key);

  async function setFilterValue(value: string) {
    filterBy.value = value;
    await fetchCards();
  }

  async function fetchCards() {
    const response = await axios.get<CardInfo[]>('/api/cards.json');
    cards.value = response.data.filter((i) => i.type === filterBy.value);
  }

  async function addCard(params: { name: string }) {
    cards.value.push({
      id: Date.now().toString(),
      frozen: false,
      name: params.name,
      number: '1234',
      thru: '12/30',
      type: 'debit',
      transactions: [],
    });
  }

  function setActiveCard(id: string) {
    const card = cards.value.find((i) => i.id === id);
    if (card) {
      activeCard.value = card;
    }
  }

  function setFrozen(cardId: string, frozen: boolean) {
    const index = cards.value.findIndex((i) => i.id === cardId);
    if (index > -1) {
      cards.value[index].frozen = frozen;
    }
  }

  return {
    cards,
    filterBy,
    filterOptions,
    activeCard,
    setFilterValue,
    fetchCards,
    addCard,
    setActiveCard,
    setFrozen,
  };
});
