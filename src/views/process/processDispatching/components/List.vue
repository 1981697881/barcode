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
       @dblclick="dblclick"
      @handle-size="handleSize"
      @handle-current="handleCurrent"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getProductWorkDispatchList, delProductWorkDispatch } from "@/api/process/index";
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
        { text: "任务单号", name: "workNo" },
        { text: "生产班组", name: "processTeamName" },
        { text: "开工日期", name: "workDate" },
        { text: "生产者", name: "dispatchName" },
        { text: "卡号", name: "processCard" },
        { text: "金蝶号", name: "kingDeeNo" },
        { text: "生产批次号", name: "lotNo" },
        { text: "产品编码", name: "productNumber" },
        { text: "工程名称", name: "projectName" },
        { text: "产品名称", name: "productName" },
        { text: "规格型号", name: "model" },
        { text: "工序名称", name: "processName" },
        { text: "订单量", name: "orderNum" },
        { text: "剩余量", name: "residueNum" },
        { text: "计划量", name: "planNum" },
        { text: "工序计划量", name: "processPlanNum" },
        { text: "派工量", name: "dispatchNum" },
        { text: "实际生产量", name: "actualProductNum" },
        { text: "合格数", name: "qualifiedNum" },
        { text: "汇报单号", name: "reportNo" },
        { text: "汇报日期", name: "reportDate" },
        { text: "员工签名", name: "reportName" },
        { text: "审核人", name: "auditName" },
        { text: "审核时间", name: "auditTime" },
        { text: "状态", name: "status" },
      ]
    };
  },
  created() {

  },
  methods: {
    Delivery(val) {
      delProductWorkDispatch(val).then(res => {
        if(res.success){
          this.$store.dispatch("list/setClickData", '');
          this.$emit('uploadList')
        }
      });
    },
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
      getProductWorkDispatchList(data, val).then(res => {
        this.loading = false;
        this.list = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 350px);
}
</style>
