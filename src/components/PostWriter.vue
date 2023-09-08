<script lang="ts" setup>
import {TimelinePost} from "../post";
import {onMounted, ref, watch} from "vue";
import {marked} from "marked";
import highlightjs from "highlight.js";
import {debounce} from "lodash";
import {usePosts} from "../stores/posts.ts";
import {useRouter} from "vue-router";

const props = defineProps<{
  post: TimelinePost;
}>()

const title = ref(props.post.title)
const content = ref(props.post.markdown)
const html = ref('')
const contentEditable = ref<HTMLDivElement>()
const posts = usePosts()
const router = useRouter();

function parseHtml(markdown: string) {
  marked.parse(markdown, {
    gfm: true,
    breaks: true,
    highlight: (code) => {
      return highlightjs.highlightAuto(code).value
    }
  }, (err, parseResult) => {
    html.value = parseResult
  })
}

watch(content, debounce((newContent) => {
  parseHtml(newContent)
}, 2500), {immediate: true})


onMounted(() => {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  contentEditable.value.innerText = content.value
})

function handleInput() {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  content.value = contentEditable.value.innerText
}

async function handleClick() {
  const newPost: TimelinePost = {
    ...props.post,
    title: title.value,
    markdown: content.value,
    html: html.value
  }
  await posts.createPost(newPost)
  await router.push("/")
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label"> Post title</div>
        <input v-model="title" class="input" type="text">
      </div>

    </div>
  </div>
  <div class="columns">
    <div class="column">
      <div ref="contentEditable" contenteditable @input="handleInput">
      </div>
    </div>
    <div class="column">
      <div v-html="html"/>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <button class="button is-primary is-pulled-right" @click="handleClick">
        Save Post
      </button>
    </div>
  </div>
</template>