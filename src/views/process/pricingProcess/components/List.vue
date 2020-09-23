<template>
  <div>
    <list
       class="list-main"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
       @row-click="rowClick"
       @dblclick="dblclick"
      @handle-size="handleSize"
      @handle-current="handleCurrent"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAdjustList } from "@/api/process/index";
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
        { text: "日期", name: "createTime" },
        { text: "单据号", name: "adjustNo" },
        { text: "工艺路线", name: "" },
        { text: "工艺路线单据号", name: "routeNo" },
        { text: "物料代码", name: "number" },
        { text: "物料名称", name: "name" },
        { text: "物料规格", name: "model" },
        { text: "单位", name: "unitName" },
        { text: "工序代码", name: "processNumber" },
        { text: "工序名称", name: "processName" },
        { text: "作业说明", name: "description" },
        { text: "工序控制码", name: "controlCodeName" },
        { text: "工序倍数", name: "diploid" },
        { text: "工序原单价", name: "pastPrice" },
        { text: "工序变更后单价", name: "adjPrice" },
        { text: "生效日期", name: "effectiveDate" },
        { text: "失效日期", name: "expiryDate" },
        { text: "状态", name: "status" },
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
      getAdjustList(data, val).then(res => {
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
