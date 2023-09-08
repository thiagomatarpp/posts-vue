<script lang="ts" setup>

import {computed} from "vue";
import {TimelinePost} from "../post.ts";
import {DateTime} from "luxon";
import TimelineItem from "./TimelineItem.vue";
import {usePosts} from "../stores/posts.ts";
import {periods} from "../constants.ts";


const postsStore = usePosts();
await postsStore.fetchPosts();

const posts = computed<TimelinePost[]>(() => {
  return postsStore.ids
      .map(id => {
        const post = postsStore.all.get(id)
        if (!post) {
          throw Error(`Post with id of ${id} was expected but not found`)
        }
        return {
          ...post,
          created: DateTime.fromISO(post.created)
        }
      })
      .filter(post => {
        if (postsStore.selectedPeriod === "Today") {
          return post.created >= DateTime.now().minus({day: 1})
        }

        if (postsStore.selectedPeriod === "This Week") {
          return post.created >= DateTime.now().minus({week: 1})
        }

        return post;
      })

});

</script>


<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
          v-for="period of periods"
          :key="period"
          :class="{'is-active': period === postsStore.selectedPeriod}"
          @click="postsStore.setSelectedPeriod(period)"
      >
        {{ period }}
      </a>
    </span>
    <TimelineItem v-for="post of posts" :key="post.id" :post="post"/>
  </nav>
</template>