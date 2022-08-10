import { defineStore } from "pinia";

export interface Bot {
  botID: number;
  workingOn: number | null;
  timer: NodeJS.Timer | null;
}

export const useBotStore = defineStore({
  id: "bot",
  state: () => ({
    botList: [] as Bot[],
    // isRunning: true,
  }),
  getters: {
    getAllBots: (state) => {
      return state.botList;
    },
    getAvailableBot: (state) => {
      // console.log('getting first bot....')
      return state.botList.find(
        (bot) => bot.workingOn === null && bot.timer === null
      );
    },
    getLastBot: (state) => {
      return state.botList[state.botList.length - 1];
    },
    getLastBotWorkingOn: (state) => {
      return state.botList[state.botList.length - 1]?.workingOn; 
      // use ?. to avoid it access undefine's properties
    },
    getLastBotTimer: (state) => {
      return state.botList[state.botList.length - 1]?.timer;
    },
    getBotById: (state) => {
      return (botID: number) =>
        state.botList.find((bot) => bot.botID === botID);
    },
  },
  actions: {
    addBot() {
      // note from king, concept of x++ and ++x
      // var x = 1;
      // y = x++
      // y = x
      // x += 1
      // y = ++x
      const bot: Bot = {
        botID: this.botList.length + 1, // .length++ IS WRONG, u cant add the length of array, and ++ has assignment to the value
        workingOn: null,
        timer: null,
      };
      this.botList.push(bot);
    },
    deleteBot(onComplete: (orderId: number) => void) { // receive a function, assigningg to onComplete
      const lastBot = this.getLastBot;
      if (!!lastBot) {
        const orderID = lastBot.workingOn;
        if (!!lastBot.timer) {
          // !! will check whether it is null or undefined
          clearTimeout(lastBot.timer);
        }
        this.botList.pop();
        onComplete(orderID!); // call the function, passingthe orderID
        // orderID! '!' behind means it will NOT BE NULL
      }
    },
    resetBot(botID: number) {
      // get the bot, then reset its status
      const botSpecified = this.botList.find((bot) => bot.botID == botID);
      // const botSpecified = this.getBotById(botID); // cant work
      if (!!botSpecified) {
        botSpecified.workingOn = null;
        botSpecified.timer = null;
      }
    },
    updateBotToWork(botID: number, orderID: number, timer: NodeJS.Timer) {
      const botSpecified = this.botList.find((bot) => bot.botID == botID);
      if (!!botSpecified) {
        botSpecified.workingOn = orderID;
        botSpecified.timer = timer;
      }
    },
  },
});
