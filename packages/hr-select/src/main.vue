<template>
  <div>
    <van-field readonly
               clickable
               v-bind="$attrs"
               :placeholder="placeholder"
               @click="myShow = true" />
    <van-popup v-model="myShow"
               v-bind="$attrs"
               :position="position"
               :round="round">
      <van-picker show-toolbar
                  v-bind="$attrs"
                  @cancel="myShow = false"
                  @confirm="confirm" />
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: "HrSelect",
    model: {
      prop: 'inputValue'
    },
    props: {
      position: {
        type: String,
        default: 'bottom'
      },
      round: {
        type: Boolean,
        default: true
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      show: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      myShow: {
        get () {
          return this.show
        },
        set (val) {
          this.$emit('update:show', val)
        }
      }
    },
    methods: {
      confirm (val) {
        this.$emit('input', val.code)
        this.$emit('select', val)
        this.myShow = false
      }
    }
  }
</script>
