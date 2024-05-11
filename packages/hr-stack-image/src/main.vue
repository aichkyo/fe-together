<script>
  export default {
    name: 'HrStackImage',
    props: {
      list: {
        type: Array,
        default: () => []
      },
      size: {
        type: String,
        default: '30px'
      },
      radius: {
        type: String,
        default: '30px'
      },
      stackSize: {
        type: String,
        default: '6px'
      }
    },
    emits: ['click'],
    computed: {
      hasList () {
        return Array.isArray(this.list) && this.list.length > 0
      }
    },
    methods: {
      handleImageClick (index) {
        this.$emit('click', index)
      }
    },
    render () {
      const imgConfigStyle = {
        width: this.size,
        height: this.size,
        borderRadius: this.radius
      }
      return (
        this.hasList ? <div class="image-group">
          {
            this.list.map((url, index) =>
              <img
                src={url}
                style={{ ...imgConfigStyle, marginLeft: index === 0 ? '0' : `-${this.stackSize}` }}
                onClick={() => this.handleImageClick(index)}>
              </img>
            )
          }
        </div> : null
      )
    }
  }
</script>

<style lang="less" scoped>
  .image-group {
    display: flex;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
      border-radius: 20px;
      border: 1px solid #ffffff;
      cursor: pointer;

      &:hover {
        transform: scale(1.5);
      }

      &:last-child {
        margin-left: 0;
      }
    }
  }
</style>