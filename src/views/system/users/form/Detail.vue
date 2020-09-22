<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'userId'" style="display: none">
            <el-input v-model="form.userId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item :label="'用户账号'" prop="account">
            <el-input v-model="form.account" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label-width="'0px'" >
            <el-button @click="setRow">选择</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'类型'" prop="type">
            <el-select v-model="form.type" class="width-full" placeholder="请选择类型">
              <el-option :label="t.label" :value="t.value" v-for="(t,i) in options" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'用户名称'" prop="username">
            <el-input v-model="form.username" :readonly="read"></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'密码'" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
        </el-col>
      <el-col :span="12">
        <el-form-item :label="'是否启用'">
          <el-switch v-model="form.status" active-value='1' inactive-value='0'></el-switch>
        </el-form-item>
      </el-col>
      </el-row>
      <el-row  style="height: 250px;overflow: auto;border: 1px solid #EBEEF5;">
          <el-tree
            ref="tree1"
            :props="defaultProps"
            :default-expand-all="false"
            :data="data"
            show-checkbox
            :default-checked-keys="Checkeds"
            node-key="processMenuId"
            highlight-current
            :expand-on-click-node="false"
          />
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="用户信息"
      v-if="visible"
      :width="'60%'"
      destroy-on-close
      append-to-body
    >
      <el-form :model="form2" ref="form2" label-width="80px" :size="'mini'">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item :label="'账号'">
              <el-input v-model="form2.account" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="'职员'">
              <el-input v-model="form2.empName" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button  :size="'mini'" type="success" @click="query" icon="el-icon-search">查询</el-button>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" style="text-align:center;">
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import List from "@/components/List"
    import { getProcessMenuByUserId, sysUserUpdate, sysUserSave, getK3User, processMenuAdd} from "@/api/system/index";
    export default {
      components: {
        List
      },
        props: {
          listInfo: {
            type: Object,
            default: null
          },
        },
        data() {
            return {
              data: [,
          ],
              defaultProps: {
                children: "menuList",
                label: "name",
                isLeaf: "leaf",
                id: "processMenuId"
              },
              Checkeds: [],
              loading: false,
              visible: null,
              form2: {
                account: null,
                empName: null
              },
              list: {},
              columns: [
                { text: "登录账号", name: "FAccount" },
                { text: "职员编码", name: "FEmpNumber" },
                { text: "职员名称", name: "FEmpName" },
              ],
              options: [{
                value: 1,
                label: '后台管理员'
              }, {
                value: 2,
                label: 'PDA操作员'
              }, {
                value: 3,
                label: '后台操作员'
              }],
                form: {
                    userId: null,
                    account: null, // 账号
                    username: null,// 名称
                    status: '1',
                    password: null,
                    type: null,
                },
              read: null,
              checkObj: {},
                rules: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    username: [
                        {required: true, message: '请输入名稱', trigger: 'blur'},
                    ], password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],type: [
                        {required: true, message: '请选择类型', trigger: 'change'},
                    ],
                },
            };
        },
        created() {

        },
        mounted() {
          if(this.listInfo) {
            this.form = this.listInfo
            this.form.status = this.listInfo.status + ''
            this.fetchMenu(this.listInfo.id)
          }
        },
        methods: {
          setName(datas){ //遍历树  获取id数组
            for(var i in datas){
              if(datas[i].checked){
                this.Checkeds.push(datas[i].processMenuId)
              }
              if(datas[i].menuList){
                this.setName(datas[i].menuList);
              }
            }
          },
          fetchMenu(val) {
            getProcessMenuByUserId(val).then(res => {
              this.data = res.data
              this.setName(res.data)
            });
          },
          confirm() {
            if (this.checkObj.FUserID) {
              this.form.account = obj.row.FAccount
              this.form.userId = obj.row.FUserID
              this.visible = false
            } else {
              this.$message({
                message: "无选中数据",
                type: "warning"
              })
            }
          },
          fetchList(val, data = {
            pageNum: this.list.pageNum || 1,
            pageSize: this.list.pageSize || 50
          }) {
            let obj = Object.assign(data,val)
            this.loading = true;
            getK3User(obj).then(res => {
              this.loading = false;
              this.list = {list: res.data};
            });
          },
          getChecked() {
            let array = this.$refs.tree1.getCheckedKeys();
            return  array
          },
          dblclick(obj, index) {
            if (obj.row.FUserID) {
              this.form.account = obj.row.FAccount
              this.form.userId = obj.row.FUserID
              this.visible = false
            } else {
              this.$message({
                message: "无选中数据",
                type: "warning"
              })
            }
            //this.pwdChange(scope.row,scope.$index,true)
          },
          //监听单击某一行
          rowClick(obj) {
            this.checkObj = obj.row
          },
          // 查询条件过滤
          qFilter() {
            let obj = {}
            this.form2.account != null && this.form2.account != '' ? obj.account = this.form2.account : null
            this.form2.empName != null && this.form2.empName != '' ? obj.empName = this.form2.empName : null
            return obj
          },
          setRow() {
            this.visible = true
          },
          query() {
            this.list.current = 1;
            this.fetchList(this.qFilter());
          },
          //监听每页显示几条
          handleSize(val) {
            this.list.pageSize = val
            this.fetchList({});
          },
          //监听当前页
          handleCurrent(val) {
            this.list.pageNum = val;
            this.fetchList({});
          },
            saveData(form) {
                this.$refs[form].validate((valid) => {
                    //判断必填项
                    if (valid) {
                      console.log(this.getChecked())
                        if (typeof (this.form.id) != undefined && this.form.id != null) {
                          sysUserUpdate(this.form).then(res => {
                                if(res.success){
                                  processMenuAdd({menuList: this.getChecked(),uid: res.data.id}).then(reso => {
                                    if(reso.success){
                                      this.$emit('hideDialog', false)
                                      this.$emit('uploadList')
                                    }
                                  });
                                }
                            });
                        } else {
                          sysUserSave(this.form).then(res => {
                                if(res.success){
                                  processMenuAdd({menuList: this.getChecked(),uid: res.data.id}).then(reso => {
                                    if(reso.success){
                                      this.$emit('hideDialog', false)
                                      this.$emit('uploadList')
                                    }
                                  });
                                }
                            });
                        }
                    } else {
                        return false;
                    }
                })

            },
        }
    };
</script>

<style>
</style>
