<script>
  import config from './config'
  import AdaptUnknow from './components/unknow'
  import AdaptInput from './components/input'
  import AdaptInputTextarea from './components/input_textarea'
  import AdaptSelect from './components/select'
  import AdaptCascader from './components/cascader'
  import AdaptDatePicker from './components/date-picker'
  import AdaptInputNumber from './components/number'
  import AdaptRadio from './components/radio'
  import AdaptSwitch from './components/switch'

  export default {
    name: 'lj-input',
    components: {
      AdaptUnknow,
      AdaptInput,
      AdaptInputTextarea,
      AdaptSelect,
      AdaptCascader,
      AdaptDatePicker,
      AdaptInputNumber,
      AdaptRadio,
      AdaptSwitch,
    },
    props: {
      code: {
        type: [Number, String],
        default: undefined,
      },
    },
    data() {
      return {
        localVal: '',
      }
    },
    methods: {
      change(val) {
        this.$emit('input', val)
      },
    },
    render(h) {
      const tag = `adapt-${config[this.code] || 'unknow'}`
      const attrs = this.$attrs

      return h(tag, {
        attrs,
        props: attrs,
        on: {
          'adapt-change': this.change,
          ...this.$listeners,
          change: (val) => {
            this.$emit('change', val, this.code)
          }
        },
      })
    },
  }
</script>
