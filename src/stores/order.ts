import { defineStore } from "pinia";

export interface Order {
  orderID: number;
  isVIP: boolean;
  status: "pending" | "processing" | "complete";
}

export const useOrderStore = defineStore({
  id: "order",
  state: () => ({
    orderList: [] as Order[],
  }),
  getters: {
    getNormalOrders: (state) => {
      return state.orderList.filter((order) => !order.isVIP && order.status != 'complete');
    },
    getVIPOrders: (state) => {
      return state.orderList.filter((order) => order.isVIP && order.status != 'complete');
    },
    getCompleteOrders: (state) => {
      return state.orderList.filter((order) => order.status === "complete");
    },
    getPendingOrder: (state) => {
      const vipOrder = state.orderList.find((order) => order.isVIP && order.status == 'pending');
      if (vipOrder != undefined) {
        return vipOrder;
      } else{
        const normalOrder = state.orderList.find((order) => !order.isVIP && order.status == 'pending');
        return normalOrder;
      }
    }
  },
  actions: {
    addOrder(vip: boolean) {
      const order: Order = {
        orderID: this.orderList.length + 1,
        isVIP: vip,
        status: "pending",
      };
      this.orderList.push(order);
    },
    updateOrderStatus(
      orderID: number,
      status: "pending" | "processing" | "complete"
    ) {
      const orderSpecified = this.orderList.find(
        (order) => order.orderID == orderID
      );
      if (orderSpecified) {
        orderSpecified.status = status;
      }
    },
    resetOrderStatus(orderID: number | null) {
      if(orderID == null) {
        return;
      }
      const orderSpecified = this.orderList.find(
        (order) => order.orderID == orderID
      );
      if (orderSpecified != undefined) {
        orderSpecified.status = "pending";
      }
    },
  },
});
