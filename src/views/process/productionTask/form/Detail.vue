<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :label-width="'120px'" :size="'mini'">
      <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'销售订单号'" >
              <el-input v-model="form.saleOrderNo" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'流程卡号'" >
              <el-input v-model="form.processCard" disabled></el-input>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'工程名称'" >
            <el-input v-model="form.projectName" disabled></el-input>
          </el-form-item>
        </el-col>
        <!--<el-col :span="12">
        <el-form-item :label="'金蝶号'" >
          <el-input v-model="form.kingdeeNo" disabled></el-input>
        </el-form-item>
      </el-col>-->
        <el-col :span="12">
          <el-form-item :label="'订单量'" >
            <el-input v-model="form.orderNum" disabled></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'BOM编号'" prop="bomNo">
            <el-input v-model="form.bomNo" ></el-input>
          </el-form-item>
        </el-col>
          <el-col :span="12">
            <el-form-item :label="'生产批次号'" prop="lotNo">
              <el-input v-model="form.lotNo" ></el-input>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="'计划量'" prop="planNum">
                <el-input-number v-model="form.planNum" ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'本次投放量'" prop="putNum">
                <el-input-number v-model="form.putNum" ></el-input-number>
              </el-form-item>
            </el-col>
      </el-row><el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="'计划开工日期'" prop="planStartDate">
                <div class="block" >
                  <el-date-picker
                    v-model="form.planStartDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'计划交付日期'" prop="planDeliveryDate">
                <div class="block" >
                  <el-date-picker
                    v-model="form.planDeliveryDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
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
  import { addPlanProductTask } from "@/api/process/index";
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
            { required: true, message: '请选择时间', trigger: 'change'}
          ], planDeliveryDate: [
            { required: true, message: '请选择时间', trigger: 'change'}
          ],

        },
      }
    },
    created() {
      console.log()
      this.form.planStartDate = this.getDay('', 0).date
      this.form.planDeliveryDate = this.getDay('', 0).date

    },
    mounted() {
      if(this.listInfo) {
        this.form.saleOrderNo = this.listInfo.FOrderNo
        this.form.processCard = this.listInfo.FCardNo
        this.form.projectName = this.listInfo.FPrjName
        this.form.kingdeeNo = this.listInfo.FKDNo
        this.form.orderNum = this.listInfo.FAuxQty

        this.form.itemId = this.listInfo.FItemID
        this.form.planProductNo = this.listInfo.FICMONo
        this.form.planProductNum = this.listInfo.FActQty
        this.form.residueNum = this.listInfo.FRemainQty
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
      saveData() {
        this.$refs["form"].validate((valid) => {
          //判断必填项
          if (valid) {
            console.log(this.form)
            addPlanProductTask([this.form]).then(res => {
              this.$emit('uploadList')
              this.$emit('hideDialog')
            });
          }else {
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
