<template>
  <div
    class="d-flex flex-row justify-content-center align-items-start"
    style="width: 100%; height: 100%"
  >
    <div class="d-flex flex-column justify-content-center page text-center">
      <h2 class="p-4">Customer Page</h2>
      <div class="d-flex flex-row justify-content-evenly">
        <button class="btn btn-primary" @click="orderStore.addOrder(false)">
          Normal Order
        </button>
        <button class="btn btn-primary" @click="orderStore.addOrder(true)">
          VIP Order
        </button>
      </div>
      <hr />
      <div class="d-flex flex-row justify-content-evenly">
        <div class="d-flex flex-column">
          <h3>Pending</h3>
          <hr />
          <div class="d-flex flex-column" id="pending-area">
            <OrderCard :orders="VIPOrders" />
            <OrderCard :orders="NormalOrders" />
          </div>
        </div>
        <div class="d-flex flex-column">
          <h3>Complete</h3>
          <hr />
          <div class="d-flex flex-column" id="complete-area">
            <OrderCard :orders="CompleteOrder" />
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex flex-column justify-content-center page text-center">
      <h2 class="p-4">Manager Page</h2>
      <div class="d-flex flex-row justify-content-evenly">
        <button class="btn btn-primary" @click="botStore.addBot()">
          + bot
        </button>
        <button class="btn btn-primary" @click="deleteBot()">- bot</button>
      </div>
      <hr />
      <div id="bot-area">
        <BotCard />
      </div>
    </div>
  </div>
</template>

<style scoped>
.vl {
  border-left: 3px solid black;
  min-height: 100vh;
  left: 50%;
  margin-left: -3px;
  top: 0;
}

.page {
  width: 50%;
  min-height: 100%;
}
</style>

<script setup lang="ts">
import OrderCard from "./components/OrderCard.vue";
import BotCard from "./components/BotCard.vue";
import { useOrderStore, type Order } from "./stores/order";
import { computed, watch } from "vue";
import { useBotStore, type Bot } from "./stores/bot";

const orderStore = useOrderStore();
const botStore = useBotStore();


//computed will catch the newest state and return the newest xxx orders
const VIPOrders = computed(() => orderStore.getVIPOrders);
const NormalOrders = computed(() => orderStore.getNormalOrders);
const CompleteOrder = computed(() => orderStore.getCompleteOrders);

// orderStore.$subscribe((mutation, state) => {
//   console.log("mutation", mutation);
//   console.log("state", state);
//   processOrder();
// });

// botStore.$subscribe((mutation, state) => {
//   console.log("mutation", mutation);
//   console.log("state", state);
//   processOrder();
// });

watch(
  //source, callback, [options]
  // options got "deep", "immediate", "flush"
  // {flush: 'post'} is used when need to handle the updated's DOM
  () => orderStore.orderList,
  (orders: Order[]) => { // callback function, receive order list
    processOrder();
    console.log(orders);
  },
  { deep: true, immediate: true } 
);

watch(
  () => botStore.botList, //source
  (bots: Bot[]) => { //callback
    processOrder();
    console.log(bots);
  },
  { deep: true, immediate: true } //[options]

  // deep: watch nested field in an object
  // immediate: first run, it'll run first, and then detect changes and run
);


function processOrder() {
  const pendingOrder = orderStore.getPendingOrder;
  const availableBot = botStore.getAvailableBot;
  if (pendingOrder && availableBot) {
    const orderID = pendingOrder.orderID;
    const botID = availableBot.botID;
    console.log("[BEFORE] " + "order:" + orderID + "bot:" + botID);
    const constructTimer = setTimeout(() => {
      botStore.resetBot(botID);
      orderStore.updateOrderStatus(orderID, "complete");
    }, 10000);
    console.log("[PROCESSING] " + "order:" + orderID + "bot:" + botID);
    botStore.updateBotToWork(botID, orderID, constructTimer);
    orderStore.updateOrderStatus(orderID, "processing");
    return;
  }
}

function deleteBot() {
  botStore.deleteBot((orderId: number) => {
    orderStore.resetOrderStatus(orderId);
  }); // passing a function into deleteBot()
}
// note from xiao victor
// vue's watch, can watch specific field of state
// watch(
//   () => botStore.isRunning,
//   (state) => { //received newest list of state
//     console.log(state);
//   }
// );
</script>
