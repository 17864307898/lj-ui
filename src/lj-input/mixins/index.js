import { translate } from '../../utils/translate'
const t = translate('ljInput')

export default {
  props: {
    placeholder: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    translate(path) {
      return t(path)
    },
  },
}