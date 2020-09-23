<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'70px'">
      <el-row :gutter="12">
        <el-col :span="7">
          <el-form-item :label="'派工日期'">
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
        <el-col :span="7">
          <el-form-item :label="'汇报日期'">
            <el-date-picker
              v-model="valueT"
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
        <el-col :span="4">
          <el-form-item :label="'生产任务单号'" :label-width="'110px'">
            <el-input v-model="search.workNo" />
          </el-form-item>
        </el-col><el-col :span="4">
          <el-form-item :label="'产品编码'">
            <el-input v-model="search.productNumber" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'产品名称'">
            <el-input v-model="search.productName" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'工序'">
            <el-select v-model="search.processId" filterable class="width-full" placeholder="请选择工序" @change="changeCheck1">
              <el-option :label="t.FName" :value="t.FNumber" v-for="(t,i) in plArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'班组'">
            <el-select v-model="search.processTeamName" filterable class="width-full" placeholder="请选择班组" @change="changeCheck2">
              <el-option :label="t.FName" :value="t.FName" v-for="(t,i) in psArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'生产者'">
            <el-input v-model="search.dispatchName" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'卡号/金蝶号'" :label-width="'110px'">
            <el-input v-model="search.kingDeeNo" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'汇报员工'">
            <el-input v-model="search.routeNo" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" @click="query" icon="el-icon-search">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
            <el-button v-for="(t,i) in btnList" :key="i" v-if="t.color == 'normal'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.name}}</el-button>
          <!-- <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="alter">汇报</el-button>
         <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="Delivery">删除</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>-->
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
  import {getToken} from '@/utils/auth'
  import {processList, teamList} from "@/api/basic/index";
  import {getProcessMenuByParent} from "@/api/wy/menu"
  import {productWorkDispatchAgainstAudit,productWorkDispatchAudit} from "@/api/process/index"
  export default {
    components: {},
    computed: {
      ...mapGetters(["node","clickData","selections"])
    },
    data() {
      return {
        headers: {
          'authorization': getToken('apsrx'),
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
        value: [],
        btnList: [],
        valueT: [],
        plArray: [],
        psArray: [],
        isUpload: null,
        search: {
          workNo: null,
          routeNo: null,
          productName: null,
          productNumber: null,
          dispatchName: null,
          processTeamName: null,
          processId: null
        }
      };
    },
    created: function() {
      this.value[0] = this.getDay('', -15).date
      this.value[1] = this.getDay('', 0).date
      this.valueT[0] = this.getDay('', -15).date
      this.valueT[1] = this.getDay('', 0).date
    },
    mounted() {
      let path = this.$route.meta.id
      getProcessMenuByParent(path).then(res => {
        this.btnList = res.data
        this.$forceUpdate();
      });
      this.fetchFormat()
    },
    methods: {
      onFun(method){
        this[method]()
      },
      changeCheck1(val) {
        this.$emit('queryBtn', this.qFilter())
      },
      changeCheck2(val) {
        this.$emit('queryBtn', this.qFilter())
      },
      fetchFormat() {
        processList().then(res => {
          this.plArray = res.data;
        });
        teamList().then(res => {
          this.psArray = res.data;
        });
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
      audit() {
        if (this.clickData.dispatchId) {
          productWorkDispatchAudit(this.clickData.dispatchId).then(res => {
            this.$emit('uploadList')
          });
        } else {
          this.$message({
            message: "无选中行",
            type: "warning"
          })
        }
      },
      unAudit() {
        if (this.clickData.dispatchId) {
          productWorkDispatchAgainstAudit(this.clickData.dispatchId).then(res => {
            this.$emit('uploadList')
          });
        } else {
          this.$message({
            message: "无选中行",
            type: "warning"
          })
        }
      },
      Delivery() {
        if (this.clickData.routeAdjustId) {
          this.$confirm('是否删除（' + this.clickData.name + '），删除后将无法恢复?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$emit('delList', {
              routeAdjustId: this.clickData.routeAdjustId
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else {
          this.$message({
            message: "无选中行",
            type: "warning"
          })
        }
      },
      alter() {
        if (this.selections.length > 0) {
          this.$emit('showDialog', this.selections)
        } else {
          this.$message({
            message: "无选中行",
            type: "warning"
          })
        }
      },
      query() {
        console.log(this.qFilter())
        this.$emit('queryBtn', this.qFilter())
      },
      upload() {
        this.search.workNo = ''
        this.search.routeNo = ''
        this.search.productName = ''
        this.search.productNumber = ''
        this.search.processId = ''
        this.search.processTeamName = ''
        this.search.dispatchName = ''
        this.value = []
        this.valueT = []
        this.value[0] = this.getDay('', -15).date
        this.value[1] = this.getDay('', 0).date
        this.valueT[0] = this.getDay('', -15).date
        this.valueT[1] = this.getDay('', 0).date
        this.$emit('uploadList')
      },
      // 查询条件过滤
      qFilter() {
        let obj = {}
        this.value != null && this.value != undefined ? obj.dispatchEndDate = this.value[1] : null
        this.value != null && this.value != undefined ? obj.dispatchStartDate = this.value[0] : null
        this.valueT != null && this.valueT != undefined ? obj.reportEndDate = this.valueT[1] : null
        this.valueT != null && this.valueT != undefined ? obj.reportStartDate = this.valueT[0] : null
        this.search.adjustNo != null && this.search.adjustNo != '' ? obj.adjustNo = this.search.adjustNo : null
        this.search.routeNo != null && this.search.routeNo != '' ? obj.routeNo = this.search.routeNo : null
        this.search.productName != null && this.search.productName != '' ? obj.productName = this.search.productName : null
        this.search.productNumber != null && this.search.productNumber != '' ? obj.productNumber = this.search.productNumber : null
        this.search.processNumber != null && this.search.processNumber != '' ? obj.processNumber = this.search.processNumber : null
        this.search.processTeamName != null && this.search.processTeamName != '' ? obj.processTeamName = this.search.processTeamName : null
        this.search.dispatchName != null && this.search.dispatchName != '' ? obj.dispatchName = this.search.dispatchName : null
        return obj
      },
      handleAdd(){
        this.$emit('showDialog')
      }
    }
  };
</script>

<style>
  .upload-demo{
    float: right;
  }
</style>
