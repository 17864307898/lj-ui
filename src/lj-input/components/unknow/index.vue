<template>
  <div class="adapt-unknow">{{ translate('unknown') }}</div>
</template>

<script>
  import translateMixin from '../../mixins'

  export default {
    mixins: [translateMixin],
    data() {
      return {}
    },
    created() {},
    methods: { },
  }
</script>