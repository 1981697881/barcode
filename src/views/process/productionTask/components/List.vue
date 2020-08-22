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
    />

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { planProductTask } from "@/api/process/index";
import List from "@/components/List";
import {
  getPer
} from '@/utils/auth'
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
      prId: null,
      q: null,
      type: null,
      columns: [
          { text: "客户名称", name: "account" },
        { text: "商品名称", name: "goodName" },
        { text: "商品编号", name: "goodCode" },
        { text: "规格", name: "standard" },
        { text: "单位", name: "unitOfMea" },
      ]
    };
  },
  created() {

  },
  methods: {
      //监听每页显示几条
      handleSize(val) {
          this.list.size = val
          this.$emit('uploadList')
      },
      //监听当前页
      handleCurrent(val) {
          this.list.current = val;
          this.$emit('uploadList')
      },
   /* dblclick(obj) {
      const data = {
        fid : obj.row.fid,
        type : obj.row.type
      }
      this.$emit('showDialog',data)
    },*/
    uploadPr(val, data = {
      pageNum: 1,
      pageSize: this.list.size || 50
    }) {
      let obj = Object.assign(val, data)
      this.fetchData(obj);
    },
    fetchData(val, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true;
      let obj = Object.assign(val, data)
      planProductTask(obj).then(res => {
        this.loading = false;
        this.list = res.data;
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
