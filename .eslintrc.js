module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    //'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 'off',
    /* 允许阴影变量state */
    'no-shadow': 'off',
    'no-trailing-spaces': 'off',
    'no-tabs': 0,
    'no-underscore-dangle': 0,
    'no-mixed-operators': 0,
    'no-param-reassign': 0,
    'no-new-object': 0,
    'no-useless-return': 0,
    'no-await-in-loop': 0,
    'no-constant-condition': 0,
    'consistent-return': 0,
    indent: 'off',
    'max-len': 0,
    /* 剪裁最后一个属性的逗号 */
    'comma-dangle': 0,
    'no-restricted-globals': 0,
    'class-methods-use-this': 0,
    'import/no-extraneous-dependencies': 0,
    'object-curly-spacing': [0, 'never'],
    'space-in-parens': 'off',
    'padded-blocks': 'off',
    'lines-between-class-members': 'off',
    curly: 'off',
    'keyword-spacing': 'off',
    'nonblock-statement-body-position': 'off',
    'prefer-destructuring': 'off',
    'prefer-const': 'off',
    'prefer-template': 'off',
    'prefer-object-spread': 'off',
    'import/order': 'off',
    'import/no-mutable-exports': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'array-callback-return': 'off',
    'dot-notation': 'off',
    'no-alert': 'off',
    'no-var': 'off',
    'no-empty': 'off',
    'spaced-comment': 'off',
    'space-unary-ops': 'off',
    'arrow-spacing': 'off',
    'no-plusplus': 'off',
    'no-multi-spaces': 'off',
    'no-undef': 'off',
    'no-multiple-empty-lines': 'off',
    'object-shorthand': 'off',
    'object-curly-newline': 'off',
    'operator-assignment': 'off',
    'arrow-parens': 'off',
    'arrow-body-style': 'off',
    "global-require": "off",
    'import/no-duplicates': 'off',
    semi: 'off',
    quotes: 'off',
    camelcase: 'off',
    'eol-last': 'off',
    ' vue/multi-word-component-names': 'off',
    /* html标签关闭前强制换行：单行不执行，多行执行 */
    'vue/html-closing-bracket-newline': 'off',
    /* html标签关闭前后不允许空格： < i />不被允许 */
    'vue/html-closing-bracket-spacing': 'off',
    /* 强制html标签结束 */
    'vue/html-end-tags': 'off',
    /* 禁止定义无用参数：过于严格，可以不使用 */
    'vue/no-unused-vars': 'off',
    /* template内部缩进2个空格，属性间隔开1个空格，自动对其属性缩进 */
    'vue/html-indent': 'off',
    // <div>{{text}}</div>
    'vue/mustache-interpolation-spacing': 'off',
    /* 禁止重复空格 */
    'vue/no-multi-spaces': 'off',
    'vue/v-bind-style': 1,
    'vue/v-on-style': 1,
    /* 计算属性中禁止包含异步方法 */
    'vue/no-async-in-computed-properties': 2,
    /* 禁止在对象字面量中出现重复的键 */
    //'vue/no-dupe-keys': 2,
    /* 禁止出现语法错误 */
    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false,
    }],
    /* 禁止覆盖保留字 */
    'vue/no-reserved-keys': 2,
    /* 禁止在textarea出现{{value}} */
    'vue/no-textarea-mustache': 2,
    /* <component> 必须绑定is传参 */
    'vue/require-component-is': 2,
    /* render函数必须有返回值 */
    'vue/require-render-return': 2,
    /* v-for必须定义key */
    'vue/require-v-for-key': 2,
    /* 校验template的根节点：必须唯一且合法 */
    'vue/valid-template-root': 2,
    'vue/valid-v-bind': 2,
    'vue/valid-v-cloak': 2,
    'vue/valid-v-else-if': 2,
    'vue/valid-v-else': 2,
    'vue/valid-v-for': 2,
    'vue/valid-v-html': 2,
    'vue/valid-v-if': 2,
    'vue/valid-v-model': 2,
    'vue/valid-v-on': 2,
    'vue/valid-v-once': 2,
    'vue/valid-v-pre': 2,
    'vue/valid-v-show': 2,
    'vue/valid-v-text': 2,
    /* 关闭v-if必须是计算属性 */
    'vue/no-use-v-if-with-v-for': 0,
    /* html属性值必须用双括号括起来 */
    'vue/html-quotes': 2,
    /* 禁止出现无法理解的v-for或v-if */
    // 'vue/no-confusing-v-for-v-if': 2,

    // 接口和类型字面量中每一行都必须以分号结尾
    // 'typescript/member-delimiter-style': 'off',
    // // 属性和方法必须按照排序规则排序
    // 'typescript/member-ordering': 'error',
    // // 类型定义的冒号前后是否需要空格
    // // 默认冒号前必须没有空格，冒号后必须有空格
    // 'typescript/type-annotation-spacing': 'error',
    'vuejs-accessibility/label-has-for': 'off',
    'vuejs-accessibility/alt-text': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/mouse-events-have-key-events': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/no-this-alias': 'off'
  },
};
