<template>
  <div>
    <list
      class="list-main"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
      @row-click="rowClick"
    />
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {getSysUserAll} from "@/api/system/index";
  import List from "@/components/List";
  export default {
    components: {
      List
    },
    computed: {
      ...mapGetters(["node"])
    },
    data() {
      return {
        loading: false,
        list: {},
        type: null,
        columns: [
          {text: "userId", name: "userId", default: false},
          {text: "用户名称", name: "account"},
          {text: "登录账号", name: "username"},
          {text: "状态", name: "status", formatter: 'formatStatus'},
        ]
      };
    },
    methods: {
      //监听每页显示几条
      handleSize(val) {
        this.list.size = val
        this.fetchData()
      },
      //监听当前页
      handleCurrent(val) {
        this.list.current = val;
        this.fetchData()
      },
      dblclick(obj) {
        this.$emit('showDialog', obj.row)
      },
      //监听单击某一行
      rowClick(obj) {
        this.$store.dispatch("list/setClickData", obj.row);
      },
      uploadPr(val) {
        this.fetchData({
          pageNum: 1,
          pageSize: this.list.size || 50
        }, val)
      },
      fetchData(data = {
        pageNum: this.list.current || 1,
        pageSize: this.list.size || 50
      },val) {
          getSysUserAll(val).then(res => {
          this.loading = false;
          this.list = {list: res.data};
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .list-main {
    height: calc(100vh - 300px);
  }
</style>
