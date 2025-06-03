import { ref } from 'vue';

type ConfirmDialogOptions = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
};

const visible = ref(false);
const options = ref<ConfirmDialogOptions | null>(null);
const loading = ref(false);

const open = (opts: ConfirmDialogOptions) => {
  options.value = opts;
  visible.value = true;
};
const close = () => {
  visible.value = false;
  loading.value = false;
};
const confirm = async () => {
  if (!options.value) return;
  loading.value = true;
  await options.value.onConfirm();
  close();
};

export const useConfirmDialog = () => {
  return {
    visible,
    options,
    loading,
    open,
    close,
    confirm,
  };
};
