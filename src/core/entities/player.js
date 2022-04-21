import { isNonEmptyArray, isNonEmptyObject } from '../../utilities/data-validation.helper';
import cardHelper from '../helpers/card.helper';
import gameHelper from '../helpers/game.helper';
import buildCard from './card';

export default function buildPlayer(dependencies) {
  const Card = buildCard(dependencies);
  const { idHelper, dataHelper } = dependencies;

  return class Player {
    #id;
    #type;
    #name;
    #active;
    #ranking;
    #cards;
    #endedAt;

    constructor(id, type, name, active, ranking, cards, endedAt) {
      this.#id = id;
      this.#type = type;
      this.name = name;
      this.#active = active;
      this.#ranking = ranking;
      this.#cards = cards;
      this.#endedAt = endedAt;
    }

    get id() {
      return this.#id;
    }

    set type(type) {
      this.#type = type;
    }

    get type() {
      return this.#type;
    }

    set name(name) {
      this.#name = dataHelper.capitalize(name);
    }

    get name() {
      return this.#name;
    }

    set active(active) {
      this.#active = active;
    }

    get active() {
      return this.#active;
    }

    set ranking(ranking) {
      this.#ranking = ranking;
    }

    get ranking() {
      return this.#ranking;
    }

    set cards(cards) {
      this.#cards = cards;
    }

    get cards() {
      return this.#cards;
    }

    set endedAt(endedAt) {
      this.#endedAt = endedAt;
    }

    get endedAt() {
      return this.#endedAt;
    }

    toJSON() {
      const additionalJSON = {};
      if (this.#cards) additionalJSON.cards = this.#cards.map((card) => card.toJSON());

      return dataHelper.removeUndefinedProperties({
        id: this.#id,
        type: this.#type,
        name: this.#name,
        active: this.#active,
        ranking: this.#ranking,
        endedAt: this.#endedAt,
        ...additionalJSON,
      });
    }

    static fromJSON({ id, type, name, active, ranking, cards, endedAt } = {}) {
      return new Player(
        id,
        type,
        name,
        active,
        ranking,
        isNonEmptyArray(cards) ? cards.map((card) => (isNonEmptyObject(card) ? Card.fromJSON(card) : card)) : [],
        endedAt
      );
    }

    static newInstance({ id = idHelper.generateId(), type, name, active = true, ranking, cards = [] } = {}) {
      return new Player(id, type, name, active, ranking, cards);
    }

    includesPenaltyCards() {
      return cardHelper.filterPenaltyCards(this.#cards).length > 0;
    }

    includesPlayableCards(activePlay, chosenShape) {
      return gameHelper.filterPlayableCards(this.#cards, activePlay.card, chosenShape).length > 0;
    }

    chooseNextCard(activePlay, chosenShape, penaltyEnabled) {
      const activeCard = activePlay.card;
      if (cardHelper.isPenaltyCard(activeCard) && penaltyEnabled) return cardHelper.filterPenaltyCards(this.#cards, { ordered: true })[0];

      return gameHelper.chooseBestPlayableCard(activeCard, this.#cards, chosenShape);
    }
  };
}
