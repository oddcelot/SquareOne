/* eslint-disable quotes */
module.exports = {
  extends: "@pangolin/stylelint-config",
  rules: {
    "selector-no-qualifying-type": [
      true,
      {
        ignore: ["attribute"]
      }
    ],
    "selector-pseudo-element-colon-notation": "single"
  }
}
