<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :label-width="'120px'" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-table el-table :height="'calc(100vh/1.3)'"  :data="list" border size="mini" :highlight-current-row="true">
            <el-table-column
              v-for="(t,i) in columns"
              :key="i"
              align="center"
              :prop="t.name"
              :label="t.text"
              v-if="t.default!=undefined?t.default:true"
              :width="t.width?t.width:'150px'"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.isSet">
                  <el-input size="mini" v-if="t.name == 'FBatchNO'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input>
                  <el-input-number size="mini" v-if="t.name == 'FPlanQty'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input-number> <el-input-number size="mini" v-if="t.name == 'putNum'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input-number>
                  <div class="block">
                  <el-date-picker
                    v-if="t.name == 'FPlanCommitDate'"
                    v-model="sel[t.name]"
                    type="date"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
                  <div class="block">
                  <el-date-picker
                    v-if="t.name == 'FPlanFinishDate'"
                    v-model="sel[t.name]"
                    type="date"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
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
      <!--  <el-col :span="24">
          <div class="el-table-add-row" style="width: 99.2%;" @click="addMaster()"><span>+ 添加</span></div>
        </el-col>-->
       <!-- <el-col :span="12">
          <el-form-item :label="'销售订单号'">
            <el-input v-model="form.saleOrderNo" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'流程卡号'">
            <el-input v-model="form.processCard" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'工程名称'">
            <el-input v-model="form.projectName" disabled></el-input>
          </el-form-item>
        </el-col>
        &lt;!&ndash;<el-col :span="12">
        <el-form-item :label="'金蝶号'" >
          <el-input v-model="form.kingdeeNo" disabled></el-input>
        </el-form-item>
      </el-col>&ndash;&gt;
        <el-col :span="12">
          <el-form-item :label="'订单量'">
            <el-input v-model="form.orderNum" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'BOM编号'" prop="bomNo">
            <el-input v-model="form.bomNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'生产批次号'" prop="lotNo">
            <el-input v-model="form.lotNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'计划量'" prop="planNum">
            <el-input-number v-model="form.planNum" :max='form.orderNum'></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'本次投放量'" prop="putNum">
            <el-input-number v-model="form.putNum" :max='form.planNum'></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'计划开工日期'" prop="planStartDate">
            <div class="block">
              <el-date-picker
                v-model="form.planStartDate"
                type="date"
                style="width: auto"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'计划交付日期'" prop="planDeliveryDate">
            <div class="block">
              <el-date-picker
                v-model="form.planDeliveryDate"
                type="date"
                style="width: auto"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>-->
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData">保存</el-button>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from "vuex"
  import {addPlanProductTask} from "@/api/process/index"
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
        type: Array,
        default: null
      },
    },
    data() {
      return {
        sel: null, // 选中行
        form: {
          saleOrderNo: null,
          processCard: null,
          projectName: null,
          kingdeeNo: null,
          orderNum: null,
          lotNo: null,
          planStartDate: '',
          planDeliveryDate: '',
          bomNo: null,
          itemId: null,
          planNum: null,
          putNum: null,
          planProductNo: null,
          planProductNum: null,
          residueNum: null,
        },
        columns: [
          { text: "生产计划单号", name: "FICMONo" },
          { text: "销售订单号", name: "FOrderNo" },
          { text: "订单分录号", name: "FEntryID" },
          { text: "流程卡号", name: "FCardNo" },
          { text: "金蝶号", name: "FKDNo" },
          { text: "生产批次号", name: "FBatchNO" },
          { text: "产品编码", name: "" },
          { text: "工程名称", name: "FPrjName" },
          { text: "产品名称", name: "FPrdName" },
          { text: "规格型号", name: "FModel" },
          { text: "BOM编号", name: "FBomNumber" },
          { text: "订单量", name: "FAuxQty" },
          { text: "计划量", name: "FPlanQty" },
          { text: "本次投放量", name: "putNum" },
          { text: "实际生产量", name: "FActQty" },
          { text: "剩余量", name: "FRemainQty" },
          { text: "已投放量", name: "FPutNum" },
          { text: "计划开工日期", name: "FPlanCommitDate" },
          { text: "计划交付日期", name: "FPlanFinishDate" },
        ],
        list: [],
        visible: null,
        rules: {
          lotNo: [
            {required: true, message: '请输入值', trigger: 'blur'},
          ], lotNo: [
            {required: true, message: '请输入值', trigger: 'blur'},
          ], bomNo: [
            {required: true, message: '请输入值', trigger: 'blur'},
          ], planNum: [
            {required: true, message: '请输入值', trigger: 'blur'},
          ], putNum: [
            {required: true, message: '请输入值', trigger: 'blur'},
          ], putNum: [
            {required: true, message: '请输入值', trigger: 'blur'},
          ],
          planStartDate: [
            {required: true, message: '请选择时间', trigger: 'change'}
          ], planDeliveryDate: [
            {required: true, message: '请选择时间', trigger: 'change'}
          ],

        },
      }
    },
    /*created() {
      console.log()
      this.form.planStartDate = this.getDay('', 0).date
      this.form.planDeliveryDate = this.getDay('', 0).date
    },*/
    mounted() {
      if (this.listInfo) {
        console.log(this.listInfo)
       this.list = this.listInfo
       /* listInfo.forEach((item, index) =>{
          let obj = {}
          obj.saleOrderNo = me.listInfo.FOrderNo
          obj.processCard = me.listInfo.FCardNo
          obj.projectName = me.listInfo.FPrjName
          obj.kingdeeNo = me.listInfo.FKDNo
          obj.orderNum = me.listInfo.FAuxQty
          obj.planNum = me.listInfo.FAuxQty
          obj.itemId = me.listInfo.FItemID
          obj.planProductNo = me.listInfo.FICMONo
          obj.planProductNum = me.listInfo.FActQty
          obj.residueNum = me.listInfo.FRemainQty
        })*/
      }
    },
    methods: {
      //修改
      pwdChange(row, index, cg) {
        //点击修改 判断是否已经保存所有操作
        for (let i of this.list) {
          if (i.isSet && (i.FOrderNo != row.FOrderNo || i.RowNumber != row.RowNumber)) {
            this.$message.warning("请先保存当前编辑项");
            return false;
          }
        }
        //是否是取消操作
        if (!cg) {
          if (!this.sel.FOrderNo) this.list.splice(index, 1);
          return row.isSet = !row.isSet;
        }
        //提交数据
        if (row.isSet) {
          //项目是模拟请求操作  自己修改下
          const sel = this.sel
          if((sel.FBatchNO == null || sel.FOrderNo == '') || (sel.FPlanQty == null || sel.FPlanQty == '')|| (sel.putNum == null || sel.putNum == '') || (sel.FPlanCommitDate == null || sel.FPlanCommitDate == '') || (sel.FPlanFinishDate == null || sel.FPlanFinishDate == '')){
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
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      //读取表格数据
      readMasterUser() {
        //根据实际情况，自己改下啊
        this.list.map(i => {
          i.isSet = false; //给后台返回数据添加`isSet`标识
          return i;
        });
      },
      // 查询前后三天日期
      getDay(date, day) {
        var today = new Date();
        var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
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
        if (month.toString().length == 1) {
          m = "0" + month;
        }
        return m;
      },
      saveData() {
        this.$refs["form"].validate((valid) => {
          //判断必填项
          if (valid) {
            const list = this.list
            let array = []
            let result = []
            list.forEach((item, index) =>{
              let obj = {}
              obj.saleOrderNo = item.FOrderNo
              obj.processCard = item.FCardNo
              obj.projectName = item.FPrjName
              obj.kingdeeNo = item.FKDNo
              obj.bomNo = item.FBomNumber
              obj.orderNum = item.FAuxQty
              obj.itemId = item.FItemID
              obj.entryId = item.FEntryID
              obj.planProductNo = item.FICMONo
              obj.planProductNum = item.FActQty

              obj.planNum = item.FAuxQty
              obj.lotNo = item.FBatchNO
              obj.putNum = item.putNum
              obj.planDeliveryDate = item.FPlanFinishDate
              obj.planStartDate = item.FPlanCommitDate
              obj.residueNum = item.FRemainQty
              if((obj.planNum == null || obj.planNum == '') || (obj.lotNo == null || obj.lotNo == '') || (obj.putNum == null || obj.putNum == '') || (obj.planDeliveryDate == null || obj.planDeliveryDate == '') || (obj.planStartDate == null || obj.planStartDate == '')){
                result.push(item.FItemID)
              }
              array.push(obj)
            })
            if(result.length > 0 || array.length <= 0){
              return this.$message({
                type: 'error',
                message: "请输入必填项!"
              });
            }
            addPlanProductTask(array).then(res => {
              this.$emit('uploadList')
              this.$emit('hideDialog')
            });
          } else {
            return false
          }
        })
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
<style lang="scss" scoped>
  .list-main {
    height: calc(100vh/2);
  }
</style>

