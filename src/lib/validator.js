//校验学校编码 只能为数字
let validateCode = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('学校编码不能为空'))
  } else {
    const codeReg = /^[0-9]+$/
    const codeMax = /^\d{0,5}$/
    if (codeReg.test(value)) {
      if (codeMax.test(value)) {
        callback()
      } else {
        callback(new Error('学校编码不能大于5位'))
      }
    } else {
      callback(new Error('请输入正确的学校编码，只能是数字'))
    }
  }
}

//校验邮箱
let validateEmail = (rule, value, callback) => {
  if (value) {
    const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    if (mailReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的邮箱格式'))
    }
  } else {
    callback()
  }
}
//校验英文
let validateEng = (rule, value, callback) => {
  if (value) {
    const mailReg = /^[A-Za-z-& \(\)\s]+$/
    if (mailReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的英文名字'))
    }
  } else {
    callback()
  }
}
//校验姓名拼音
let validateEngName = (rule, value, callback) => {
  if (value) {
    const EngNameReg = /^[A-Za-z \(\)\s]+$/
    if (EngNameReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的拼音名字'))
    }
  } else {
    callback()
  }
}

//校验电话
let validatePhone = (rule, value, callback) => {
  if (value) {
    // const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    // const regs = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    const regs =/^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/
    // console.log(regss.test(value));
    if (regs.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的手机号'))
    }
  } else {
    callback()
  }
}

// 校验只能为中文
let validateChinese = (rule, value, callback) => {
  if (value) {
    const chineseReg = /^[\u4E00-\u9FA5]+$/
    if (chineseReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入中文'))
    }
  } else {
    callback()
  }
}

//校验学校名称不能为空
let validateXXMC = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('学校名称不能为空'))
  } else {
    const chineseReg = /^[\u4E00-\u9FA5]+$/
    if (chineseReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的学校名字，只能是汉字'))
    }
  }
}


// 校验邮政编码
let validatePostCode = (rule, value, callback) => {
  if (value) {
    const postReg = /^[1-9]\d{5}$/
    if (postReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的邮政编码'))
    }
  } else {
    callback()
  }
}

// 数字
let validateNum = (rule, value, callback) => {
  if (value) {
    const numReg = /^[\d]+$/
    if (numReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入数字'))
    }
  } else {
    callback()
  }
}

// 组织机构代码
let validateOrganization = (rule, value, callback) => {
  if (value) {
    const orgReg = /^[A-Za-z0-9]\w{14}$/g
    if (orgReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入组织机构代码'))
    }
  } else {
    callback()
  }
}

// 传真
let validateFax = (rule, value, callback) => {
  if (value) {
    const faxReg = /^(\d{3,4}-)?\d{7,8}$/
    if (faxReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的传真'))
    }
  } else {
    callback()
  }
}

// 主页地址
let validateHome = (rule, value, callback) => {
  if (value) {
    const homeReg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
    if (homeReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的主页地址'))
    }
  } else {
    callback()
  }
}

// 学分 小数，且保留最多三位小数
let validateXf = (rule, value, callback) => {
  if (!value) {
    callback(new Error('学分不能为空'))
  } else {
    const numReg = /^[0-9]+\.[0-9]{0,3}$/
    if (numReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入小数，且小数点后最多三位'))
    }
  }
}

// 数字格式  小数点后一位
let validateOneNum = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('字段不能为空'))
  } else {
    const numReg = /^\d+(\.\d+)?$/
    const numOneReg = /^\d*\.{0,1}\d{0,1}$/
    if (numReg.test(value)) {
      if (numOneReg.test(value)) {
        callback()
      } else {
        callback(new Error('小数点后最多1位'))
      }
    } else {
      callback(new Error('请输入数字'))
    }
  }
}

// 数字格式  小数点后两位
let validateTwoNum = (rule, value, callback) => {
  if (value) {
    const numReg = /^\d+(\.\d+)?$/
    const numTwoReg = /^\d*\.{0,2}\d{0,2}$/
    if (numReg.test(value)) {
      if (numTwoReg.test(value)) {
        callback()
      } else {
        callback(new Error('小数点后最多2位'))
      }
    } else {
      callback(new Error('请输入数字'))
    }
  }
  callback()
}

// 数字格式  小数点后两位     小数点前保留五位
let validateTwoNumThree = (rule, value, callback) => {
  if (value) {
    if (Number(value) > 10000) {// 校验value值不能大于10000
      callback(new Error('数值过大，请重新输入'))
    } 
    const numReg = /^\d+(\.\d+)?$/
    const numTwoReg = /^\d*\.{0,2}\d{0,2}$/
    if (numReg.test(value)) {
      if (numTwoReg.test(value)) {
        callback()
      } else {
        callback(new Error('小数点后最多2位'))
      }
    } else {
      callback(new Error('请输入数字'))
    }
  }
  callback()
}

// 数字格式  小数点后三位
let validateThreeNum = (rule, value, callback) => {
  if (!value) {
    callback(new Error('字段不能为空'))
  } else {
    const numReg = /^\d+(\.\d+)?$/
    const numTwoReg = /^\d*\.{0,3}\d{0,3}$/
    if (numReg.test(value)) {
      if (numTwoReg.test(value)) {
        callback()
      } else {
        callback(new Error('小数点后最多3位'))
      }
    } else {
      callback(new Error('请输入数字'))
    }
  }
}
//校验年份必须为4位数字
let validateNF = (rule, value, callback) => {
  if (value) {
    const NFReg = /^\d{4}$/
    if (NFReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入4位数字'))
    }
  } else {
    callback()
  }
}

//校验分数最大值
let validateMaxNumber = (rule, value, callback) => {
  if (parseInt(value) <= 200) {
    callback()
  } else {
    callback(new Error('分数不能大于200'))
  }
}

//校验正整数
let validateInteger = (rule, value, callback) => {
  if (value) {
    const integerReg = /^[+]{0,1}(\d+)$/
    if (integerReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的整数'))
    }
  } else {
    callback()
  }
}
//校验整数
let validateroundNumber = (rule, value, callback) => {
  if (value) {
    const numReg = /^[1-9]\d*$/
    if (numReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的整数'))
    }
  } else {
    callback()
  }
}
// 校验IP地址
let validateIp = (rule, value, callback) => {
  if (value) {
    const ipReg = /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/
    if (ipReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的IP地址'))
    }
  } else {
    callback()
  }
}
// 校验端口号
let validatePort = (rule, value, callback) => {
  if (value) {
    const portReg = /^(\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
    if (portReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的端口号'))
    }
  } else {
    callback()
  }
}
export default {
  validateCode,
  validateEmail,
  validateEng,
  validatePhone,
  validateChinese,
  validatePostCode,
  validateNum,
  validateOrganization,
  validateFax,
  validateHome,
  validateXXMC,
  validateXf,
  validateOneNum,
  validateMaxNumber,
  validateTwoNum,
  validateTwoNumThree,
  validateThreeNum,
  validateInteger,
  validateNF,
  validateroundNumber,
  validateEngName,
  validateIp,
  validatePort
}
