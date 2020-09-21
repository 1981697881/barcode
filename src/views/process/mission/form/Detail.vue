<template>
  <div>
    <el-form :model="form1" :rules="rules" ref="form1" :label-width="'90px'" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item :label="'任务单号'" >
              <el-input v-model="form1.workNo" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'卡号'" >
              <el-input v-model="form1.processCard" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item :label="'金蝶号'" >
              <el-input v-model="form1.kingDeeNo" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'生产批次号'" >
              <el-input v-model="form1.lotNo" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item :label="'产品编码'" >
              <el-input v-model="form1.productNumber" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'产品名称'" >
              <el-input v-model="form1.productName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item :label="'工程名称'" >
              <el-input v-model="form1.projectName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'规格型号'" >
              <el-input v-model="form1.model" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-table el-table :height="'calc(100vh/2)'" :data="list" border size="mini" :highlight-current-row="true">
            <el-table-column
              v-for="(t,i) in columns"
              :key="i"
              align="center"
              :prop="t.name"
              :label="t.text"
              v-if="t.default!=undefined?t.default:true"
              :width="t.width?t.width:''"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.isSet">
                  <el-input-number size="mini" v-if="t.name == 'planNum'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input-number>
                 <!-- <el-input-number size="mini" v-if="t.name == 'residueNum'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input-number>-->
                  <el-input size="mini" v-if="t.name == 'orderNo'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input>
                  <el-select size="mini" v-if="t.name == 'processName'" v-model="sel[t.name]" placeholder="请选择" @change="changeProcessId($event, sel)">
                    <el-option
                      v-for="(t,i) in plArray"
                      :key="i"
                      :label="t.FName"
                      :value="t.FName">
                    </el-option>
                  </el-select>
                </span>
                <span v-else>{{scope.row[t.name]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                  <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,true)">
                    {{scope.row.isSet?'确定':"修改"}}
                  </span>
                <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" @click="deleteRow(scope.row,scope.$index,list)" style="cursor: pointer;">
                    删除
                  </span>
                <span v-else class="el-tag  el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,false)">
                    取消
                  </span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24">
          <div class="el-table-add-row" style="width: 99.2%;" @click="addMaster()"><span>+ 添加</span></div>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData">保存</el-button>
    </div>
  </div>
</template>

<script>

  import { mapGetters } from "vuex";
  import { processList } from "@/api/basic/index";
  import { updateProductWork, getListByProductWorkId } from "@/api/process/index";
  import List from "@/components/List"
  export default {
    components: {
      List
    },
    computed: {
      ...mapGetters(["selections"])
    },
    props: {
      listInfo: {
        type: Object,
        default: null
      },
    },
    data() {
      return {
        loading: false,
        sel: null, // 选中行
        form1: {
          processPlanNum: null,
          processName: null,
          kingDeeNo: null,
          productName: null,
          productNumber: null,
          processTeamName: null,
          residueNum: null,
          workDate: null,
          processTeamId: null,
          model: null,
          lotNo: null,
          projectName: null,
          workNo: null,
        },
        visible: null,
        list: [],
        columns: [
          { text: "工序顺序号", name: "orderNo" },
          { text: "工序名称", name: "processName" },
          { text: "计划量", name: "planNum" },
          { text: "剩余量", name: "residueNum" },
          { text: "工序id", name: "processId", default: false },
        ],
        checkObj: {},
        plArray: [],
        psArray: [],
        result: [],
        rules: {
          workDate: [
            {required: true, message: '请选择时间', trigger: 'change'}
          ],
        },
      }
    },
    created() {

    },
    mounted() {
      console.log(this.listInfo)
      this.fetchFormat()
      if(this.listInfo) {
        this.fetchData(this.listInfo.productWorkId)
      }
    },
    methods: {
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
      //读取表格数据
      readMasterUser() {
        //根据实际情况，自己改下啊
        this.list.map(i => {
          i.isSet = false; //给后台返回数据添加`isSet`标识
          return i;
        });
      },
      //添加
      addMaster() {
        for (let i of this.list) {
          if (i.isSet) return this.$message.warning("请先保存当前编辑项");
        }
        this.cIndex += 10
        let j = {isSet: true, orderNo: this.cIndex, orderNo: '', planNum: ''};
        this.list.push(j);
        this.sel = JSON.parse(JSON.stringify(j));
      },
      //修改
      pwdChange(row, index, cg) {
        //点击修改 判断是否已经保存所有操作
        for (let i of this.list) {
          if (i.isSet && i.userId != row.userId) {
            this.$message.warning("请先保存当前编辑项");
            return false;
          }
        }
        //是否是取消操作
        if (!cg) {
          if (!this.sel.processId) this.list.splice(index, 1);
          return row.isSet = !row.isSet;
        }
        console.log(row.isSet)
        //提交数据
        if (row.isSet) {
          const sel = this.sel
          if((sel.processId == null || sel.processId === '') || (sel.orderNo == null || sel.orderNo === '') || (sel.planNum == null || sel.planNum === '')){
            return this.$message({
              type: 'error',
              message: "请输入必填项!"
            });
          }else {
            let data = JSON.parse(JSON.stringify(this.sel));
            for (let k in data) row[k] = data[k]
            this.$message({
              type: 'success',
              message: "添加成功!"
            });
            //然后这边重新读取表格数据
            this.readMasterUser();
            row.isSet = false;
          }
        } else {
          this.sel = JSON.parse(JSON.stringify(row));
          row.isSet = true;
        }
      },
      //删除带确认区 单行删除
      deleteRow(row, index, rows) {
        this.result.forEach((item, index2) =>{
          if(row.processRouteDetailId == item){
            this.result.splice(index2,1);
          }
        })
        console.log(this.result)
        console.log(row)
        rows.splice(index, 1);
      },

      fetchFormat() {
        processList().then(res => {
          this.plArray = res.data;
        });
      },
      changeProcessId(val, row) {
        const me = this
        this.plArray.forEach((item, index) => {
          if(item.FName == val) {
            me.$set(row,'processId', item.FItemID);
          }
        })
      },
      setRow() {
        for (let i of this.list) {
          if (i.isSet) return this.$message.warning("请先保存当前编辑项");
        }
        this.visible = true
      },
      saveData() {
        this.$refs["form1"].validate((valid) => {
          //判断必填项
          if (valid) {
            let arrrar = []
            let result = []
            this.list.forEach((item, index) => {
              let obj = {}
              obj.orderNo = item.orderNo
              obj.processId = item.processId
              obj.processName = item.processName
              obj.productWorkId = item.productWorkId
              obj.processTeamId = item.processTeamId
              obj.processTeamName = item.processTeamName
              obj.productWorkDetailId = item.productWorkDetailId
              obj.workNo = item.workNo
              obj.processPlanNum = item.planNum
              if((obj.processId == null || obj.processId === '') || (obj.orderNo == null || obj.orderNo === '') || (obj.planNum == null || obj.planNum === '')){
                result.push(item.productWorkDetailId)
              }
              arrrar.push(obj)
            })
            if(result.length > 0 || arrrar.length <= 0){
              return this.$message({
                type: 'error',
                message: "请输入必填项!"
              });
            }
            //修改
            updateProductWork(arrrar).then(res => {
              this.$emit('hideDialog')
              this.$emit('uploadList')
            });
          }else {
            return false
          }
        })
      },
      fetchData(val) {
        const me = this
        me.loading = true
        getListByProductWorkId(val).then(res => {
          if(res.success) {
            this.loading = false
            let data = res.data
            this.form1.workNo = data[0].workNo
            this.form1.kingDeeNo = data[0].kingDeeNo
            this.form1.processCard = data[0].processCard
            this.form1.lotNo = data[0].lotNo
            this.form1.productName = data[0].productName
            this.form1.productNumber = data[0].productNumber
            this.form1.model = data[0].model
            this.form1.projectName = data[0].projectName
            this.list = data
          }
        });
      },
    }
  };
</script>
<style>
  .el-table-add-row {
    margin-top: 10px;
    width: 100%;
    height: 34px;
    border: 1px dashed #c1c1cd;
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    display: flex;
    line-height: 34px;
  }
</style>
