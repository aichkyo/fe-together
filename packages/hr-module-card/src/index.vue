<!--
 * @Author       : HR-OA-KTS 黄强 670604@ky-tech.com.cn
 * @Date         : 2023-08-15 21:28:37
 * @Description  : 
-->
<template>
  <div :class="{'module-card': true,'card-radius': radius}">
    <div :class="{'card-title': true, 'title-divider': divider }"
         v-if="showTitle">
      <slot name="title">
        <!-- 标题插槽,如果没传则显示以下默认格式 -->
        <div class='title-txt'>
          <slot name="prefix"></slot>
          {{title}}
        </div>
        <div class="title-btn">
          <div v-if="refresh"
               @click="handleBtnClick('refresh')">
            <ks-icon name="replay" />
          </div>
          <div v-if="edit"
               @click="handleBtnClick('edit')">
            <ks-icon name="edit" />
            <!-- <ks-image :src="require('@/assets/images/icon-edit.svg')"></ks-image> -->
          </div>
        </div>
      </slot>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hr-module-card',
    props: {
      // 标题名称
      title: {
        type: String,
        default: '',
      },
      // 标题-刷新按钮
      refresh: {
        type: Boolean,
        default: false,
      },
      // 标题-编辑按钮
      edit: {
        type: Boolean,
        default: false,
      },
      // 标题分割线
      divider: {
        type: Boolean,
        default: true
      },
      // 卡片-默认圆角
      radius: {
        type: Boolean,
        default: true
      }

    },
    computed: {
      // 是否显示标题，根据传参决定
      showTitle () {
        const hasTitleProps = this.title
        const hasTitleSlots = this.$slots && this.$slots.title
        // 如果传递了title的props或者 传递slot=title的插槽则显示
        return hasTitleProps || hasTitleSlots
      }
    },
    created () {
      // console.log('this.props :>> ', this);
    },
    methods: {
      // 标题按钮点击事件
      handleBtnClick (type) {
        this.$emit('clickTitleBtn', type)
      },
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/common.less";
  .module-card {
    margin-bottom: 10px;
    background-color: #fff;
    overflow: hidden;
    font-size: 14px;
  }
  .card-radius {
    border-radius: 8px;
    padding: 1px; // 留出了1px的白色底边
  }
  .card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 11px;
    background: linear-gradient(179deg, #edefff 9%, rgba(255, 255, 255, 0) 96%);
  }
  .title-divider {
    border-bottom: 1px solid #ebedf5;
  }

  .title-txt {
    color: #03050d;
    font-size: 16px;
    font-weight: 500;
  }
  .title-btn {
    display: flex;
    font-size: 12px;
    vertical-align: middle;
    color: @primaryColor;
    > div {
      margin-left: 5px;
      > i {
        vertical-align: middle;
        padding-right: 5px;
      }
    }
  }

  .card-content {
  }
</style>
