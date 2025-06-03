<script setup lang="ts">
import AlertDialog from '@/components/ui/alert-dialog/AlertDialog.vue';
import AlertDialogAction from '@/components/ui/alert-dialog/AlertDialogAction.vue';
import AlertDialogCancel from '@/components/ui/alert-dialog/AlertDialogCancel.vue';
import AlertDialogContent from '@/components/ui/alert-dialog/AlertDialogContent.vue';
import AlertDialogDescription from '@/components/ui/alert-dialog/AlertDialogDescription.vue';
import AlertDialogTitle from '@/components/ui/alert-dialog/AlertDialogTitle.vue';
import { useConfirmDialog } from '@/composables/use-confrim-dialog';

const { visible, options, loading, confirm, close } = useConfirmDialog();

const defaultTitle = 'Delete?';
const defaultDescription = 'This action cannot be undone. Are you sure you want to delete?';
const defaultConfirmText = 'Delete';
const defaultCancelText = 'Cancel';

const handleConfirm = () => {
  confirm();
};
const handleCancel = () => {
  close();
};
</script>

<template>
  <AlertDialog v-model:open="visible">
    <AlertDialogContent>
      <AlertDialogTitle>{{ options?.title || defaultTitle }}</AlertDialogTitle>
      <AlertDialogDescription>
        {{ options?.description || defaultDescription }}
      </AlertDialogDescription>
      <div class="flex justify-end gap-2 mt-6">
        <AlertDialogCancel @click="handleCancel">
          {{ options?.cancelText || defaultCancelText }}
        </AlertDialogCancel>
        <AlertDialogAction :disabled="loading" @click="handleConfirm">
          <span v-if="loading" class="animate-spin mr-2">⏳</span>
          {{ options?.confirmText || defaultConfirmText }}
        </AlertDialogAction>
      </div>
    </AlertDialogContent>
  </AlertDialog>
</template>
