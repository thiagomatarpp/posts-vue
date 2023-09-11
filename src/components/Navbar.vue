<script lang="ts" setup>

import {useModal} from "../composables/modal.ts";
import SignupForm from "./SignupForm.vue";

const modal = useModal()
</script>
<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <button class="button" @click="modal.showModal()">Sign up</button>
        <RouterLink class="button" to="/posts/new">New Post</RouterLink>
      </div>
    </div>
  </div>
  <Teleport to="#modal">
   <SignupForm/>
  </Teleport>
</template>

