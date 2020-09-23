<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="7">
          <el-form-item :label="'日期'" :label-width="'40px'">
            <el-date-picker
              v-model="value"
              type="daterange"
              align="right"
              style="width: auto"
              class="input-class"
              unlink-panels
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'流程卡号'">
            <el-input v-model="search.cardNo" />
          </el-form-item>
        </el-col> <el-col :span="3">
          <el-form-item :label="'金蝶号'">
            <el-input v-model="search.kingDeeNo" />
          </el-form-item>
        </el-col> <el-col :span="3">
          <el-form-item :label="'产品编码'">
            <el-input v-model="search.productNumber" />
          </el-form-item>
        </el-col> <el-col :span="3">
          <el-form-item :label="'产品名称'">
            <el-input v-model="search.productName" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right" >
          <el-button v-for="(t,i) in btnList" :key="i" v-if="t.color == 'normal'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.name}}</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>

<script>
// ---------------------------
import { mapGetters } from "vuex";
import {getProcessMenuByParent} from "@/api/wy/menu"
export default {
  data() {
    return {
      value: [],
      btnList: [],
      search: {
        cardNo: null,
        kingDeeNo: null,
        productName: null,
        productNumber: null,
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      flag: true,
      plaIdS: null,
      plaArray: [],
    };
  },
  computed: {
    ...mapGetters(["node","clickData","selections"])
  },
  created: function() {
    this.value[0] = this.getDay('', -15).date
    this.value[1] = this.getDay('', 0).date
  },
  mounted() {
    let path = this.$route.meta.id
    getProcessMenuByParent(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate();
    });
  },
  methods: {
    onFun(method){
      this[method]()
    },
    // 查询前后三天日期
    getDay(date, day){
      var today = new Date();
      var targetday_milliseconds=today.getTime() + 1000*60*60*24*day
      today.setTime(targetday_milliseconds) //注意，这行是关键代码
      var tYear = today.getFullYear()
      var tMonth = today.getMonth()
      var tDate = today.getDate()
      var getDay = today.getDay()
      tMonth = this.doHandleMonth(tMonth + 1)
      tDate = this.doHandleMonth(tDate)
      var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
      var week = weeks[getDay]
      return {
        day: tDate,
        week: week,
        date: tYear + "-" + tMonth + "-" + tDate
      }
    },
    doHandleMonth(month) {
      var m = month;
      if(month.toString().length == 1) {
        m = "0" + month;
      }
      return m;
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.value != null && this.value != undefined ? obj.endDate = this.value[1] : null
      this.value != null && this.value != undefined ? obj.startDate = this.value[0] : null
      this.search.cardNo != null && this.search.cardNo != undefined ? obj.cardNo = this.search.cardNo : null
      this.search.kingDeeNo != null && this.search.kingDeeNo != undefined ? obj.kingDeeNo = this.search.kingDeeNo : null
      this.search.productName != null && this.search.productName != undefined ? obj.startDate = this.search.productName : null
      this.search.productNumber != null && this.search.productNumber != undefined ? obj.startDate = this.search.productNumber : null
      return obj
    },
    handleAdd(){
      if (this.selections.length>0) {
          let selections = this.selections
       /* selections.forEach((item, index) =>{
          console.log(item)
        })*/
        this.$emit('showDialog', this.selections)

      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        })
      }
    },
    // 关键字查询
    query(){
      this.$emit('queryBtn', this.qFilter())
    },
    upload() {
      this.value = []
      this.value[0] = this.getDay('', -15).date
      this.value[1] = this.getDay('', 0).date
      this.search.cardNo = null
      this.search.kingDeeNo = null
      this.search.productName = null
      this.search.productNumber = null
      this.$emit('uploadList')
    }
  }
};
</script>

<style>
</style>
