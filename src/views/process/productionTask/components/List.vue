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
          { text: "生产计划单号", name: "FICMONo" },
        { text: "销售订单号", name: "FOrderNo" },
        { text: "订单分录号", name: "FEntryID" },
        { text: "流程卡号", name: "FCardNo" },
        { text: "金蝶号", name: "FKDNo" },
        { text: "生产批次号", name: "FBatchNO" },
        { text: "产品编码", name: "FPrdNumber" },
        { text: "工程名称", name: "FPrjName" },
        { text: "产品名称", name: "FPrdName" },
        { text: "规格型号", name: "FModel" },
        { text: "BOM编号", name: "FBomNumber" },
        { text: "订单量", name: "FAuxQty" },
        { text: "计划量", name: "FPlanQty" },
        { text: "本次投放量", name: "FPutNum" },
        { text: "实际生产量", name: "FActQty" },
        { text: "剩余量", name: "FRemainQty" },
        { text: "已投放量", name: "FPutNum" },
        { text: "计划开工日期", name: "FPlanCommitDate" },
        { text: "计划交付日期", name: "FPlanFinishDate" },
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
    dblclick(obj) {
    /*
      this.$emit('showDialog', obj.row)*/
    },
    //监听单击某一行
    rowClick(obj) {
      this.$store.dispatch("list/setClickData", obj.row);
    },
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
