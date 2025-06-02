<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue-sonner';

import { ImagePlusIcon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Api } from '@/lib/api';
import type { PageFile } from '@/lib/types';

const isOpen = ref(false);
const file = ref<File | null>(null);

const toggleMenu = (value: boolean) => {
  isOpen.value = value;
};

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;

  const newFile = target.files?.[0];

  if (newFile) {
    file.value = newFile;
  }

  console.log('file', file.value);
};

const handleUpload = async () => {
  if (!file.value) return;

  const promise = Api.uploadImage('1', file.value);

  toast.promise(promise, {
    loading: 'Uploading image...',
    success: (data: PageFile) => {
      console.log('data', data);
      isOpen.value = false;
      return 'Image uploaded successfully';
    },
    error: (err: Error) => {
      console.log('err', err);
      return 'Failed to upload image';
    },
  });
};
</script>

<template>
  <Dialog v-model:open="isOpen" @update:open="toggleMenu">
    <DialogTrigger as-child>
      <Button variant="ghost" size="icon">
        <ImagePlusIcon class="h-4 w-4" />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Upload image</DialogTitle>
        <DialogDescription>Upload an image to your page</DialogDescription>
      </DialogHeader>
      <form class="flex flex-col gap-2">
        <Input type="file" accept="image/*" @change="handleFileChange" />
      </form>

      <DialogFooter>
        <Button variant="outline" @click="isOpen = false">Cancel</Button>
        <Button type="submit" @click="handleUpload">Upload</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
