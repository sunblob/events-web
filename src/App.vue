<script setup lang="ts">
import { RouterView } from 'vue-router';

import ConfirmDeleteDialog from '@/components/common/ConfirmDeleteDialog.vue';
import { Toaster } from '@/components/ui/sonner';
import 'vue-sonner/style.css';
</script>

<template>
  <RouterView />
  <Toaster rich-colors />
  <ConfirmDeleteDialog />
</template>
