var QQV = (rule, value, callback) => {
  debugger
  if (value === '') {
    callback(new Error('填写QQ号'))
  } else if (/^[1-9][0-9]{4,10}$/.test(value)) {
    callback()
  } else {
    callback(new Error('填写正确的QQ号'))
  }
}

// 类似金钱,首位不为0,最多2位小数
export function checkNumPot2(rule, value, callback) {
  const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  if (!value) {
    return callback(new Error('请填写数字'))
  } else if (!reg.test(value)) {
    return callback(new Error('请填写数字,最多2位小数'))
  } else {
    callback()
  }
}

// 身份证
export function checkIdNum(rule, value, callback) {
  const reg1 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/;
  const reg2 = /^[1-9]\d{5}(18|19|(2\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  //const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!value) {
    return callback(new Error('请填写身份证号'))
  } else if (value.length != 15 && value.length != 18) {
    return callback(new Error('证件号码不正确'))
  } else if (value.length == 15 && !reg1.test(value)) {
    return callback(new Error('证件号码不正确'))
  } else if (value.length == 18 && !reg2.test(value)) {
    return callback(new Error('证件号码不正确'))
  } else {
    callback()
  }
}

// 整数
export function checkInterNum(rule, value, callback) {
  const reg = /^[1-9][0-9]*$/
  if (!value) {
    return callback(new Error('请填写整数'))
  } else if (!reg.test(value)) {
    return callback(new Error('请填写整数'))
  } else {
    callback()
  }
}
// 不必填，填必验
export function checkName(rule, value, callback) {
  const reg = /^[a-zA-Z\u4e00-\u9fa5]{2,4}$/;
  if (!value) {
    callback()
  } else if (!reg.test(value)) {
    return callback(new Error('请正确填写配偶姓名'))
  } else {
    callback()
  }
}
// 不必填，填必验
export function checkID(rule, value, callback) {
  const reg1 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/;
  const reg2 = /^[1-9]\d{5}(18|19|(2\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  //const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!value) {
    callback()
  } else if (value.length != 15 && value.length != 18) {
    return callback(new Error('证件号码不正确'))
  } else if (value.length == 15 && !reg1.test(value)) {
    return callback(new Error('证件号码不正确'))
  } else if (value.length == 18 && !reg2.test(value)) {
    return callback(new Error('证件号码不正确'))
  } else {
    callback()
  }
}

export default {
  QQ: [{ required: true, validator: QQV, trigger: 'blur' }],
  phone: [{ required: true, pattern: /^1[345789]\d{9}$/, message: '请正确填写手机号码', trigger: 'blur' }],
  numPot2: [{ required: true, validator: checkNumPot2, trigger: 'blur' }],
  InterNum: [{ required: true, validator: checkInterNum, trigger: 'blur' }],

  name: [{ required: true, message: '请填写企业名称', trigger: 'blur' },
  { pattern: /^[\u4e00-\u9fa5][a-zA-Z\u4e00-\u9fa5]{1,3}$/, message: '请正确填写企业名称', trigger: 'blur' }
  ],
  year: [
    { required: true, message: '请填写年限', trigger: 'blur' },
    { pattern: /^[1-9][0-9]*$/, message: '请正确填写年限', trigger: 'blur' }
  ],
  inmoney: [
    { required: true, message: '请填写年收入', trigger: 'blur' },
    { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请正确填写年收入', trigger: 'blur' }
  ],
  hy: [{ required: true, message: '请选择行业', trigger: 'blur' }],
  //
  code: [{ required: true, message: '请填写信用代码', trigger: 'blur' },
  { pattern: /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/, message: '请正确填写信用代码', trigger: 'blur' }
  ],
  person: [{ required: true, message: '请填写联系人', trigger: 'blur' },
  { pattern: /^[a-zA-Z\u4e00-\u9fa5]{2,4}$/, message: '请正确填写联系人', trigger: 'blur' }
  ],
  tel: [{ required: true, message: '请填写联系人手机号', trigger: 'blur' },
  { pattern: /^1[345789]\d{9}$/, message: '请正确填写手机号码', trigger: 'blur' }
  ],
  legal: [{ required: true, message: '请填写法定代表人', trigger: 'blur' },
  { pattern: /^[a-zA-Z\u4e00-\u9fa5]{2,4}$/, message: '请正确填写法人', trigger: 'blur' }
  ],
  legaltel: [{ required: true, message: '请填写法人手机号', trigger: 'blur' },
  { pattern: /^1[345789]\d{9}$/, message: '请正确填写手机号码', trigger: 'blur' }
  ],
  legalID: [{ validator: checkIdNum, trigger: 'blur' }],
  money: [{ required: true, message: '请填写注册资金', trigger: 'blur' },
  { pattern: /^[1-9][0-9]*$/, message: '请正确填写注册资金', trigger: 'blur' }
  ],
  cldate: [{ required: true, message: '请选择成立日期', trigger: 'blur' },
  { pattern: /^\d{4}-(((0[1-9])|(1[0-2])))(-((0[1-9])|([1-2][0-9])|(3[0-1])))$/, message: '请选择成立日期', trigger: 'blur' }
  ],
  gm: [{ required: true, message: '请选择规模', trigger: 'blur' }],
  yyzzname: [{ required: true, message: '请上传营业执照', trigger: 'change' }],
  //
  skname: [{ required: true, message: '请填写姓名', trigger: 'blur' },
  { pattern: /^[a-zA-Z\u4e00-\u9fa5]{2,4}$/, message: '请正确填写姓名', trigger: 'blur' }
  ],
  ID: [{ validator: checkIdNum, trigger: 'blur' }],
  poname:[{ validator: checkName, trigger: 'blur' }],
  poID: [{ validator: checkID, trigger: 'blur' }],
  stp: [{ required: true, message: '请选择类型', trigger: 'blur' }],
  syear: [{ required: true, message: '请选择年限', trigger: 'blur' }],
  shj: [{ required: true, message: '请选择户籍', trigger: 'blur' }],
  sfc: [{ required: true, message: '请选择房产', trigger: 'blur' }],
  gptp: [{ required: true, message: '请选择挂牌类型', trigger: 'blur' }],
  gpdate: [{ required: true, message: '请选择挂牌日期', trigger: 'blur' },
  { pattern: /\d{4}-(((0[1-9])|(1[0-2])))(-((0[1-9])|([1-2][0-9])|(3[0-1])))/, message: '请选择成立日期', trigger: 'blur' }
  ],
  zgs: [{ required: true, message: '请填写总股数', trigger: 'blur' },
    { pattern: /^[1-9][0-9]*$/, message: '请正确填写总股数', trigger: 'blur' }
  ],
  jgqzyjl: [{ required: true, message: '请选择质押记录', trigger: 'blur' }],
  zydx: [{ required: true, message: '请选择融资对象', trigger: 'blur' }],
  gpcj: [{ required: true, message: '请填写价格', trigger: 'blur' },
  { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请正确填写价格', trigger: 'blur' }
  ],
  zgz: [{ required: true, message: '请填写总估值', trigger: 'blur' },
  { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请正确填写总估值', trigger: 'blur' }
  ],
  zyje: [{ required: true, message: '请填写金额', trigger: 'blur' },
  { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请正确填写金额', trigger: 'blur' }
  ],
  lrsx: [{ required: true, message: '请选择失信人', trigger: 'blur' }],
  lrlh: [{ required: true, message: '请选择惩戒名单', trigger: 'blur' }],
  lrgs: [{ required: true, message: '请选择工商黑名单', trigger: 'blur' }],
  dqss: [{ required: true, message: '请选择当前涉诉', trigger: 'blur' }],
  jbzx: [{ required: true, message: '请选择记录', trigger: 'blur' }],
  jxzcf: [{ required: true, message: '请选择处罚记录', trigger: 'blur' }],
  lryc: [{ required: true, message: '请选择经营名录', trigger: 'blur' }],
  qtfm: [{ required: true, message: '请选择其他负面记录', trigger: 'blur' }],
  yyss: [{ required: true, message: '请填写收入', trigger: 'blur' },
  { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请正确填写收入', trigger: 'blur' }
  ],
  qyns: [{ required: true, message: '请选择企业纳税等级', trigger: 'blur' }],
  jnsze: [{ required: true, message: '请填写纳税总额', trigger: 'blur' },
  { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请正确填写纳税总额', trigger: 'blur' }
  ],
  jzzs: [{ required: true, message: '请填写增值税总额', trigger: 'blur' },
  { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请正确填写增值税总额', trigger: 'blur' }
  ],
  lrqs: [{ required: true, message: '请选择欠税名单', trigger: 'blur' }],
  ynsze: [{ required: true, message: '请填写纳税总额', trigger: 'blur' },
  { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请正确填写纳税总额', trigger: 'blur' }
  ],
  jsds: [{ required: true, message: '请填写所得税总额', trigger: 'blur' },
  { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请正确填写所得税总额', trigger: 'blur' }
  ],
  jswcf: [{ required: true, message: '请选择处罚记录', trigger: 'blur' }],
  jfrbg: [{ required: true, message: '请选择法人变更', trigger: 'blur' }],
  jdzbg: [{ required: true, message: '请选择地址变更', trigger: 'blur' }],
  jgqzy: [{ required: true, message: '请选择股权质押', trigger: 'blur' }],
  jgdbg: [{ required: true, message: '请选择股东变更', trigger: 'blur' }],
  jjjfw: [{ required: true, message: '请选择经营范围变更', trigger: 'blur' }],
  jdcdy: [{ required: true, message: '请选择动产抵押', trigger: 'blur' }],
  dbfs: [{ required: true, message: '请选择担保方式', trigger: 'blur' }],
  zcze: [{ required: true, message: '请填写资产总额', trigger: 'blur' },
  { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请正确填写资产总额', trigger: 'blur' }
  ],
  cyrs: [{ required: true, message: '请填写从业人数', trigger: 'blur' },
  { pattern: /^[1-9][0-9]*$/, message: '请正确填写从业人数', trigger: 'blur' }
  ],
  pwd:[{ required: true, message: '请填写密码', trigger: 'blur' }],
  newpwd:[{ required: true, message: '请填写新密码', trigger: 'blur' }],
  repwd:[{ required: true, message: '请再次填写新密码', trigger: 'blur' }],
}
