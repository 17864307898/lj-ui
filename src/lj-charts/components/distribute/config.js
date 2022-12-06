import { t } from './handle'

export const handleColumns = (type = 1) => {
  const publicColumn = [
    {
      label: t('index'),
      type: 'index',
    },
    {
      label: t('fileName'),
      prop: 'language',
    },
  ]

  if (type === 1) {
    publicColumn.push({
      label: t('fileCount'),
      prop: 'num',
    })
  } else {
    publicColumn.push({
      label: t('codeCount'),
      prop: 'line',
    })
  }

  return publicColumn
}