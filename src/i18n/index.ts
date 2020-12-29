import KiwiIntl from 'kiwi-intl';
/**
 * 可以把多语言放到多份JS文件中去
 */
export const localeTools = KiwiIntl.init('zh-CN', {
    'en-UK': {
        'label.user.name':"name",
        'label.user.email':"email"
    },
    'zh-CN': {
        'label.user.name':"姓名",
        'label.user.email':"邮箱"
    }
  });