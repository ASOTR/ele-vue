<template>
  <!-- 用于挂载到body上的蒙层组件 -->
  <div class="common-mask">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VMask',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    filter: {
      type: String,
      default: 'blur(2px)',
    },
  },
  watch: {
    show() {
      // 挂载到#app
      const node = document.body.firstElementChild;
      if (this.show && this.filter) {
        node.style.setProperty('filter', this.filter);
      } else {
        node.style.removeProperty('filter');
      }
    },
  },
  mounted() {
    document.body.appendChild(this.$el);
  },
  destroyed() {
    if (this.$el.parentNode) this.$el.parentNode.removeChild(this.$el);
  },
};
</script>

<style scoped>

</style>
