<template>
  <div v-for="order in props.orders" :key="order.orderID">
    <div class="card p-2 mb-3 text-start" style="width: 100%">
      <div class="card-header">Order {{ order.orderID }}</div>
      <div class="card-body">
        <div class="card-title" v-if="order.isVIP == true">Type: VIP</div>
        <div class="card-title" v-else-if="order.isVIP == false">Type: Normal</div>
        <div class="card-text">Status: {{ order.status }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Order } from "../stores/order";

interface Props {
  orders: Order[]; 
}

// const props = defineProps({
//   order: {
//     type: Array as PropType<Order[]>,
//     required: true,
//     default: () => [],
//   }
// })

const props = defineProps<Props>(); // a reference to the interface 'Props'/ object literal type in the same file
</script>
