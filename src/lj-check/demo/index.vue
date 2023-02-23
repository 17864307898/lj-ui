<template>
  <lj-check :data="data"></lj-check>
</template>

<script>
  export default {
    name: '',
    components:{},
    props:{},
    data(){
      return {
        data: [
          {
            line: 14060,
            'file_type': 1,
            count: 3792,
            'match_type': 0,
            size: 359819
          },
          {
            size: 47412978,
            line: 1322301,
            'file_type': 0,
            'match_type': 4,
            count: 3031
          },
        ]
      }
    },
  }
</script>
