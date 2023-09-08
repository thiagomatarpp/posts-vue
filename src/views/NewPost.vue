<script lang="ts" setup>
import PostWriter from "../components/PostWriter.vue"
import {TimelinePost} from "../post.ts";
import {DateTime} from "luxon";


const post: TimelinePost = {
  id: "-1",
  title: "title",
  created: DateTime.now(),
  markdown: '## Title',
  html: '<h2>Title</h2>>'

}
</script>
<template>
  New post
  <PostWriter :post="post"/>
</template>