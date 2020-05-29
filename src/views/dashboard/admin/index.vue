<template>
  <basic-container>
    <div style="width:100%;font-size:60px;font-weight:blod;text-align: center;padding-top:100px;padding-bottom:100px;">
      欢迎光临
    </div>
  </basic-container>

</template>

<script>



export default {
  name: 'DashboardAdmin',
  components: {

  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
