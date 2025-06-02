<script setup lang="ts">
import { ImagePlusIcon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="ghost">
          <ImagePlusIcon class="h-4 w-4" />
          <span class="text-xs">Add</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add image</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
