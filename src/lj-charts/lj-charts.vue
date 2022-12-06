<script>
  import AdaptDistribute from './components/distribute'
  import AdaptFileType from './components/fileType'
  import config from './config'

  export default {
    name: 'lj-charts',
    components:{
      AdaptDistribute,
      AdaptFileType,
    },
    props:{
      type: {
        type: [String, Number],
        default: () => undefined,
      },
    },
    data(){
      return {}
    },
    render(h) {
      const tag = config[this.type]
      const attrs = this.$attrs

      return h(tag, {
        props: attrs,
        attrs,
        on: {
          ...this.$listeners,
        }
      })
    }
  }
</script>
