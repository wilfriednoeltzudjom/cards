import { CARD_VALUES, GAME_MODES, GAME_STATUSES } from '../enums';
import buildPlay from './play';
import buildCard from './card';
import buildPlayer from './player';
import cardHelper from '../helpers/card.helper';
import gameHelper from '../helpers/game.helper';
import { isNonEmptyArray, isNonEmptyObject } from '../../utilities/data-validation.helper';

export default function buildGame(dependencies) {
  const Play = buildPlay(dependencies);
  const Card = buildCard(dependencies);
  const Player = buildPlayer(dependencies);
  const { idHelper, dateHelper, arrayHelper, dataHelper } = dependencies;

  return class Game {
    #id;
    #mode;
    #createdAt;
    #updatedAt;
    #startedAt;
    #cancelledAt;
    #endedAt;
    #status;
    #cards;
    #initialCardsPerPlayerCount;
    #activePlays;
    #playsHistory;
    #players;
    #activePlayer;
    #nextPlayerChosenAt;
    #chosenShape;
    #penaltyEnabled;
    #penaltyCards = [];
    #effectEnabled;

    constructor(
      id,
      mode,
      createdAt,
      updatedAt,
      startedAt,
      cancelledAt,
      endedAt,
      status,
      cards,
      initialCardsPerPlayerCount,
      activePlays,
      playsHistory,
      players,
      activePlayer,
      nextPlayerChosenAt,
      chosenShape,
      penaltyEnabled,
      penaltyCards,
      effectEnabled
    ) {
      this.#id = id;
      this.#mode = mode;
      this.#createdAt = createdAt;
      this.#updatedAt = updatedAt;
      this.#startedAt = startedAt;
      this.#cancelledAt = cancelledAt;
      this.#endedAt = endedAt;
      this.#status = status;
      this.#cards = cards;
      this.#initialCardsPerPlayerCount = initialCardsPerPlayerCount;
      this.#activePlays = activePlays;
      this.#playsHistory = playsHistory;
      this.#players = players;
      this.#activePlayer = activePlayer;
      this.#nextPlayerChosenAt = nextPlayerChosenAt;
      this.#chosenShape = chosenShape;
      this.#penaltyEnabled = penaltyEnabled;
      this.#penaltyCards = penaltyCards;
      this.#effectEnabled = effectEnabled;
    }

    get id() {
      return this.#id;
    }

    get mode() {
      return this.#mode;
    }

    get createdAt() {
      return this.#createdAt;
    }

    get updatedAt() {
      return this.#updatedAt;
    }

    set startedAt(startedAt) {
      this.#startedAt = startedAt;
    }

    get startedAt() {
      return this.#startedAt;
    }

    get cancelledAt() {
      return this.#cancelledAt;
    }

    set endedAt(endedAt) {
      this.#endedAt = endedAt;
    }

    get endedAt() {
      return this.#endedAt;
    }

    set status(status) {
      this.#status = status;
    }

    get status() {
      return this.#status;
    }

    set cards(cards) {
      this.#cards = cards;
    }

    get cards() {
      return this.#cards;
    }

    set initialCardsPerPlayerCount(initialCardsPerPlayerCount) {
      this.#initialCardsPerPlayerCount = initialCardsPerPlayerCount;
    }

    get initialCardsPerPlayerCount() {
      return this.#initialCardsPerPlayerCount;
    }

    set activePlays(activePlays) {
      this.#activePlays = activePlays;
    }

    get activePlays() {
      return this.#activePlays;
    }

    set playsHistory(playsHistory) {
      this.#playsHistory = playsHistory;
    }

    get playsHistory() {
      return this.#playsHistory;
    }

    set players(players) {
      this.#players = players;
    }

    get players() {
      return this.#players;
    }

    set activePlayer(activePlayer) {
      this.#activePlayer = activePlayer;
    }

    get activePlayer() {
      return this.#activePlayer;
    }

    get chosenShape() {
      return this.#chosenShape;
    }

    get penaltyEnabled() {
      return this.#penaltyEnabled;
    }

    get effectEnabled() {
      return this.#effectEnabled;
    }

    toJSON() {
      const additionalJSON = {};
      if (this.#activePlays) additionalJSON.activePlays = this.#activePlays.map((play) => play.toJSON());
      if (this.#playsHistory) additionalJSON.playsHistory = this.#playsHistory.map((play) => play.toJSON());
      if (this.#activePlayer) additionalJSON.activePlayer = this.#activePlayer.toJSON();
      if (this.#penaltyCards) additionalJSON.penaltyCards = this.#penaltyCards.map((card) => card.toJSON());

      return dataHelper.removeUndefinedProperties({
        id: this.#id,
        mode: this.#mode,
        startedAt: this.#startedAt,
        endedAt: this.#endedAt,
        createdAt: this.#createdAt,
        updatedAt: this.#updatedAt,
        status: this.#status,
        cards: this.#cards.map((card) => card.toJSON()),
        players: this.#players.map((player) => player.toJSON()),
        nextPlayerChosenAt: this.#nextPlayerChosenAt,
        chosenShape: this.#chosenShape,
        penaltyEnabled: this.#penaltyEnabled,
        effectEnabled: this.#effectEnabled,
        ...additionalJSON,
      });
    }

    static fromJSON({
      id,
      mode,
      createdAt,
      updatedAt,
      cancelledAt,
      startedAt,
      endedAt,
      status,
      initialCardsPerPlayerCount = 4,
      cards = [],
      activePlays = [],
      playsHistory = [],
      players = [],
      activePlayer,
      nextPlayerChosenAt,
      chosenShape,
      penaltyEnabled = false,
      penaltyCards = [],
      effectEnabled = false,
    } = {}) {
      return new Game(
        id,
        mode,
        createdAt,
        updatedAt,
        startedAt,
        cancelledAt,
        endedAt,
        status,
        isNonEmptyArray(cards) ? cards.map((card) => (isNonEmptyObject(card) ? Card.fromJSON(card) : card)) : [],
        initialCardsPerPlayerCount,
        isNonEmptyArray(activePlays) ? activePlays.map((play) => (isNonEmptyObject(play) ? Play.fromJSON(play) : play)) : [],
        isNonEmptyArray(playsHistory) ? playsHistory.map((play) => (isNonEmptyObject(play) ? Play.fromJSON(play) : play)) : [],
        isNonEmptyArray(players) ? players.map((player) => (isNonEmptyObject(player) ? Player.fromJSON(player) : player)) : [],
        isNonEmptyObject(activePlayer) ? Player.fromJSON(activePlayer) : activePlayer,
        nextPlayerChosenAt,
        chosenShape,
        penaltyEnabled,
        isNonEmptyArray(penaltyCards) ? penaltyCards.map((card) => (isNonEmptyObject(card) ? Card.fromJSON(card) : card)) : [],
        effectEnabled
      );
    }

    static newInstance({
      id = idHelper.generateId(),
      mode = GAME_MODES.OFFLINE,
      createdAt = dateHelper.currentDate(),
      updatedAt = dateHelper.currentDate(),
      startedAt,
      cancelledAt,
      endedAt,
      status = GAME_STATUSES.PENDING,
      initialCardsPerPlayerCount = 4,
      cards = [],
      activePlays = [],
      playsHistory = [],
      players = [],
      activePlayer,
      nextPlayerChosenAt,
      chosenShape,
      penaltyEnabled = false,
      penaltyCards = [],
      effectEnabled = false,
    } = {}) {
      return new Game(
        id,
        mode,
        createdAt,
        updatedAt,
        startedAt,
        cancelledAt,
        endedAt,
        status,
        cards,
        initialCardsPerPlayerCount,
        activePlays,
        playsHistory,
        players,
        activePlayer,
        nextPlayerChosenAt,
        chosenShape,
        penaltyEnabled,
        penaltyCards,
        effectEnabled
      );
    }

    startGame() {
      this.#startedAt = dateHelper.currentDate();
      this.#status = GAME_STATUSES.STARTED;

      const shuffledCards = arrayHelper.shuffle(this.#cards);
      this.distributeCards(shuffledCards);

      const { initialCard, restOfCards } = this.extractInitialCard();
      this.setInitialCard(initialCard, restOfCards);
    }

    distributeCards(shuffledCards) {
      for (let count = 0; count < this.#initialCardsPerPlayerCount; count++) {
        this.#players.forEach((player) => {
          player.cards.push(shuffledCards.shift());
        });
      }
      this.#cards = shuffledCards;
    }

    extractInitialCard() {
      const [initialCard, ...restOfCards] = arrayHelper.shuffle(this.#cards);
      if (cardHelper.isCardSpecial(initialCard)) return this.extractInitialCard();

      return { initialCard, restOfCards };
    }

    setInitialCard(initialCard, restOfCards) {
      initialCard.covered = false;
      this.#cards = restOfCards;
      this.#activePlays.push(Play.newInstance({ card: initialCard, playedByBroker: true }));
      this.setNextPlayer(this.#players[0]);
    }

    play(card, player, shape, playedAt = dateHelper.currentDate()) {
      if (player.id !== this.#activePlayer.id) return;
      card.covered = false;

      const play = Play.newInstance({ startedAt: this.#nextPlayerChosenAt, playedAt, card, player });
      if (gameHelper.isPlayValid(play.card, [...this.#activePlays].pop().card, this.#chosenShape)) {
        this.removeActivePlayerPlayedCard(card);
        this.registerNewPlay(play, shape);
        this.updateActivePlayerAfterPlay();
        if (this.isEnded()) {
          this.updateGameAsEnded();
          return;
        }
        this.registerPenalty(card);
        if (cardHelper.isEffectCard(card)) {
          this.#effectEnabled = true;
        }
        this.chooseNextPlayer();
      } else this.giveActivePlayerAdditionalCards({ cardsCount: 1 });
    }

    removeActivePlayerPlayedCard(card) {
      this.#activePlayer.cards = this.#activePlayer.cards.filter(({ id }) => id !== card.id);
      this.registerActivePlayerUpdates();
    }

    registerActivePlayerUpdates() {
      this.#players = this.#players.map((player) => {
        if (player.id === this.#activePlayer.id) return this.#activePlayer;

        return player;
      });
    }

    registerNewPlay(play, shape) {
      this.#activePlays.push(play);
      this.#playsHistory.push(play);
      if (play.card.value === CARD_VALUES.JACK) {
        this.#chosenShape = shape;
      } else this.#chosenShape = '';
    }

    updateActivePlayerAfterPlay() {
      if (this.#activePlayer.cards.length === 0) {
        const lastPlay = this.#activePlays[this.#activePlays.length - 1];
        if (lastPlay.card.value === CARD_VALUES.A) {
          this.giveActivePlayerAdditionalCards({ cardsCount: 1 });
        } else {
          this.#activePlayer.active = false;
          this.#activePlayer.endedAt = dateHelper.currentDate();
          this.#activePlayer.ranking = this.getPlayerRanking();
          this.registerActivePlayerUpdates();
        }
      }
    }

    getPlayerRanking() {
      return this.#players.filter((player) => !player.active).length;
    }

    isEnded() {
      const remainingActivePlayers = this.#players.filter((player) => player.active);

      return remainingActivePlayers.length <= 1;
    }

    updateGameAsEnded() {
      this.#status = GAME_STATUSES.ENDED;
      this.#endedAt = dateHelper.currentDate();
      this.#activePlayer = undefined;
      this.#chosenShape = '';
      this.#players = this.#players.map((player) => {
        if (player.active) {
          player.active = false;
          player.endedAt = dateHelper.currentDate();
          player.ranking = this.#players.length;
        }

        return player;
      });
    }

    chooseNextPlayer() {
      const activePlay = this.#activePlays[this.#activePlays.length - 1];
      const card = activePlay.card;
      let excludedPlayersCount = 0;
      let reverse = false;
      if (this.#effectEnabled) {
        if (card.value === CARD_VALUES.A) {
          excludedPlayersCount = 1;
        } else if (card.value === CARD_VALUES.TEN) {
          reverse = true;
        }
        this.#effectEnabled = false;
      }

      const { nextActivePlayerIndex, players } = gameHelper.getNextActivePlayerIndex(this.#activePlayer, this.#players, {
        excludedPlayersCount,
        reverse,
      });
      if (isNonEmptyArray(players)) {
        this.#players = players;
      }
      this.setNextPlayer(this.#players[nextActivePlayerIndex]);
    }

    setNextPlayer(player) {
      this.#activePlayer = player;
      this.#nextPlayerChosenAt = dateHelper.currentDate();
    }

    registerPenalty(card) {
      if (cardHelper.isPenaltyCard(card)) {
        this.#penaltyEnabled = true;
        this.#penaltyCards.push(card);
      }
    }

    giveActivePlayerAdditionalCards({ cardsCount = 0 }) {
      if (cardsCount > this.#cards.length) this.recoverCardsFromActivePlays();
      let counter = 0;
      const additionalCards = [];
      while (counter < cardsCount && this.#cards.length > 0) {
        additionalCards.push(this.#cards.pop());
        counter++;
      }
      this.#activePlayer.cards.push(
        ...additionalCards.map((card) => {
          card.covered = true;

          return card;
        })
      );
      this.registerActivePlayerUpdates();
      this.chooseNextPlayer();
    }

    recoverCardsFromActivePlays() {
      const nonActivePlays = this.#activePlays.slice(0, this.#activePlays.length - 1);
      const recoveredCards = arrayHelper.shuffle(gameHelper.toCards(nonActivePlays)).map((card) => {
        card.covered = true;

        return card;
      });
      this.#cards.unshift(...recoveredCards);
      this.#activePlays = [this.#activePlays[this.#activePlays.length - 1]];
    }

    pickPenaltyCards() {
      const cardsCount = isNonEmptyArray(this.#penaltyCards)
        ? this.#penaltyCards.reduce((accumulator, card) => {
            if (card.value === CARD_VALUES.JOKER) return accumulator + 4;
            else if (card.value === CARD_VALUES.SEVEN) return accumulator + 2;

            return accumulator;
          }, 0)
        : 0;
      this.giveActivePlayerAdditionalCards({ cardsCount });
      this.#penaltyEnabled = false;
      this.#penaltyCards = [];
    }
  };
}
