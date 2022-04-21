import buildCard from './card';
import buildPlayer from './player';
import { isNonEmptyObject } from '../../utilities/data-validation.helper';

export default function buildPlay(dependencies) {
  const Card = buildCard(dependencies);
  const Player = buildPlayer(dependencies);
  const { dateHelper, idHelper } = dependencies;

  return class Play {
    #id;
    #startedAt;
    #playedAt;
    #playedByBroker;
    #card;
    #player;

    constructor(id, startedAt, playedAt, card, player, playedByBroker = false) {
      this.#id = id;
      this.#startedAt = startedAt;
      this.#playedAt = playedAt;
      this.#card = card;
      this.#player = player;
      this.#playedByBroker = playedByBroker;
    }

    get id() {
      return this.#id;
    }

    set startedAt(startedAt) {
      this.#startedAt = startedAt;
    }

    get startedAt() {
      return this.#startedAt;
    }

    set playedAt(playedAt) {
      this.#playedAt = playedAt;
    }

    get playedAt() {
      return this.#playedAt;
    }

    set card(card) {
      this.#card = card;
    }

    get card() {
      return this.#card;
    }

    set player(player) {
      this.#player = player;
    }

    get player() {
      return this.#player;
    }

    set playedByBroker(playedByBroker) {
      this.#playedByBroker = playedByBroker;
    }

    get playedByBroker() {
      return this.#playedByBroker;
    }

    toJSON() {
      const additionalJSON = {};
      if (this.#startedAt) additionalJSON.startedAt = this.#startedAt;
      if (this.#player) additionalJSON.player = this.#player.toJSON();

      return {
        id: this.#id,
        playedAt: this.playedAt,
        playedByBroker: this.#playedByBroker,
        card: this.#card.toJSON(),
        ...additionalJSON,
      };
    }

    static fromJSON({ id, startedAt, playedAt, playedByBroker, card, player } = {}) {
      return new Play(
        id,
        startedAt,
        playedAt,
        isNonEmptyObject(card) ? Card.fromJSON(card) : card,
        isNonEmptyObject(player) ? Player.fromJSON(player) : player,
        playedByBroker
      );
    }

    static newInstance({
      id = idHelper.generateId(),
      startedAt = dateHelper.currentDate(),
      playedAt = dateHelper.currentDate(),
      playedByBroker,
      card,
      player,
    } = {}) {
      return new Play(id, startedAt, playedAt, card, player, playedByBroker);
    }
  };
}
