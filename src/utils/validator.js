export const ruleFloat2 = {
  pattern: /^[0-9]\d{0,13}(\.\d{1,2})?$/,
  message: "请输入数值，整数最多14位，小数最多2位"
};

export const ruleWord200 = {
  min: 0,
  max: 200,
  message: "最多输入200个汉字"
};

export const ruleMobile = {
  pattern: /^1[3456789]\d{9}$/,
  message: "请输入正确的手机号"
};

export const ruleFormat1 = {
  pattern: /^[A-Za-z_]+[0-9A-Za-z_]*$/,
  message: "请输入由字母、数字组成, 非数字开头的字符串"
};

export const rulePwd = {
  pattern: /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Za-z]{1,}).*$/,
  message: "密码格式有误（至少包含字母和数字，长度6-16位）"
};

// export const ruleEmail = {
//   pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
//   message: "请输入正确的邮箱地址"
// };

export const ruleAccount = {
  pattern: /^(?![0-9]+$)?(?![a-zA-Z]+$)?[0-9A-Za-z]{1,30}$/,
  message: "仅支持由字母或数字!"
};
export const rulePassword = {
  pattern: /^(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9])))|(?=.*[0-9])(?=.*[~!@#$%^&*?])|((?=.*[A-Z])|(?=.*[a-z]))(?=.*[~!@#$%^&*?]).*$/,
  message: "数字，字母和特殊字符至少包含两种！"
};

export function getRuleRequired(msg, type) {
  return {
    required: true,
    message: msg || "不能为空",
    trigger: type || "blur"
  };
}
