import { isNonEmptyArray, isNonEmptyObject } from '../../utilities/data-validation.helper';
import cardHelper from '../helpers/card.helper';
import gameHelper from '../helpers/game.helper';
import buildCard from './card';

export default function buildPlayer(dependencies) {
  const Card = buildCard(dependencies);
  const { idHelper, dataHelper } = dependencies;

  return class Player {
    #id;
    #socketId;
    #type;
    #name;
    #creator;
    #active;
    #ranking;
    #cards;
    #leftAt;
    #endedAt;

    constructor(id, socketId, type, name, creator, active, ranking, cards, leftAt, endedAt) {
      this.#id = id;
      this.#socketId = socketId;
      this.#type = type;
      this.name = name;
      this.#creator = creator;
      this.#active = active;
      this.#ranking = ranking;
      this.#cards = cards;
      this.#leftAt = leftAt;
      this.#endedAt = endedAt;
    }

    get id() {
      return this.#id;
    }

    get socketId() {
      return this.#socketId;
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

    get creator() {
      return this.#creator;
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

    set leftAt(leftAt) {
      this.#leftAt = leftAt;
    }

    get leftAt() {
      return this.#leftAt;
    }

    toJSON() {
      const additionalJSON = {};
      if (this.#cards) additionalJSON.cards = this.#cards.map((card) => card.toJSON());

      return dataHelper.removeUndefinedProperties({
        id: this.#id,
        socketId: this.#socketId,
        type: this.#type,
        name: this.#name,
        creator: this.#creator,
        active: this.#active,
        ranking: this.#ranking,
        leftAt: this.#leftAt,
        endedAt: this.#endedAt,
        ...additionalJSON,
      });
    }

    static fromJSON({ id, creator, socketId, type, name, active, ranking, cards, leftAt, endedAt } = {}) {
      return new Player(
        id,
        socketId,
        type,
        name,
        creator,
        active,
        ranking,
        isNonEmptyArray(cards) ? cards.map((card) => (isNonEmptyObject(card) ? Card.fromJSON(card) : card)) : [],
        leftAt,
        endedAt
      );
    }

    static newInstance({ id = idHelper.generateId(), socketId, type, name, creator = false, active = true, ranking, cards = [], leftAt } = {}) {
      return new Player(id, socketId, type, name, creator, active, ranking, cards, leftAt);
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
