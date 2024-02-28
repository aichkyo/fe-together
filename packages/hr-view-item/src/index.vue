<!--
 * @Author       : HR-OA-KTS 黄强 670604@ky-tech.com.cn
 * @Date         : 2023-08-23 19:07:30
 * @Description  : 
-->
<template>
  <div class="hr-view-info-item">
    <div class="label">
      <slot name="prefix"></slot>
      <span>{{ label }}</span>
    </div>
    <div class="content">
      <template v-if="hasValue()">
        <slot></slot>
      </template>
      <template v-else-if="showDefaultValue">
        <span> - </span>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hr-view-item',
    props: {
      label: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      },
      // 是否显示默认值 - 
      showDefaultValue: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
      // 是否传递有效插槽值 
      hasValue () {
        const defaultSlots = this.$slots.default
        if (!defaultSlots) return false
        // 插槽是否传递文本
        let soltText = defaultSlots[0].text
        if (soltText) {
          // 处理自动转义的 /n 换行字符
          soltText = soltText.trim()
        }
        // 插槽是否传递dom
        const soltTag = defaultSlots[0].tag

        return soltText || soltTag
      }
    },
    computed: {
    },
  }
</script>

<style lang="less" scoped>
  .hr-view-info-item {
    display: flex;
    line-height: 28px;
    .label,
    .content {
      font-size: 14px;
      font-weight: normal;
    }
    .label {
      min-width: 86px;
      color: #6e6d72;
    }
    .content {
      color: #03050d;
      word-break: break-word;
    }
  }
</style>
