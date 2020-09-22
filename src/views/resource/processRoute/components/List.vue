<template>
  <div>
    <list
       class="list-main"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
       type
       @row-click="rowClick"

      @handle-size="handleSize"
      @handle-current="handleCurrent"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getRouteList } from "@/api/basic/index";
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
      goodName: null,
      prId: null,
      columns: [
        { text: "processRouteId", name: "processRouteId",default:false },
        { text: "物料代码", name: "number" },
        { text: "物料名称", name: "name" },
        { text: "规格型号", name: "model" },
        { text: "图号", name: "chartNumber" },
        { text: "工序顺序号", name: "orderNo" },
        { text: "工序代码", name: "processNumber" },
        { text: "工序名称", name: "processName" },
        { text: "作业说明", name: "description" },
        { text: "工序控制码", name: "controlCodeName" },
        { text: "工序倍数", name: "diploid" },
        { text: "工序单价", name: "price" },
        { text: "班组代码", name: "processTeamNumber" },
        { text: "班组", name: "processTeamName" },
        { text: "创建日期", name: "createTime" },
        { text: "创建人", name: "username" },
        { text: "状态", name: "status" },
        // { text: "审核日期", name: "" },
        // { text: "审核人", name: "" },
      ]
    };
  },
  created() {

  },
  methods: {
    //监听每页显示几条
    handleSize(val) {
      this.list.pageSize = val
      this.$emit('uploadList')
    },
    //监听当前页
    handleCurrent(val) {
      this.list.pageNum = val;
      this.$emit('uploadList')
    },
    dblclick(obj) {
      console.log(obj)
      this.$emit('showDialog', obj.row)
    },
    //监听单击某一行
    rowClick(obj) {
      this.$store.dispatch("list/setClickData", obj.row);
    },
    uploadPr(val) {
      this.fetchData(val,{
        pageNum: 1,
        pageSize: this.list.pageSize || 50
      })
    },
    fetchData(val, data = {
      pageNum: this.list.pageNum || 1,
      pageSize: this.list.pageSize || 50
    }) {
      this.loading = true;
      getRouteList(data, val).then(res => {
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
